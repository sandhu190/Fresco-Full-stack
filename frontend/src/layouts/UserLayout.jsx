import Footer from "../components/Footer";
import {Outlet} from "react-router-dom";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import PublicNavbar from "../components/PublicNavbr.jsx";

function UserLayout(){
    // const navigate=useNavigate()
    // useEffect(() => {
    //     let token=localStorage.getItem("userToken") //null/ Token
    //     if(!token){
    //         navigate("/user-login")
    //     }
    // }, []);
    return(
        <>
            <PublicNavbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default UserLayout
