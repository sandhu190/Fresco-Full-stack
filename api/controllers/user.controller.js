const connection = require("../connection")
const {sign} = require("jsonwebtoken");

function UserSignup(req, res) {
    // console.log(req.body)
    const {fullName, email, password, phone, gender, address, state, city} = req.body;

    //check user exist ?
    let checkEntry = `Select * From user Where  email='${email}'`
    connection.query(checkEntry, (error, records) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            if (records.length > 0) {
                res.json({error: "Email.already exist", message: ""})
            } else {
                // Insert query execute if user not exist already
                const insertUser = `Insert Into user(fullName, email , password ,phone,gender,address,state,city) 
                Values('${fullName}','${email}','${password}','${phone}','${gender}','${address}','${state}','${city}')`;
                //console.log(insertUser)
                //res.json({error:error.message,message:'User Added'})
                connection.query(insertUser, (error) => {
                    if (error) {
                        res.send({error: error.message, message: ''})

                    } else {
                        res.send({error: '', message: 'Account Created Successfully'})
                    }
                })

            }
        }
    })

}

function UserLogin(req, res) {
    let {email, password} = req.body

    if (email == "" || password == "") {
        res.json({error: 'All fields are required', message: ''})
    } else {
        // authenticate user
        let checkUser = `SELECT * FROM user WHERE email='${email}' and password='${password}'`
        connection.query(checkUser, (error, record) => {
            if (error) {
                res.json({error: error.message, message: ''})
            } else {
                if (record.length == 0) {
                    // []
                    res.json({error: "Invalid Email or Password", message: ''})
                } else {
                    // generate JWT
                    let payload = {
                        id: record[0].id,
                        email: record[0].email,
                        fullName: record[0].fullName
                    }
                    let secret = "abc@123"
                    let expiry = 60 * 60 // 1hour

                    // create token
                    let token = sign(payload, secret, {expiresIn: expiry})

                    // res.cookie('userToken', token, {
                    //     expires: new Date(Date.now() + expiry * 1000) // 1 minute
                    // })
                    res.json({error: '', message: 'Login Success', token: token})
                }
            }
        })
    }
}

function UserChangePassword(req, res) {
    // console.log(req.userInfo);
    // console.log(req.body)
    // res.json({error: '', message: ''})

    let {password, newPassword, confirmPassword} = req.body;
    let {id} = req['userInfo'];

    let checkOldPassword = `select * from user where id=${id}`;
    connection.query(checkOldPassword, (error, record) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            if (record[0].password != password) {
                res.json({error: 'Invalid Current Password.', message: ''})
            } else if (newPassword != confirmPassword) {
                res.json({error: "New password & confirm password must be same", message: ""})
            } else {
                let updatePassword = `Update user Set password='${newPassword}' Where id=${id}`;
                connection.query(updatePassword, (error) => {
                    if (error) {
                        res.json({error: error.message, message: ''})
                    } else {
                        res.json({error: '', message: 'Password Updated'})
                    }
                })
            }
        }
    })
}

function AddToCart(req, res) {
    //console.log(req['userInfo'])
    let {id} = req['userInfo']
    let {product_id} = req.body
    let quantity = 1;

    const query = `SELECT * FROM cart WHERE product_id = ${product_id} AND user_id = ${id}`;
    connection.query(query, (error, results) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            if (results.length > 0) {
                // Update quantity if product already exists in cart
                const updateQuery = `UPDATE cart SET quantity = quantity + 1 WHERE product_id = ${product_id} AND user_id = ${id}`;
                connection.query(updateQuery, (error) => {
                    if (error) {
                        res.json({error: error.message, message: ''})
                    } else {
                        res.json({error: '', message: 'Product quantity updated successfully'})
                    }
                });
            } else {
                const insertCommand = `Insert Into cart(product_id, quantity , user_id) 
               Values('${product_id}','${quantity}','${id}')`
                connection.query(insertCommand, (error) => {
                    if (error) {
                        res.json({error: error.message, message: ''})
                    } else {
                        res.json({error: '', message: 'Product Added to Cart Successfully'})
                    }
                })
            }
        }
    })
}

function ReadCart(req, res) {
    let {id} = req['userInfo']
    let readCommand = `SELECT c.id, c.user_id, c.quantity, p.product_id, p.photo, p.productName, 
                  p.price,p.description,p.discount,p.stock
                 FROM cart c INNER JOIN products p ON c.product_id = p.product_id where user_id=${id}`
    //console.log (readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })

}

function DeleteCart(req, res) {
    //console.log(req.params)
    let {id} = req.params;
    let deleteCommand = `Delete From cart Where id=${id}`;
    //console.log(deleteCommand)
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Product Deleted from Cart"})
        }
    })
}

function EmptyCart(req, res) {
    let {id} = req['userInfo']
    const deleteCommand = `DELETE FROM cart WHERE user_id = ${id}`
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Cart Cleared"})
        }
    })
}

