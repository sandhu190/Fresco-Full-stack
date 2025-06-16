import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import {ErrorMessage} from "@hookform/error-message";

function ManageSubCategory() {
    const [subcategory, setSubCategory] = useState([]);
    const [category, setCategory] = useState([]);

    const {
        register, handleSubmit, reset,
        formState: {errors}
    } = useForm();

    async function onSubmit(data) {
        //console.log(data);
        let response = await fetch("http://localhost:5000/subcategory", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        // console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        } else {
            reset();
            ReadSubCategory()
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
            //console.log(response.records)
        }
    }



    async function ReadSubCategory() {
        let url = "http://localhost:5000/subcategory";
        let response = await fetch(url);
        response = await response.json();
        console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else {
            ReadSubCategory()
            setSubCategory(response.records);
            //console.log(response.records)
        }
    }

    useEffect(() => {
        ReadCategory();
        ReadSubCategory()
    }, []);


    async function DeleteSubCategory(subcategory_id) {
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
                let url = `http://localhost:5000/subcategory/${subcategory_id}`
                let response = await fetch(url, {method: "DELETE"})
                response = await response.json()
                // console.log(response)
                if (response.error !== '') {
                    Qual.errordb('Error', response.error)
                } else {
                    ReadSubCategory()
                    Qual.successdb('Success', response.message)
                }
            }
        })
    }

    return (
        <main className="main pages mt-65">
            <div className="page-content pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <section className="mb-50">
                                <div className="row">
                                    <div className="col-xl-8">
                                        <div className="contact-from-area card shadow p-4 bg-16 padding-20-row-col">
                                            <h5 className="text-brand mb-10">Add SubCategory Form</h5>
                                            <h2 className="mb-10">Drop a New SubCategory</h2>
                                            <p className="text-muted mb-30 font-sm">Please select category under
                                                which you want to add new subcategory *</p>
                                            <form className="contact-form-style mt-30"
                                                  onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-lg-6 col-md-6">
                                                        <div className="style mb-20">
                                                            <select
                                                                className={"form-1"} {...register('category', {required: "This field is Required"})}>
                                                                <option value="">Please Select Category</option>
                                                                {category.map(category => (
                                                                    <option key={category.id} value={category.id}>
                                                                        {category.categoryName}
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
                                                            <input
                                                                placeholder={"Enter Subcategory"} {...register('subcategory', {required: "This field is Required"})}/>
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name="subcategory"
                                                                render={({message}) => <p
                                                                    className={"error-msg"}>{message}</p>}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-lg-12 col-md-12">
                                                        <button className="submit submit-auto-width"
                                                                type="submit">Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 pl-50 d-lg-block d-none">
                                            <img src="/assets/imgs/myimg/basket.jpg" alt=""/>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className="col-lg-10 m-auto">
                            <h3 className="text-brand mb-10">Stock List</h3>
                            <table className='table table-hover'>
                                <thead className='table-active'>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th>SubCategory Name</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {subcategory.map((value, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.categoryName}</td>
                                        <td>{value.name}</td>
                                        <td className="text-center">
                                            <button className="button btn-xs"
                                                    type={"button"}
                                                    onClick={() => DeleteSubCategory(value.subcategory_id)}>
                                                delete
                                            </button>
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
    )
}

export default ManageSubCategory

