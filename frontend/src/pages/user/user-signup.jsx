import {useForm} from "react-hook-form"
import {ErrorMessage} from "@hookform/error-message";
import {useState} from "react";

function UserSignup(){
    const {register, handleSubmit,formState:{errors},
    reset}= useForm();
    const [showPassword, setShowPassword] = useState(false);


    async function onSubmit(data){
        //console.log(data)
        let url = "http://localhost:5000/user-signup";
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json();
        //console.log(response)
        if(response.error!=''){
            Qual.errordb('Error',response.error)
        }else
        {
            // for successfull account created
            reset()
            Qual.successdb('Registered',response.message)
        }

    }
    return (
        <>
            <main className="main pages">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='http://localhost:5173/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> User <span></span> Register
                        </div>
                    </div>
                </div>
                <div className="page-content pt-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <section className="mb-50">
                                    <div className="row">
                                        <div className="col-xl-8 card shadow p-5 bg-16 ">
                                            <div className="contact-from-area padding-20-row-col">
                                                <h1 className=" mb-10">Create an Account</h1>
                                                <p className="mb-30">Already have an account? <a
                                                    href='http://localhost:5173/user-login'>Login</a></p>
                                                <form className="contact-form-style mt-30"
                                                      onSubmit={handleSubmit(onSubmit)}>
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="style mb-20 ">
                                                                <input
                                                                    {...register('fullName', {required: "This field is required"})}
                                                                    type="text"
                                                                    placeholder="enter name"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="fullName"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="cpl-lg-6 col-md-6">
                                                            <div className="style mb-20">
                                                                <input
                                                                    {...register('email', {required: "This field is required"})}
                                                                    type="email" placeholder="enter email"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="email"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input
                                                                    {...register('password', {required: "password cannot be empty"})}
                                                                    type={showPassword ? "text" : "password"}
                                                                    placeholder="enter password"/>
                                                                <i
                                                                    className={showPassword ? "fi-rs-eye-crossed" : "fi-rs-eye"}
                                                                    onClick={() => setShowPassword(!showPassword)}
                                                                    style={{marginLeft: "-30px", cursor: "pointer"}}
                                                                ></i>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="password"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input
                                                                    {...register('phone', {required: "This field is required"})}
                                                                    type="tel"
                                                                    placeholder="enter phone number"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="phone"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <select
                                                                    className="form-1 " {...register('gender', {required: "This field is required"})}>
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
                                                        </div>
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="input-style mb-20">
                                                                <input
                                                                    {...register('city', {required: "This field is required"})}
                                                                    type="text"
                                                                    placeholder="enter city"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="city"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12">
                                                            <div className="textarea-style mb-30">
                                                            <textarea
                                                                {...register('address', {required: "This field is required"})}
                                                                cols="10"
                                                                rows="2" placeholder="enter address"/>
                                                                <ErrorMessage
                                                                    errors={errors}
                                                                    name="address"
                                                                    render={({message}) => <p
                                                                        className={"error-msg"}>{message}</p>}
                                                                />
                                                            </div>
                                                            <div className="col-lg-6 col-md-6">
                                                                <div className="input-style mb-20">
                                                                    <select
                                                                        className="form-1" {...register('state', {required: "This field is required"})}>
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
                                                            </div>
                                                            <div className="login_footer form-group mb-10">
                                                                <div className="chek-form">
                                                                    <div className="custome-checkbox">
                                                                        <input className="form-check-input"
                                                                               type="checkbox"
                                                                               name="checkbox" id="exampleCheckbox12"
                                                                               value="" {...register("x",{required:"This field is required"})}/>
                                                                        <label className="form-check-label"
                                                                               htmlFor="exampleCheckbox12"><span>I agree to terms &amp; Policy.</span></label>
                                                                        <ErrorMessage
                                                                            errors={errors}
                                                                            name="x"
                                                                            render={({message}) => <p
                                                                                className={"error-msg"}>{message}</p>}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <a href='/privacy-policy'><i
                                                                    className="fi-rs-book-alt mr-5 text-muted"></i>Lean
                                                                    more</a>
                                                            </div>
                                                            <div className="form-group mb-30">
                                                                <button type="submit"
                                                                        className="btn btn-fill-out btn-block hover-up font-weight-bold"
                                                                        name="login">Submit &amp; Register
                                                                </button>
                                                            </div>
                                                            <p className="font-xs text-muted"><strong>Note:</strong>Your
                                                                personal data will be used to
                                                                support your experience throughout this website, to
                                                                manage
                                                                access to your account, and
                                                                for other purposes described in our privacy policy</p>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 pl-50 d-lg-block d-none">
                                            <img className="border-radius-15 mt-50" src="/assets/imgs/page/about-1.png"
                                                 alt=""/>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default UserSignup


