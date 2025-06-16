import AdminBurgerIcon from "./AdminBurgerIcon.jsx";
import {useNavigate} from "react-router-dom";

function AdminNavbar(){
    const navigate=useNavigate()
    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Logout"
        }).then( (result) => {
             if (result.isConfirmed) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem('AdminNotification')
                navigate("/admin-login")
             }
            })
    };

    return(
        <>
            <header className="header-area   header-height-2">
                <div className="mobile-promotion">
                    <span>Grand opening, <strong>up to 15%</strong> off all items. Only <strong>3 days</strong> left</span>
                </div>

                <div className=" sticky-header bg-12">
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative ">
                            <div className="logo logo-width-1 d-block d-lg-none">
                                <a href='/admin/dashboard'><img src="/assets/imgs/theme/logo.svg" alt="logo"/></a>
                            </div>
                            <div className="header-middle  d-none d-lg-block ">
                                <div className="container">
                                    <div className="header-wrap">
                                        <div className="logo logo-width-1 col-lg-2 ">
                                            <a href='/admin/dashboard'><img src="/assets/imgs/theme/logo.svg"
                                                                            alt="logo"/></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="header-nav d-none d-lg-flex mx-5">
                                <div
                                    className="main-menu main-menu-padding-1 main-menu-lh-2  font-heading  ">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a href='/admin/dashboard'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20"
                                                         fill="currentColor" className="bi bi-house mx-1 "
                                                         viewBox="0 0 16 20">
                                                        <path
                                                            d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                                                    </svg>
                                                    Dashboard</a>
                                            </li>
                                            <li>
                                                <a className={"hover"}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" fill="currentColor" className="bi bi-bag mx-1" viewBox="0 0 16 20">
                                                        <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                                    </svg>
                                                    Manage Orders <i
                                                    className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><a href='/admin/order-pending'>Pending</a>
                                                    </li>
                                                    <li><a href='/admin/order-shipped'>Shipped</a></li>
                                                    <li><a href='/admin/order-delivered'>delivered</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a className={"hover"}> Manage Shop <i
                                                    className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><a href='/admin/category'>Manage Category</a>
                                                    </li>
                                                    <li><a href='/admin/manage-subcategory'>Manage SubCategory</a></li>
                                                    <li><a href='/admin/manage-products'>Manage Products</a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <a href='/admin/change-password'>Change Password</a>
                                            </li>
                                            <li>
                                                <a onClick={handleLogout} className="hover-boder">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20"
                                                         fill="currentColor" className="bi bi-box-arrow-right mx-1"
                                                         viewBox="0 0 16 19">
                                                        <path fill="evenodd"
                                                              d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                                        <path fill="evenodd"
                                                              d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                                    </svg>
                                                    Logout
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="d-none d-lg-flex">
                                <h4><a href={"/"} className={"hover"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                                         className="bi bi-shop mx-1" viewBox="0 0 16 21">
                                        <path
                                            d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"/>
                                    </svg>
                                    Visit Store
                                </a></h4>
                            </div>

                            {/*Made responsive for mobile*/}
                            <AdminBurgerIcon/>
                            <div className="header-action-right d-block d-lg-none">
                                <div className="header-action-2">
                                    <div className="header-action-icon-2">
                                        <span><a href={"/"} className={"hover"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                 fill="currentColor"
                                                 className="bi bi-shop mx-1" viewBox="0 0 16 21">
                                                <path
                                                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.37 2.37 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z"/>
                                            </svg>
                                            Visit Store
                                        </a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default AdminNavbar