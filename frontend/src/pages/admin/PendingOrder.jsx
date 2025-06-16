import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {useForm} from "react-hook-form";

function PendingOrder(){
    const {handleSubmit,register}=useForm()
    async function onSubmit(data){
        // console.log(data)
        let url = "http://localhost:5000/ship-order";
        let response = await fetch(url, {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({...data,orderId}),
        });
        response = await response.json();
        console.log(response);
        if (response.error !== "") {
           Qual.errordb("Error",response.error)
        } else {
            ReadPendingOrder()
            Qual.successdb("Success",response.message)
        }
    }

    let[pendingOrder,setPendingOrder]=useState([])
    async function ReadPendingOrder(){
        let url = "http://localhost:5000/pending-order";
        let response = await fetch(url);
        response = await response.json();
        //console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setPendingOrder(response.records);
        }

    }

    useEffect(() => {
        ReadPendingOrder()
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [orderId, setOrderId] = useState('')

    function ShowModal(id) {
        setOrderId(id)
        handleShow();
    }
    return(
        <>
            <div className="page-content mt-100 pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <h1 className="mb-3">Pending orders</h1>

                            {
                                // pending order.length > 0 ?
                                pendingOrder.map(x =>
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
                                                    <button onClick={() => ShowModal(x.id)}
                                                            className="btn button2 tn-sm w-100 mb-3">
                                                        Ship Order
                                                    </button>

                                                    <button className="btn btn-warning  btn-sm w-100">
                                                        Cancel Order
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
            <Modal show={show} onHide={handleClose}
                   size="lg"
                   top >
                <Modal.Header className="bg-16" closeButton>
                    <div className="modal-text">
                        <Modal.Title><h3>Ship Order</h3></Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className="bg-3">
                    <div className="mb-3 p-4 ">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className={"row"}>
                                <div className="col-6">
                                    <label className="fw-bold  h6 text-black" htmlFor="">Tracking Id</label>
                                    <input type="text" className="form-group"
                                        {...register("track_id")}
                                           placeholder="enter Track Id.."/>
                                </div>
                                <div className='col-6'>
                                    <label className="fw-bold h6 text-black" htmlFor="">Shipping Company</label>
                                    <input type="text" className="form-group"
                                        {...register("shippingCompany")}
                                           placeholder="enter shipping partner"/>
                                </div>
                                <div className="col-12">
                                    <label className="fw-bold h6 text-black" htmlFor="">Customer Name</label>
                                    <input type="text" className="form-group"

                                           {...register("customerName")}
                                           placeholder="enter Customer Name"/>
                                </div>
                                <label className="fw-bold h6 text-black" htmlFor="">Shipping Address</label>
                                <textarea className="form-group"
                                          {...register("address")}
                                          placeholder="enter Shipping Address.."/>
                                <button type="submit" onClick={handleClose} className="btn btn-success">Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PendingOrder