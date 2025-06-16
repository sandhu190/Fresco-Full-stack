import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function ShippedOrder(){
    let[shippedOrder,setShippedOrder]=useState([])
    async function ReadShippedOrder(){
        let url = "http://localhost:5000/shipped-order";
        let response = await fetch(url);
        response = await response.json();
        //console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setShippedOrder(response.records);
        }

    }

    useEffect(() => {
        ReadShippedOrder()
    }, []);
    return(
        <>
            <div className="page-content mt-100 pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <h1 className="mb-3">Shipped orders</h1>

                            {
                                // pending order.length > 0 ?
                                shippedOrder.map(x =>
                                    <div key={x.id} className=" mt-10 mb-20 card shadow margin-bottom-card">
                                        <div className="card-header" style={{backgroundColor: "#ececec"}}>
                                            <div className="row ">
                                                <div className="col-8">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <h6 className="fw-bold mb-0 text-uppercase">
                                                                Shipping Address
                                                            </h6>
                                                            <p>
                                                                {x.address}, {x.city}, {x.state} {x.pincode}
                                                            </p>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6 className="fw-bold mb-0 text-uppercase">
                                                                ORDER PLACED
                                                            </h6>
                                                            <p>
                                                                {x.date_time.split("T")[0]}
                                                            </p>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6 className="fw-bold mb-0 text-uppercase">
                                                                PAYMENT MODE
                                                            </h6>
                                                            <p>
                                                                {x.payment_mode}
                                                            </p>
                                                        </div>
                                                        <div className="col-2">
                                                            <h6 className="fw-bold mb-0 text-uppercase">
                                                                TOTAL
                                                            </h6>
                                                            <p>
                                                                &#x20b9; {x.total}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Order Details */}
                                                <div className="col-4 hover">
                                                    <p className="text-end">
                                                        ORDER # {x.id} <br/>
                                                        <Link to="/admin/admin-order-details" state={x}
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
                                                                <img className=""
                                                                     src={"http://localhost:5000" + val.photo}
                                                                     alt={val.productName} style={{width: "70px"}}
                                                                />
                                                            </div>

                                                            <div className="col-10">
                                                                <h5 className="mt-15">{val.productName}</h5>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="col-3">
                                                    <button className="btn btn-warning  btn-sm w-100">
                                                        Cancel Shipping
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippedOrder