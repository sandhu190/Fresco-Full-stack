import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {Link} from "react-router-dom";

function MyOrders(){
    const navigate=useNavigate()
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
             console.log(response.records)
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

            <div className="page-content pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 m-auto">
                            <h1>My orders</h1>

                            {
                                // orders.length > 0 ?
                                orders.map(x =>
                                    <div key={x.id} className=" mt-10 card shadow margin-bottom-card">
                                        <div className="card-header">
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
                                                            <div className="col-2">
                                                                <img src={"http://localhost:5000" + val.photo}
                                                                     alt={val.productName} style={{width:"70px"}}
                                                                />
                                                            </div>

                                                            <div className="col-10">
                                                                <h5 className="">{val.productName}</h5>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-3">
                                                    <h6 className="fw-bold mb-0 text-end">
                                                        Order Status
                                                    </h6>
                                                    <p className="text-end" style={{fontWeight: '500'}}>
                                                        {x.status === "Pending" &&
                                                            <span className="badge bg-danger">Pending</span>}

                                                        {x.status === "Shipped" &&
                                                            <span className="badge bg-success">Shipped</span>}

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
                                // : <div className="alert alert-danger">
                                //     <h5 className="mb-0 text-center">
                                //         No Data Found
                                //     </h5>
                                // </div>
                            }

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default MyOrders

