import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../App.jsx";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Cart() {
    let total = 0;

    let {cartCount, ReadCartCount} = useContext(UserContext)
    const navigate = useNavigate()
    const [cart, setCart] = useState([]);

    async function ReadCart() {
        let token = localStorage.getItem("userToken") //null/ Token
        let data = {token: token}
        let url = `http://localhost:5000/read-cart-data`
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        // console.log(response)
        if (response.error !== "") {
            // alert(response.error);
        } else {
            setCart(response.records);
            // console.log(response.records)
        }
    }

    async function DeleteCart(id) {
        let url = `http://localhost:5000/delete-cart/${id}`
        let response = await fetch(url, {method: "DELETE"})
        response = await response.json()
        // console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        } else {
            ReadCartCount()
            ReadCart()
            toast.info('Product removed from cart', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    }

    async function EmptyCart() {
        let token = localStorage.getItem("userToken");
        let data = {token: token}
        let url = `http://localhost:5000/empty-cart`
        let response = await fetch(url, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        // console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        } else {
            ReadCartCount()
            Qual.successdb('Success', response.message)
            ReadCart()
        }
    }

    async function UpdateQuantity(product_id, action) {
        let token = localStorage.getItem("userToken");
        console.log(product_id, token)
        let data = {product_id: product_id, token: token, action: action}
        let url = `http://localhost:5000/update-cart-data`
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        } else {
            ReadCart()
        }

    }

    useEffect(() => {
        let token = localStorage.getItem("userToken") //null/ Token
        if (!token) {
            navigate("/user-login")
        }
        ReadCart();
    }, []);


    return (
        <>
            <main className="main">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> Shop
                            <span></span> Cart
                        </div>
                    </div>
                </div>
                <div className="container mb-80 mt-50">
                    <div className=" mx-lg-5 row">
                        <div className="col-lg-8 mb-40">
                            <h1 className="heading-2 mb-10 ">Your Cart</h1>
                            <div className="d-flex  justify-content-between">
                                <h6 className="text-body ">There are
                                    <span className="text-brand"> {cartCount} </span>
                                    products in your cart
                                </h6>
                                <h6 className="text-body">
                                    <button type={"button"} onClick={() => EmptyCart()}
                                            style={{border: "lightgrey", background: 'white'}}>
                                        <i className="fi-rs-trash mr-5"></i>
                                        Clear Cart
                                    </button>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div className=" mx-lg-5 row">
                        <div className="col-lg-8">
                            <div className="table-responsive shopping-summery">
                                <table className="table table-wishlist">
                                    <thead>
                                    <tr className="main-heading">
                                        <th scope="col" className="text-center">#</th>
                                        <th scope="col" colSpan="2">Product</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Subtotal</th>
                                        <th scope="col" className="end">Remove</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {cart.map((value, index) => {
                                            total += value.price * value.quantity;
                                            return (
                                                <tr key={index} className="pt-30">
                                                    <td className="pl-30">
                                                        {index + 1}
                                                    </td>
                                                    <td className="image product-thumbnail img-hover-scale pt-40">
                                                        <Link to="/product-description" state={{product: value}} onClick={() => window.scrollTo(0, 0)}>
                                                            <img  className="" src={"http://localhost:5000" + value.photo} alt="#"
                                                                 style={{width: '70px'}}/>
                                                        </Link>

                                                    </td>
                                                    <td className="product-des product-name">
                                                        <h6 className="mb-5 "><Link className="glow-link"
                                                                                    to="/product-description"
                                                                                    state={{product: value}}
                                                                                    onClick={() => window.scrollTo(0, 0)}>

                                                            {value.productName}
                                                    </Link></h6>
                                                        <div className="product-rate-cover">
                                                        <span
                                                            className="font-small ml-5 text-muted">Size/ weight:</span>
                                                            <span className="font-small ">
                                                    {value.description}
                                                </span>
                                                        </div>
                                                    </td>
                                                    <td className="price" data-title="Price">
                                                        <h4 className="text-body">&#x20b9;{value.price} </h4>
                                                    </td>
                                                    <td className="text-center detail-info" data-title="Stock">
                                                        <div className="detail-extralink mr-15">
                                                            <div className="detail-qty border radius">
                                                                <a onClick={() => UpdateQuantity(value.product_id, 'dec')}
                                                                   className="qty-down"><i
                                                                    className="fi-rs-angle-small-down"
                                                                ></i></a>
                                                                <input type="text" name="quantity" className="qty-val"
                                                                       value={value.quantity}
                                                                       min="1"/>
                                                                <a onClick={() => UpdateQuantity(value.product_id, 'inc')}
                                                                   className="qty-up"><i
                                                                    className="fi-rs-angle-small-up"
                                                                ></i></a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="price" data-title="Price">
                                                        <h4 className="text-brand"> &#x20b9;{(value.price * value.quantity).toFixed(2)} </h4>
                                                    </td>
                                                    <td className="text-center">
                                                        <button type='button' onClick={() => DeleteCart(value.id)}
                                                                style={{border: "lightgrey", background: 'white'}}>
                                                            <i className="fi-rs-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="cart-action d-flex justify-content-lg-end">
                                <a className="btn mx-lg-5 mr-10 mb-40" href='/'><i
                                    className="fi-rs-arrow-left mr-10"></i>Continue To
                                    Shopping</a>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h3 className="heading-2 mb-10 mx-5"> Cart Total</h3>
                            <div className="border p-md-4 cart-totals ml-30">

                                <div className="table-responsive">
                                    <table className="table no-border">
                                        <tbody>
                                        <tr>
                                            <td className="cart_total_label">
                                                <h6 className="text-muted">Total</h6>
                                            </td>
                                            <td className="cart_total_amount">
                                                <h4 className="text-brand text-end">&#x20b9; {total}</h4>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <Link state={{total:total}} to="/user-checkout"
                                      className="btn button2 hover-red mb-20 w-100">Proceed To CheckOut<i
                                    className="fi-rs-sign-out ml-15"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer/>
        </>
    )
}

export default Cart