import {useForm} from "react-hook-form";
import {useState, useEffect, useRef} from "react";
import {ErrorMessage} from "@hookform/error-message";
import Modal from 'react-bootstrap/Modal';

function ManageProducts() {
    const {
        register, handleSubmit,
        reset,
        formState: {errors}
    } = useForm();
    const [category, setCategory] = useState([]);
    const [subcategory, setSubCategory] = useState([]);
    const [products, setProducts] = useState([]);

    async function onSubmit(data) {
        //console.log(data);
        let response = await fetch("http://localhost:5000/products", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        //console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        } else {
            reset()
            ReadProducts()
            Qual.successdb('Success', response.message)
        }
    }

    async function ReadCategory() {
        let url = "http://localhost:5000/category";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else {
            setCategory(response.records);
            // console.log(response.records)
        }
    }

    async function ReadSubCategory(e) {
        let categoryId = e.target.value;
        console.log(categoryId)
        // return false;

        if (categoryId === "") {
            alert("Please Select Category");
        } else {
            let url = "http://localhost:5000/get-subcategory/" + categoryId;
            let response = await fetch(url);
            response = await response.json();
            // console.log(response)
            if (response.error !== "") {
                alert(response.error);
            } else {
                setSubCategory(response.records);
                //console.log(response.records)
            }
        }
    }

    async function ReadProducts() {
        let url = "http://localhost:5000/products";
        let response = await fetch(url);
        response = await response.json();
        console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else {
            setProducts(response.records);
            //console.log(response.records)
        }
    }

    async function DeleteProducts(id) {
        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
         if (result.isConfirmed) {
            let url = `http://localhost:5000/products/${id}`
            let response = await fetch(url, {method: "DELETE"})
            response = await response.json()
            //console.log(response)
            if (response.error !== '') {
                Qual.errordb('Error', response.error)
            } else {
                ReadProducts()
                Qual.successdb('Success', response.message)
            }
         }
      })
    }

    useEffect(() => {
        ReadCategory();
        ReadProducts()
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [pId, setPId] = useState('')

    function ShowModal(product_id) {
        setPId(product_id)
        handleShow();
    }

    const fileRef = useRef(null)

    async function UploadPhoto() {
        // console.log(fileRef.current.files[0]);

        let formData = new FormData();
        formData.append("pId", pId);
        formData.append("photo", fileRef.current.files[0]);

        let url = "http://localhost:5000/upload-photo";
        let response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        response = await response.json();
        // console.log(response);

        if (response.error !== "") {
            alert(response.error);
        } else {
            handleClose();
            ReadProducts();
            // console.log(response.records)
        }
    }

    return (
        <>
            <main className="main pages mt-65">
                <div className="page-content pt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <section className="mb-75">
                                    <div className="row">
                                        <div className="col-xl-8 card bg-16 shadow p-5">
                                            <div className="contact-from-area padding-20-row-col">
                                                <h5 className="text-brand mb-10">Add Product Form</h5>
                                                <h2 className="mb-10">Drop a New Product</h2>
                                                <p className="text-muted mb-30 font-sm">Please select category and
                                                    subcategory
                                                    under which you want to add product *</p>
                                                <form className="contact-form-style mt-30"
                                                      onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="style mb-20">
                                                                <select className={"form-1"}
                                                                        {...register('category', {required: "This field is Required"})}
                                                                        onChange={ReadSubCategory}
                                                                >
                                                                    <option value="">Please Select Category</option>
                                                                    {category.map(x => (
                                                                        <option key={x.id} value={x.id}>
                                                                            {x.categoryName}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="category"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="cpl-lg-6 col-md-6">
                                                            <div className="style mb-20">
                                                                <select
                                                                    className={"form-1"} {...register('subcategory', {required: "This field is Required"})}>
                                                                    <option value="">Please Select SubCategory</option>
                                                                    {subcategory.map(x => (
                                                                        <option key={x.subcategory_id}
                                                                                value={x.subcategory_id}>
                                                                            {x.name}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="subcategory"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input type={'text'}
                                                                       placeholder={"Enter Product name"} {...register('productName', {required: "This field is Required"})}/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="productName"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input type={'number'} min="0"
                                                                       placeholder={"Enter Price"}  {...register('price', {required: "This field is Required"})}/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="price"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input type={'number'} min="0"
                                                                       placeholder={"Enter Discount"}   {...register('discount', {required: "This field is Required"})}/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="discount"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input type={'number'} min="0"
                                                                       placeholder={"Enter stock"} {...register('stock', {required: "This field is Required"})}/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="stock"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="textarea-style mb-30">
                                                            <textarea
                                                                {...register('description', {required: "This field is required"})}
                                                                cols="21"
                                                                rows="5" placeholder="Enter description"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="description"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                            <button type="submit">Submit</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 pl-50 d-lg-block d-none">
                                            <img className="border-radius-15 mt-50" src="/assets/imgs/myimg/basket-3.jpg"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* Table */}
                            <div className=" col-lg-10 m-auto">
                                <h3 className="text-brand mb-10">Stock List</h3>
                                <table className='table table-hover '>
                                    <thead className='table-active'>
                                    <tr>
                                        <th>#</th>
                                        <th>Photo</th>
                                        <th>Item Name</th>
                                        <th>Description</th>
                                        <th>Category Name</th>
                                        <th>SubCategory Name</th>
                                        <th>Stock</th>
                                        <th className="text-center"> Unit Price</th>
                                        <th className="text-center">Discount</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {products.map((value, index) =>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {!value.photo ?
                                                    <button onClick={() => ShowModal(value.product_id)}
                                                            className="btn btn-success btn-xs">Upload</button> :
                                                    <img src={"http://localhost:5000" + value.photo} alt="#" style={{width: '50px'}}/>
                                                }</td>
                                            <td>{value.productName}</td>
                                            <td>{value.description}</td>
                                            <td>{value.categoryName}</td>
                                            <td>{value.name}</td>
                                            <td>{value.stock }</td>

                                            <td className="text-center">&#x20b9;{value.price}</td>
                                            <td className="text-center">{value.discount + '%'}</td>
                                            <td className="text-center">
                                                <button className="button btn-xs mx-2 "
                                                        type={"button"}
                                                        onClick={() => DeleteProducts(value.product_id)}>
                                                    delete
                                                </button>

                                                {/*<button className=" button2 btn btn-xs"*/}
                                                {/*        type={"button"}*/}
                                                {/*>*/}
                                                {/*    Edit*/}
                                                {/*</button>*/}
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>


            <Modal show={show} onHide={handleClose} centered >
                <Modal.Header className="bg-16" closeButton>
                    <div className="modal-text">
                        <Modal.Title><h4>Upload Photo</h4></Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className="bg-3">
                    <div className="mb-3 text-black fw-bold">
                        <label htmlFor="">Select Photo</label>
                        <input type="file" ref={fileRef} className="form-control"/>
                    </div>

                    <button type="button" onClick={UploadPhoto} className="btn btn-success">Upload</button>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ManageProducts