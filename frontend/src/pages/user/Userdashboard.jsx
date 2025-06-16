import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";

function UserDashboard(){
    const navigate=useNavigate()
    const {register,handleSubmit,
        setValue,
        formState:{errors}}= useForm();

    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const [gender, setGender] = useState("");

   async function onSubmit(data){
       // console.log(data)
       let token=localStorage.getItem("userToken") //null/ Token
       let url = `http://localhost:5000/update-user`
       let response = await fetch(url, {
           method: "POST",
           headers: {"Content-Type": "application/json"},
           body: JSON.stringify({...data,token})
       })
       response = await response.json()
       // console.log(response)
       if (response.error !== "") {
           Qual.errordb('Error', response.error)
       }else {
           ReadUser()
           Qual.successdb('Success',response.message)

       }
   }
    async function ReadUser() {
        let token=localStorage.getItem("userToken") //null/ Token
        let data = {token: token}
        let url = `http://localhost:5000/read-user`
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        //console.log(response)
        if (response.error !== "") {
            // alert(response.error);
        } else {
            setFullname(response.records[0].fullname)
            setEmail(response.records[0].email)
            setPhone(response.records[0].phone)
            setCity(response.records[0].city)
            setAddress(response.records[0].address)
            setState(response.records[0].state)
            setGender(response.records[0].gender)
        }
    }
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then( (result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userNotification")
                navigate("/")
                window.location.reload();
            }
        })
    };

    const ShowNotification = localStorage.getItem('userNotification');
    useEffect(() => {
        ReadUser()
        if (!ShowNotification) {
           // console.log('Notification shown');
            toast('🦄 Welcome Back !', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            localStorage.setItem('userNotification', 'true');
        }

    }, []);


    useEffect(() => {
        setValue("fullName", fullname);
        setValue("email", email);
        setValue("phone", phone);
        setValue("city", city);
        setValue("address", address);
        setValue("state", state);
        setValue("gender",gender)
    }, [fullname, email, phone, city, address, state,gender]);



    const [orders, setOrders] = useState([]);
    async function MyOrders() {
        let token=localStorage.getItem("userToken")
        let data = {token: token}
        let url = "http://localhost:5000/my-orders";

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
            setOrders(response.records);
            // console.log("My Orders",response.records)
        }
    }


    useEffect(() => {
        let token = localStorage.getItem("userToken") //null/ Token
        if (!token) {
            navigate("/user-login")
        }
        MyOrders()
    }, []);

    return(
        <>
            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> Pages <span></span> My Account
                        </div>
                    </div>
                </div>
                <div className="page-content pt-70 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 m-auto">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="dashboard-menu">
                                            <ul className="nav flex-column" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="dashboard-tab"
                                                       data-bs-toggle="tab" href="#dashboard" role="tab"
                                                       aria-controls="dashboard" aria-selected="false"><i
                                                        className="fi-rs-settings-sliders mr-10"></i>Dashboard</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="orders-tab" data-bs-toggle="tab"
                                                       href="#orders" role="tab" aria-controls="orders"
                                                       aria-selected="false"><i
                                                        className="fi-rs-shopping-bag mr-10"></i>Orders</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="account-detail-tab" data-bs-toggle="tab"
                                                       href="#account-detail" role="tab" aria-controls="account-detail"
                                                       aria-selected="true"><i className="fi-rs-user mr-10"></i>Account
                                                        details</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link"
                                                       href="/user/change-password"><i
                                                        className="fi-rs-key mr-10"></i>Change Password</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className='nav-link' onClick={handleLogout}><i
                                                        className="fi-rs-sign-out mr-10"></i>Logout</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="tab-content account dashboard-content pl-50">
                                            {/*dashboard*/}
                                            <div className="tab-pane fade active show" id="dashboard" role="tabpanel"
                                                 aria-labelledby="dashboard-tab">
                                            <img src={"/assets/imgs/myimg/account.jpg"} style={{height: "150px"}}
                                                     alt=""/>
                                                <div className="card">
                                                    <div className="card-header">
                                                        <h3 className="mb-0">{fullname}</h3>
                                                    </div>
                                                    <div className="card-body">
                                                        <p>
                                                            From your account dashboard. you can easily check &amp; view
                                                            your <a href="#">recent orders</a>,<br/>
                                                            manage your <a href="#">shipping and billing
                                                            addresses</a> and <a href="#">edit your password and account
                                                            details.</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {/*order*/}
                                            <div className="tab-pane fade" id="orders" role="tabpanel"
                                                 aria-labelledby="orders-tab">
                                                {
                                                    // orders.length > 0 ?
                                                    orders.map(x =>
                                                        <div key={x.id} className=" mt-20 card shadow margin-bottom-card">
                                                            <div className="card-header shopping-summery "
                                                                 style={{backgroundColor:"#ececec"}}>
                                                                <div className="row">
                                                                    <div className="col-6">
                                                                        <div className="row">
                                                                            <div className="col-4">
                                                                                <p>
                                                                                    ORDER PLACED<br/>
                                                                                    {x.date_time.split("T")[0]}
                                                                                </p>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <p>
                                                                                    PAYMENT METHOD<br/>
                                                                                    {x.payment_mode}
                                                                                </p>
                                                                            </div>
                                                                            <div className="col-4">
                                                                                <p>
                                                                                    TOTAL<br/>
                                                                                    &#x20b9; {x.total}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* Order Details */}
                                                                    <div className="col-6">
                                                                        <p className="text-end">
                                                                            ORDER # {x.id} <br/>
                                                                            <Link to="/order-details" state={x}
                                                                                  onClick={() => window.scrollTo(0, 0)}
                                                                                  style={{color: '#00559F'}}>
                                                                                View order details
                                                                            </Link>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-9">
                                                                        {x.payment_mode === "Online" ?
                                                                            <>
                                                                                <h6 className="fw-bold mb-0" style={{color: 'green'}}>
                                                                                    Successful
                                                                                </h6>
                                                                                <p className="">Paid on: {x.date_time.split("T")[0]}</p>
                                                                            </> : <>
                                                                                {x.payment_status === "Paid" && <>
                                                                                    <h6 className="fw-bold mb-0" style={{color: 'green'}}>
                                                                                        Successful
                                                                                    </h6>
                                                                                    <p className="">Paid
                                                                                        on: {x.payment_date.split("T")[0]}</p>
                                                                                </>
                                                                                }
                                                                            </>
                                                                        }

                                                                        {x.order_details?.map(val =>
                                                                            <div className="row order_details_div" key={val.id}>
                                                                                <div className="col-2 img-hover-scale">
                                                                                    <img src={"http://localhost:5000" + val.photo}
                                                                                         alt={val.productName} style={{width:"70px"}}
                                                                                    />
                                                                                </div>

                                                                                <div className="col-10">
                                                                                    <h6 className="mt-15">{val.productName}</h6>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className="col-3">
                                                                        <h6 className="fw-bold mb-0 text-end">
                                                                            Order Status
                                                                        </h6>
                                                                        <p className="text-end mb-20" style={{fontWeight: '500'}}>
                                                                            {x.status === "Pending" &&
                                                                                <span className="badge bg-danger">Pending</span>}

                                                                            {x.status === "Shipped" &&
                                                                                <span className="badge bg-info">Shipped</span>}

                                                                            {x.status === "Delivered" &&
                                                                                <span className="badge"
                                                                                      style={{backgroundColor: 'green'}}>Delivered</span>}
                                                                        </p>

                                                                        <button className="btn btn-warning text-dark btn-sm w-100 mb-3">
                                                                            Cancel Order
                                                                        </button>

                                                                        <button className="btn btn-warning text-dark btn-sm w-100">
                                                                            Write a product review
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {/*account detail*/}
                                            <div className="tab-pane fade" id="account-detail" role="tabpanel"
                                                 aria-labelledby="account-detail-tab">
                                                <div className="card shadow p-3 ">
                                                    <div className="card-header">
                                                        <h5>Account Details</h5>
                                                    </div>
                                                    <div className="card-body">
                                                        <form onSubmit={handleSubmit(onSubmit)}>
                                                            <div className="row">
                                                                <div className="form-group col-md-6">
                                                                    <label>FullName<span
                                                                        className="required">*</span></label>
                                                                    <input defaultValue="fullname" className="form-control"
                                                                           type="text" {...register("fullName",{required:"this field is required"})}/>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="fullName"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Email Address <span
                                                                        className="required">*</span></label>
                                                                    <input defaultValue="email" required=""
                                                                           className="form-control"
                                                                            type="email"
                                                                           {...register("email",{required:"this field is required"})}/>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="email"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Phone Number<span
                                                                        className="required">*</span></label>
                                                                    <input defaultValue="phone"
                                                                           className="form-control"
                                                                            type="tel"
                                                                           {...register("phone",{required:"this field is required"})}/>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="phone"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>Gender<span className="required">*</span></label>
                                                                    <select defaultValue="gender"
                                                                        className="form-1 " {...register("gender",{required:"this field is required"})}>
                                                                        <option value="">Select Gender</option>
                                                                        <option value="Male">Male</option>
                                                                        <option value="Female">Female</option>
                                                                    </select>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="gender"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>City<span
                                                                        className="required">*</span></label>
                                                                    <input defaultValue="city" required=""
                                                                           className="form-control"
                                                                           type="text" {...register("city",{required:"this field is required"})}/>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="city"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="form-group col-md-6">
                                                                    <label>State<span
                                                                        className="required">*</span></label>
                                                                    <select defaultValue="state"
                                                                            className="form-1" {...register("state",{required:"this field is required"})}>
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
                                                                <div className=" form-group  col-md-12">
                                                                    <label>Address<span className="required">*</span></label>
                                                                    <textarea defaultValue="address"
                                                                              className="form-1 "
                                                                              cols="10"
                                                                              rows="5"
                                                                              {...register("address",{required:"this field is required"})}/>
                                                                    <ErrorMessage
                                                                        errors={errors}
                                                                        name="address"
                                                                        render={({message}) => <p
                                                                            className={"error-msg"}>{message}</p>}
                                                                    />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <button type="submit"
                                                                            className="btn btn-secondary"
                                                                           >Update
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer/>
        </>
    )
}

export default UserDashboard