function UpdateCartQuantity(req, res) {
    // console.log('userInfo')
    // console.log(req.body)
    let {id} = req['userInfo']
    let {product_id, action} = req.body
    let getCurrentQuantity = `Select * from cart where user_id= ${id} AND product_id=${product_id}`
    // console.log(getCurrentQuantity)
    connection.query(getCurrentQuantity, (error, records) => {
        if (error) {
            res.json({error: error.message})
        } else {
            let Quantity = records[0].quantity
            // console.log(Quantity)
            if (action === 'dec' && Quantity > 1) {
                Quantity = Quantity - 1
            } else if (action === 'inc' && Quantity < 5) {
                Quantity = Quantity + 1
            }

            let updateQuantity = `Update cart Set quantity=${Quantity} where user_id=${id} And product_id=${product_id}`
            // console.log(updateQuantity)
            connection.query(updateQuantity, (error) => {
                if (error) {
                    res.send({error: error.message, message: ''})
                } else {
                    res.send({error: '', message: 'Quantity updated'})
                }
            })
        }
    })
}

function ReadUser(req, res) {
    //console.log(req['userInfo'])
    let {id} = req['userInfo']
    let readCommand = `Select * From user Where id=${id}`
    //console.log(readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })
}

function UpdateUser(req, res) {
    // console.log(req['userInfo'])
    // console.log(req.body)
    let {id} = req['userInfo']
    let {fullName, email, phone, gender, city, state, address} = req.body
    let updateCommand = `Update user SET fullname = '${fullName}',
        email = '${email}',
        phone = '${phone}',
        gender = '${gender}',
        city = '${city}',
        state = '${state}',
        address = '${address}' Where id=${id}`
    connection.query(updateCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Account Details Updated"})
        }
    })
}

function SearchBar(req, res) {
    // console.log(req.body)
    let {searchBar} = req.body
    let readCommand = `select * from products Where productName LIKE '%${searchBar}%'  AND LENGTH('${searchBar}') >= 4`
    // console.log(readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })
}
function PlaceOrder(req, res) {
    try {
        // console.log(req['userInfo'])
        // console.log(req.body)
        let {id} = req['userInfo']
        const {total, payment_mode, address, city, landmark, phone, order_notes, state, cart} = req.body;
        let payment_status = "Pending";

        if (payment_mode === "Online") {
            payment_status = "Paid";
        }
        // let payment_date = "";

        /* insert into bill table... */
        const bill = `Insert Into bill(total, payment_mode, address, city, landmark, phone, order_notes, user_id, state, payment_status, payment_date)
              Values(${total}, '${payment_mode}', '${address}', '${city}', '${landmark}', '${phone}', '${order_notes}', ${id}, '${state}', '${payment_status}', NOW());`

        connection.query(bill, (error, record) => {
            if (error) {
                res.json({error: error.message})
            } else {
                const bill_id = record.insertId;
                let counter = 1;
                let cartLength = cart.length;
                for (let i = 0; i < cartLength; i++) {
                    let {product_id, quantity, price} = cart[i];

                    let net_price = price * quantity;

                    /* insert multiple rows into bill details table... */
                    let billDetails = `Insert Into bill_details(bill_id, product_id, quantity, price, net_price) Values(${bill_id}, ${product_id}, ${quantity}, ${price}, ${net_price});`
                    connection.query(billDetails, (error) => {
                        if (error) {
                            res.json({error: error.message})
                        }

                        if (counter === cartLength) {
                            /* empty cart table for the current customer... */
                            const deleteCart = `Delete From cart where user_id=${id}`;
                            connection.query(deleteCart, (error) => {
                                if (error) {
                                    return res.json({error: error.message})
                                }
                                res.json({error: "", message: "Order Placed", bill_id});
                            })
                        }

                        counter++;
                    })
                }
            }
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

const OrderDetails = (rows) => {
    return new Promise((resolve, reject) => {
        let counter = 0;
        for (let i = 0; i < rows.length; i++) {
            let bill_details = `SELECT bill_details.*, products.productName, products.photo,products.description,products.discount FROM bill_details INNER JOIN products ON bill_details.product_id=products.product_id WHERE bill_details.bill_id=${rows[i].id}`;
            connection.query(bill_details, (error, row) => {
                rows[i].order_details = row;
                counter++;
                if (counter === rows.length) {
                    resolve(rows);
                }
            });
        }
    });
};

function MyOrders(req, res) {
    try {
        const {id} = req["userInfo"];

        const orders = `SELECT *, DATE_FORMAT(payment_date, "%Y-%m-%d") AS payment_date FROM bill WHERE user_id=${id} ORDER BY id DESC;`
        connection.query(orders, async (error, records) => {
            if (error) {
                return res.json({error: error.message})
            }

            await OrderDetails(records);

            res.json({error: "", records});
        })
    } catch (e) {
        res.json({error: e.message})
    }
}

function Contact(req,res){
    // console.log(req['userInfo'])
    // console.log(req.body)
    let {id}=req['userInfo']
    let {name,email,phone,subject,message}=req.body
    let insertCommand=`Insert into contact (user_id,name,email,phone,message,subject)
                Values(${id},'${name}','${email}','${phone}','${message}','${subject}')`
    connection.query(insertCommand, (error) => {
        if (error) {
            res.send({error: error.message, message: ''})
        } else {
            res.send({error: '', message: 'Thank you for Contacting Us'})
        }
    })
}


module.exports = {
    UserSignup,
    UserLogin,
    UserChangePassword,
    AddToCart,
    ReadCart,
    DeleteCart,
    EmptyCart,
    UpdateCartQuantity,
    ReadUser,
    UpdateUser,
    SearchBar,
    PlaceOrder,
    MyOrders,
    Contact
}