import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import {useState} from "react";


function AdminLogin() {
    const navigate = useNavigate()
    const {register, handleSubmit,
        formState:{errors}} = useForm();
    const [showPassword, setShowPassword] = useState(false);


    async function onSubmit(data) {
       // console.log(data)
        let url = "http://localhost:5000/adminlogin";
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json();
        // console.log(response)
        if (response.error !== "") {
           Qual.errordb('Error',response.error)
        } else {
            localStorage.setItem("adminToken", response.token)
            navigate("/admin/dashboard")
        }

    }

    return (
        <main className="main pages">
            <div className="page-content pt-150 pb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                            <div className="row">
                                <div className="col-lg-6 pr-30 d-none d-lg-block">
                                    <img className="border-radius-15" src="/assets/imgs/page/login-2.png" alt=""/>
                                </div>
                                <div className="col-lg-6 col-md-8 card shadow p-4 bg-16">
                                    <div className="login_wrap widget-taber-content ">
                                        <div className="padding_eight_all ">
                                            <div className="heading_s1">
                                                <h2 className=" text-brand mb-5"> Welcome to Fresco</h2>
                                            </div>
                                            <h4 className="mb-10">Log In Admin Account</h4>
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group">
                                                    <input
                                                        type="email" {...register("email", {required: "This field is required"})}
                                                        placeholder={"Email *"}/>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="email"
                                                        render={({message}) => <p className={"error-msg"}>{message}</p>}
                                                    />
                                                </div>
                                                <div className="form-group d-flex align-items-center ">
                                                    <input type={showPassword ? "text" : "password"}
                                                           {...register("password", {required: "This field is required"})}
                                                           placeholder={"enter password *"}/>
                                                    <i
                                                        className={showPassword ? "fi-rs-eye-crossed" : "fi-rs-eye"}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        style={{marginLeft: "-30px", cursor: "pointer"}}
                                                    ></i>
                                                </div>
                                                <ErrorMessage
                                                    errors={errors}
                                                    name="password"
                                                    render={({message}) => <p className={"error-msg"}>{message}</p>}
                                                />
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-heading btn-block hover-up"
                                                            name="login">Log in
                                                    </button>
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
        </main>
    )
}

export default AdminLogin;