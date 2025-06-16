const connection = require("../connection")
const {sign} = require("jsonwebtoken")


function AddCategory(req, res) {
    //console.log(req.body)
    const {CategoryName} = req.body;
    const insertCommand = `Insert Into category(CategoryName) Values('${CategoryName}')`;
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Category Added"})
        }
    })
}

function ReadCategory(req, res) {
    let readCommand = `Select * From Category`;
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })

}

function DeleteCategory(req, res) {
    // console.log(req.params)
    let {id} = req.params;
    let deleteCommand = `Delete From Category Where id=${id}`;
    console.log(deleteCommand)
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Category Deleted"})
        }
    })
}

function AdminLogin(req, res) {
    let {email, password} = req.body

    if (email == "" || password == "") {
        res.json({error: 'All fields are required', message: ''})
    } else {
        // authenticate user
        let checkAdmin = `SELECT * FROM admin WHERE email='${email}' and password='${password}'`
        connection.query(checkAdmin, (error, record) => {
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
                    let expiry = 60 * 60 // 1 minute

                    // create token
                    let token = sign(payload, secret, {expiresIn: expiry})

                    // res.cookie('AdminToken', token, {
                    //     expires: new Date(Date.now() + expiry * 1000) // 1 minute
                    // })
                    res.json({error: '', message: 'Login Success', token: token})
                }
            }
        })
    }

}

function AdminChangePassword(req, res) {
    // console.log(req.adminInfo);
    // console.log(req.body)
    // res.json({error: '', message: ''})

    let {password, newPassword, confirmPassword} = req.body;
    let {id} = req['adminInfo'];

    let checkOldPassword = `select * from admin where id=${id}`;
    connection.query(checkOldPassword, (error, record) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            if (record[0].password != password) {
                res.json({error: 'Invalid Current Password.', message: ''})
            } else if (newPassword != confirmPassword) {
                res.json({error: "New password & confirm password must be same", message: ""})
            } else {
                let updatePassword = `Update admin Set password='${newPassword}' Where id=${id}`;
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

function AddSubCategory(req, res) {
    // console.log(req.body)
    const {category, subcategory} = req.body;
    const insertCommand = `Insert Into subcategory(category_id,name) Values('${category}','${subcategory}')`;
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})

        } else {
            res.json({error: '', message: "SubCategory Added"})
        }
    })
}

function Readsubcategory(req, res) {
    // let readCommand = `Select * From subcategory`;
    let readCommand = `Select * From category INNER JOIN subcategory ON category.id=category_id`;
    // console.log(readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })

}

function ReadSubCategory(req, res) {
    let {categoryId} = req.params;
    let readCommand = `Select * From subcategory Where category_id=${categoryId}`;
    // console.log(readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })
}

function DeleteSubCategory(req, res) {
    //console.log(req.params)
    let {id} = req.params;
    let deleteCommand = `Delete From subcategory Where subcategory_id=${id}`;
    // console.log(deleteCommand)
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "SubCategory Deleted"})
        }
    })
}

function AddProduct(req, res) {
    //console.log(req.body)
    let {subcategory, productName, price, discount, stock, description} = req.body
    if(stock=="")
        stock = null
    const insertCommand = `Insert Into products(subcategory,productName,description,price,discount,stock)
       Values(${subcategory},'${productName}','${description}',${price},${discount},${stock})`;
    //console.log(insertCommand)
    connection.query(insertCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})

        } else {
            res.json({error: '', message: "Product Added"})
        }
    })
}

function ReadProducts(req, res) {
    let readCommand = `Select * From products inner join subcategory on products.subcategory= subcategory_id inner join category on category_id=id`;
    // console.log(readCommand)
    connection.query(readCommand, (error, records) => {
        if (error) {
            res.json({error: error.message, records: []});
        } else {
            res.json({error: "", records: records})
        }
    })

}

function DeleteProducts(req, res) {
    // console.log(req.params)
    let {id} = req.params;
    let deleteCommand = `Delete From products Where product_id=${id}`;
    //console.log(deleteCommand)
    connection.query(deleteCommand, (error) => {
        if (error) {
            res.json({error: error.message, message: ''})
        } else {
            res.json({error: '', message: "Product Deleted"})
        }
    })
}


function UploadPhoto(req, res) {
    // console.log(req.body);
    // console.log(req.files);
   try {
       let {pId} = req.body
       let {photo} = req.files

       let serverPath = `public/images/${photo.name}`;
       let dbPath = `/images/${photo.name}`;
       photo.mv(serverPath, (error) => {
           if (error) {
               res.json({error: error.message})
           } else {
               let updateFilePath = `Update products Set photo='${dbPath}' Where product_id=${pId}`;
               connection.query(updateFilePath, (error) => {
                   if (error) {
                       res.json({error: error.message})
                   } else {
                       res.json({error: '', message: 'File uploaded.'})
                   }
               })
           }
       });
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
function ReadPendingOrder(req,res){
    try {
        const orders = `SELECT *, DATE_FORMAT(payment_date, "%Y-%m-%d") AS payment_date FROM bill WHERE status='pending' ORDER BY id DESC;`
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
function ShipOrder(req,res){
    // console.log(req.body)
    let{orderId}=req.body
    let updateStatus=`update bill Set status='Shipped' where id=${orderId}`
    connection.query(updateStatus, (error) => {
        if (error) {
            res.json({error: error.message})
        } else {
            res.json({error: '', message: 'Order Shipped'})
        }
    })
}
function ReadShippedOrder(req,res){
    try {
        const orders = `SELECT *, DATE_FORMAT(payment_date, "%Y-%m-%d") AS payment_date FROM bill WHERE status='Shipped' ORDER BY id DESC;`
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

module.exports = {
    UploadPhoto,
    AddCategory,
    ReadCategory,
    DeleteCategory,
    AdminLogin,
    AdminChangePassword,
    AddSubCategory,
    Readsubcategory,
    ReadSubCategory,
    DeleteSubCategory,
    AddProduct,
    ReadProducts,
    DeleteProducts,
    ReadPendingOrder,
    ShipOrder,
    ReadShippedOrder
}