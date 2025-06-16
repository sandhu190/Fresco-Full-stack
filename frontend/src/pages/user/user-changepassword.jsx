import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {ErrorMessage} from "@hookform/error-message";
import {useEffect, useState} from "react";



function UserChangePassword() {
    const navigate = useNavigate()
    const {register, handleSubmit,
        formState:{errors},
        reset} = useForm();
    const [showPassword, setShowPassword] = useState(false);


    async function onSubmit(data) {
        //console.log(data);
        let token = localStorage.getItem("userToken");
        //console.log(token);

        if (!token) {
            navigate("/user-login")
        } else {
            data['token'] = token;
            let url = "http://localhost:5000/user-change-password";
            let response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            response = await response.json();
            //console.log(response)
            if(response.error!==''){
                if(response.error==='jwt expired'){
                    navigate("/user-login")
                }
                else{
                    Qual.errordb('Error',response.error)
                }
            }else {
                reset();
                Qual.successdb('Success',response.message)
            }
        }


    }
    useEffect(() => {
        let token=localStorage.getItem("userToken") //null/ Token
        if(!token){
            navigate("/user-login")
        }
    }, []);
    
    const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
    return (
        <main className="main pages">
            <div className="page-header breadcrumb-wrap">
                <div className="container">
                    <div className="breadcrumb">
                        <a href='http://localhost:5173/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                        <span></span> User <span></span> change password
                    </div>
                </div>
            </div>
            <div className="page-content pt-150 pb-150">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-8 card shadow p-4 col-md-12 bg-16 m-auto">
                            <div className="row">
                                <div className="heading_s1">
                                    <img className="border-radius-15" src="/assets/imgs/page/reset_password.svg"
                                         alt=""/>
                                    <h2 className="mb-15 mt-15">Set new password</h2>
                                    <p className="mb-30">Please create a new password that you don’t use on any other
                                        site.</p>
                                </div>
                                <div className="col-lg-6 col-md-8">
                                    <div className="login_wrap widget-taber-content">
                                        <div className="padding_eight_all ">
                                            <form onSubmit={handleSubmit(onSubmit)}>
                                                <div className="form-group">
                                                    <input type={'password'}
                                                           placeholder={"Current Password"} {...register('password', {required: "This field is Required"})}/>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="password"
                                                        render={({message}) => <p
                                                            className={"error-msg"}>{message}</p>}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type={showPassword ? "text" : "password"}
                                                           placeholder={"New Password"} {...register('newPassword', {
                                                        required: "This field is Required", pattern: {
                                                            value: passwordRegex,
                                                            message: "Invalid password type"
                                                        }
                                                    })}/>
                                                    <i
                                                        className={showPassword ? "fi-rs-eye-crossed" : "fi-rs-eye"}
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        style={{marginLeft: "-30px", cursor: "pointer"}}
                                                    ></i>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="newPassword"
                                                        render={({message}) => <p
                                                            className={"error-msg"}>{message}</p>}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <input type={'password'}
                                                           placeholder={"Confirm Password"} {...register('confirmPassword', {required: "This field is Required"})}/>
                                                    <ErrorMessage
                                                        errors={errors}
                                                        name="confirmPassword"
                                                        render={({message}) => <p
                                                            className={"error-msg"}>{message}</p>}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-heading btn-block hover-up"
                                                            name="login">Reset password
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 pl-50">
                                    <h6 className="mb-15">Password must:</h6>
                                    <p>Be between 6 and 15 characters</p>
                                    <p>Include at least tow of the following:</p>
                                    <ol className="list-insider">
                                        <li>An uppercase character</li>
                                        <li>A lowercase character</li>
                                        <li>A number</li>
                                        <li>A special character</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default UserChangePassword