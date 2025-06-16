import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

function OrderDetails(){
    const [order, setOrder] = useState({});
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.state) {
            navigate("/my-orders")
        } else {
             console.log(location.state)
            setOrder(location.state)
        }
    },[]);
    return(
        <div  className="page-content pt-50">
            {order.id &&
                <div className="section py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <h1 className="mb-30">Order Details</h1>

                                <p>
                                    Ordered on {order.date_time.split("T")[0]}
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>Order # {order.id}</span>
                                </p>

                                <div className="card margin-bottom-card ui-widget-shadow">
                                    <div className="card-body mb-3" style={{backgroundColor:"#ececec"}}>
                                        <div className="row">
                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Shipping Address
                                                </h6>
                                                <p>
                                                    {order.address}, {order.city}, {order.state} {order.pincode}
                                                </p>
                                            </div>

                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Payment Method
                                                </h6>
                                                <p>{order.payment_mode}</p>
                                            </div>

                                            <div className="col-4">
                                                <h6 className="fw-bold mb-0 text-uppercase">
                                                    Order Summary
                                                </h6>
                                                <p>Grand Total:  &#x20b9;{order.total}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="table-responsive  ">
                                    <table className="table table-wishlist">
                                        <thead >
                                        <tr>
                                            <th scope="col" colSpan="2">Product</th>
                                            <th scope="col">Unit Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Net Price</th>
                                        </tr>
                                        </thead>

                                        <tbody>
                                        {order.order_details.map(x =>
                                            <tr key={x.id} className="pt-30">
                                                <td className="">
                                                    <img src={"http://localhost:5000" + x.photo} alt={x.productName}
                                                         className="order-photo me-2" style={{width: "100px"}}/>
                                                </td>
                                                <td className="product-des product-name">
                                                    <h6 className="mb-5 ">
                                                        {x.productName}
                                                    </h6>
                                                    <div className="product-rate-cover">
                                                        <span
                                                            className="font-small ml-5 text-muted">Size/ weight:</span>
                                                        <span className="font-small ">
                                                    {x.description}
                                                </span>
                                                    </div>
                                                </td>
                                                <td>&#x20b9;{x.price}</td>
                                                <td>{x.quantity}</td>
                                                <td>&#x20b9;{(x.price * x.quantity)}</td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OrderDetails