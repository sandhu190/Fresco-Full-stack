import {useForm} from "react-hook-form";
import {useState, useEffect} from "react";
import {ErrorMessage} from "@hookform/error-message";

function Category() {
    const {register, reset,
        handleSubmit,
        formState:{errors}} = useForm();

    async function onSubmit(data) {
        console.log(data);
        let response = await fetch("http://localhost:5000/category", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(data),
        });
        response = await response.json();
        //console.log(response)
        if(response.error!==''){
            Qual.errordb('Error',response.error)
        }else {
            reset()
            ReadCategory()
            Qual.successdb('Success',response.message)
        }
    }

    const [category, setCategory] = useState([]);

    async function ReadCategory() {
        let url = "http://localhost:5000/category";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setCategory(response.records);
        }
    }

    useEffect(() => {
        ReadCategory();
    }, []);

    async function DeleteCategory(id) {
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
                const url = `http://localhost:5000/category/${id}`
                const response = await fetch(url, { method: "DELETE" })
                const data = await response.json()
                if (data.error !== '') {
                    Swal.fire({
                        title: "Error",
                        text: data.error,
                        icon: "error"
                    })
                } else {
                    ReadCategory()
                    Swal.fire({
                        title: "Deleted!",
                        text: data.message,
                        icon: "success"
                    })
                }
            }
        })
    }

    return (
        <main className="main pages mt-65">
            <div className="page content pt-50">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <section className="mb-50">
                                <div className="row">
                                    <div className="col-xl-8">
                                        <div className="contact-from-area card shadow p-4 bg-16  padding-20-row-col">
                                            <h1 className=" mb-10">Add New Category </h1>
                                            <form className="contact-form-style mt-30"
                                                  onSubmit={handleSubmit(onSubmit)}>
                                                <div className="row">
                                                    <div className="col-lg-12 col-md-8">
                                                        <div className="style-2 mb-20">
                                                            <input className="form-1"
                                                                   type={"text"} {...register("CategoryName", {required: "This field is required"})}
                                                                   placeholder="Enter Category Name"
                                                            />
                                                            <ErrorMessage
                                                                errors={errors}
                                                                name="CategoryName"
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
                                            <img src="/assets/imgs/myimg/category.jpg" alt=""/>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/*Table*/}
                        <div className="col-lg-10 m-auto mb-60">
                            <h3 className="text-brand mb-10">Category List</h3>
                            <table className='table table-hover '>
                                <thead className='table-active'>
                                <tr>
                                    <th>#</th>
                                    <th>Category Name</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {category.map((value, index) =>
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{value.categoryName}</td>
                                        <td className="text-center">
                                            <button className="button btn-xs" type={"button"}
                                                    onClick={() => DeleteCategory(value.id)}>
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

export default Category;