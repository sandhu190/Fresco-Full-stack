import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";


function AdminLayout(){
    const navigate=useNavigate()
    useEffect(() => {
        let token=localStorage.getItem("adminToken") //null/ Token
        if(!token){
            navigate("/admin-login")
        }
    }, []);
    return(
        <>
            <AdminNavbar/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default AdminLayout
