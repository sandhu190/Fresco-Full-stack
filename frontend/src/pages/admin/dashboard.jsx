import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useEffect} from "react";
function Dashboard(){
       const ShowNotification = localStorage.getItem('AdminNotification');
    useEffect(() => {
        if (!ShowNotification) {
            console.log('Notification shown');
            toast('🦄 Welcome Back John!', {
                 position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            localStorage.setItem('AdminNotification', 'true');
        }
    }, []);

    return(
        <>
            <div className="page-content pt-150 pb-150">
                <div className="container mt-30 mb-50">
                    <div className="col-xl-8 col-lg-10 col-md-12 m-auto text-center">
                        <div className="card bg-16 shadow ">
                            <h1 className={"mt-65 mb-65"}>Welcome to Admin Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </>
    )
}

export default Dashboard