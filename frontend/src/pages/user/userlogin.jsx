import {useForm} from "react-hook-form";
import {ErrorMessage} from "@hookform/error-message";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserContext} from "../../App.jsx";

function UserLogin() {
    let {setIsAuthenticated, ReadCartCount} = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();
    const navigate = useNavigate()

    async function onSubmit(data) {
        //console.log(data)
        let url = "http://localhost:5000/user-login";
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json();
        console.log(response)
        if (response.error != "") {
            Qual.errordb('Error', response.error)
        } else {
            localStorage.setItem("userToken", response.token);
            setIsAuthenticated(true);
            ReadCartCount();
            navigate("/user/dashboard");
            //window.location.reload()
        }
    }

    return (
        <>
            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='http://localhost:5173/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> User <span></span> Login
                        </div>
                    </div>
                </div>
                <div className="page-content pt-150 pb-150">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="row">
                                    <div className="col-lg-6 pr-30 m d-none d-lg-block">
                                        <img className="border-radius-15" src="/assets/imgs/page/Login-6.png" alt=""/>
                                    </div>
                                    <div className="col-lg-6 col-md-8 card shadow bg-16 p-4">
                                        <div className="login_wrap widget-taber-content background-white">
                                            <div className="padding_eight_all ">
                                                <div className="heading_s1">
                                                    <img className="border-radius-15 "
                                                         src="/assets/imgs/page/forgot_password.svg" alt=""/>
                                                    <h2 className=" text-brand mb-5"> Welcome to Fresco</h2>
                                                </div>
                                                <h4 className="mb-10">Log In User Account</h4>
                                                <form onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="form-group">
                                                        <input
                                                            className="form-control  " {...register('email', {required: "This field is required"})}
                                                            type="email" placeholder="enter email"/>
                                                        <ErrorMessage
                                                            errors={errors}
                                                            name="email"
                                                            render={({message}) => <p
                                                                className={"error-msg"}>{message}</p>}
                                                        />
                                                    </div>
                                                    <div className="form-group d-flex align-items-center">
                                                        <input
                                                            className="form-control " {...register('password', {required: "password cannot be empty"})}
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="enter password"/>
                                                        <i
                                                            className={showPassword ? "fi-rs-eye-crossed" : "fi-rs-eye"}
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            style={{marginLeft: "-30px", cursor: "pointer"}}
                                                        ></i>
                                                    </div>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="password"
                                                        render={({message}) => <p
                                                            className={"error-msg"} >{message}</p>}
                                                    />
                                                    <div className="contact-from-area padding-20-row-col">
                                                        <p className="mb-30">Don't have an account <a
                                                            href='http://localhost:5173/user-signup'>Create here</a></p>
                                                    </div>
                                                    <div className="form-group">
                                                        <button type="submit"
                                                                className="btn btn-heading btn-block hover-up"
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
        </>
    )
}

export default UserLogin