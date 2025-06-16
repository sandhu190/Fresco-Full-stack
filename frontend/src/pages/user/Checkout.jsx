import {ErrorMessage} from "@hookform/error-message";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useRazorpay from "react-razorpay";
import {useLocation} from "react-router-dom";

function Checkout() {
    const navigate = useNavigate()
    const location = useLocation()

    const {
        register, handleSubmit,
        setValue,
        formState: {errors},
        getValues
    } = useForm();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");


    // async function onSubmit(data) {
    //     console.log(data)
    //     let token = localStorage.getItem("userToken")
    //     let url = `http://localhost:5000/order`
    //     let response = await fetch(url, {
    //         method: "POST",
    //         headers: {"Content-Type": "application/json"},
    //         body: JSON.stringify({...data, token})
    //     })
    //     response = await response.json()
    //     console.log(response)
    // }

    async function ReadUser() {
        let token = localStorage.getItem("userToken") //null/ Token
        let data = {token: token}
        let url = `http://localhost:5000/read-user`
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
            setFullname(response.records[0].fullname)
            setEmail(response.records[0].email)
            setPhone(response.records[0].phone)
            setCity(response.records[0].city)
            setAddress(response.records[0].address)
            setState(response.records[0].state)
        }
    }

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
             console.log(response.records)
        }
    }

    useEffect(() => {
        let token = localStorage.getItem("userToken") //null/ Token
        if (!token) {
            navigate("/user-login")
        }
        ReadUser()
        ReadCart()
        // console.log(location.state)
    }, []);

    useEffect(() => {
        setValue("fullName", fullname);
        setValue("email", email);
        setValue("phone", phone);
        setValue("city", city);
        setValue("address", address);
        setValue("state", state);
    }, [fullname, email, phone, city, address, state]);

    function checkPaymentMode(data) {
        console.log(data)
        if (data.payment_mode === "COD") {
            placeOrder(null)
        } else if (data.payment_mode === "Online") {
            initiateRazorpay()
        }
    }
    async function placeOrder(response) {
        let data = getValues();
        const token = localStorage.getItem("userToken");

        data['cart'] = cart;
        data['total'] = location.state.total;
        data['token']=token

        if (!response) { // COD
            data['payment_mode'] = "COD";
        } else { // Online
            data['payment_mode'] = "Online";
        }


        const url = "http://localhost:5000/place-order";

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        });
        res = await res.json();
        console.log(res);
        if(res.error!==''){
            Qual.errordb('Error',res.error)
        }else{
            Qual.successdb('Success',res.message)
            navigate('/bill', {state: {bill_id: res.bill_id}});
        }
    }

    const Razorpay = useRazorpay();

    function initiateRazorpay() {
        let options = {
            key: "rzp_test_A3RM3Asww6uWvF",
            currency: 'INR',
            amount: location.state.total * 100,
            // amount: 0,
            name: "Fresco",
            description: "Online Grocery store",
            image: "/assets/imgs/theme/logo.svg",
            // handler: function (response) {
            //     let payment_id = response.razorpay_payment_id;
            //     if (payment_id !== '') {
            //         alert(response.razorpay_payment_id);
            //         alert('Payment Done.');
            //     } else {
            //         alert('Payment Failed.');
            //     }
            // },
            handler: function (response) {
                placeOrder(response)
            },
            prefill: {
                // name: user[0].fullname,
                // email: user[0].email,
                // contact: user[0].phone,
            },
            theme: {
                "color": "#F29600",
                // hide_topbar: false
            }
        };

        // options.amount = cartTotal * 100;

        let rzp = new window.Razorpay(options);
        rzp.open();
    }

    return (
        <main className="main  ">
            <div className="page-header breadcrumb-wrap">
                <div className="container ">
                    <div className="breadcrumb">
                        <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                        <span></span> Shop
                        <span></span> Checkout
                    </div>
                </div>
            </div>

            <div className="container  checkout mb-80 mt-50  ">
                <div className="row">
                    <div className="col-lg-8 mb-30">
                        <h1 className="heading-2 ">Checkout</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit(checkPaymentMode)}>
                    <div className="row">
                        <div className="mb-30 card p-4 bg-16 shadow col-lg-6 ">
                            <div className="row">
                                <h4 className="mb-5">Billing Details</h4>
                                <div className="contact-form-style mt-20"
                                >
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <div className="style mb-20">
                                                <label>FullName<span>*</span></label>
                                                <input
                                                    {...register('fullName', {required: "This field is required"})}
                                                    defaultValue={fullname}
                                                    type="text" placeholder="Enter FullName"
                                                />
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="fullName"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="style mb-20">
                                                <label>Email<span>*</span></label>
                                                <input defaultValue={email}
                                                       {...register('email', {required: "This field is required"})}
                                                       type="email" placeholder="enter Email"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="email"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <label>Phone Number<span>*</span></label>
                                                <input defaultValue={phone}
                                                       {...register('phone', {required: "This field is required"})}
                                                       type="tel"
                                                       placeholder="enter phone number"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="phone"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <label>City<span>*</span></label>
                                                <input defaultValue={city}
                                                       {...register('city', {required: "This field is required"})}
                                                       type="text"
                                                       placeholder="enter city"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="city"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <label>Pincode<span>*</span></label>
                                                <input
                                                    {...register('pincode', {required: "This field is required"})}
                                                    type="number"
                                                    placeholder="enter pincode"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="pincode"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6">
                                            <div className="input-style mb-20">
                                                <label>Landmark<span>*</span></label>
                                                <input
                                                    {...register('landmark', {required: "This field is required"})}
                                                    type="text"
                                                    placeholder="enter landmark"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="landmark"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="textarea-style mb-30">
                                                <label>Address<span>*</span></label>
                                                <textarea defaultValue={address}
                                                          className="contact-form-style " {...register('address', {required: "This field is required"})}
                                                          cols="21"
                                                          rows="5" placeholder="enter address"/>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="address"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-6">
                                            <div className="input-style mb-20">
                                                <label>State<span>*</span></label>
                                                <select defaultValue={state} style={{background: "white"}}
                                                        className="form-1" {...register('state', {required: "This field is required"})}>
                                                    <option value="">Select State</option>
                                                    <option value="Punjab">Punjab</option>
                                                    <option value="Haryana">Haryana</option>
                                                    <option
                                                        value="Uttarpradesh">UttarPradesh
                                                    </option>
                                                    <option value="Bihar">Bihar</option>
                                                </select>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="state"
                                                    render={({message}) => <p
                                                        className={"error-msg"}>{message}</p>}
                                                />

                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="textarea-style mb-30">
                                                <label>Order Notes</label>
                                                <textarea
                                                    className="contact-form-style " {...register('order_notes')}
                                                    cols="21"
                                                    rows="5" placeholder="enter notes"/>
                                            </div>
                                        </div>

                                        <div className="login_footer form-group mb-10">
                                            <div className="chek-form">
                                                <div className="custome-checkbox">
                                                    <input className="form-check-input"
                                                           type="checkbox"
                                                           name="checkbox" id="exampleCheckbox12"
                                                           value=""
                                                           {...register("terms", {required: "Agree to terms"})}/>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="terms"
                                                        render={({message}) => <p
                                                            className={"error-msg"}>{message}</p>}
                                                    />

                                                    <label className="form-check-label"
                                                           htmlFor="exampleCheckbox12"><span>I agree to terms &amp; Policy.</span></label>
                                                </div>
                                            </div>
                                            <a href='/purchase-guide'><i
                                                className="fi-rs-book-alt mr-5 text-muted"></i>Lean
                                                more</a>
                                        </div>
                                        <p className="font-xs text-muted"><strong>Note:</strong>Your
                                            personal data will be used to
                                            support your experience throughout this website, to
                                            manage
                                            access to your account, and
                                            for other purposes described in our privacy policy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="checkout col-lg-4">
                            <div className="payment ml-30">
                                <div className=" card shadow p-5 bg-16">
                                    <h4 className="mb-30">Payment</h4>
                                    <div className="payment_option  ">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio"
                                                   name="payment_mode" id="COD" value="COD"
                                                   {...register("payment_mode")}/>
                                            <label className="fw-bold form-check-label mx-2"
                                                   htmlFor="COD"><h6>Cash on delivery</h6></label>
                                        </div>
                                        <div className="mt-2 form-check">
                                            <input defaultChecked
                                                   className="form-check-input" type="radio"
                                                   name="payment_mode"
                                                   id="Online Gateway" value="Online"
                                                   {...register("payment_mode")}/>
                                            <label className="fw-bold mx-2"
                                                   htmlFor="Online Gateway"><h6>Online Gateway</h6></label>
                                        </div>
                                    </div>
                                    <div className="payment-logo d-flex mt-25">
                                        <img className="mr-15" src="/assets/imgs/theme/icons/payment-paypal.svg"
                                             alt=""/>
                                        <img className="mr-15" src="/assets/imgs/theme/icons/payment-visa.svg" alt=""/>
                                        <img className="mr-15" src="/assets/imgs/theme/icons/payment-master.svg"
                                             alt=""/>
                                        <img src="/assets/imgs/theme/icons/payment-zapper.svg" alt=""/>
                                    </div>
                                    <button type="submit" className="btn btn-fill-out hover-up btn-block mt-30">Place an
                                        Order<i
                                            className="fi-rs-sign-out ml-15"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Checkout