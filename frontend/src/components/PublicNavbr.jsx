import BurgerIcon from "./BurgerIcon.jsx";
import {useNavigate} from "react-router-dom";
import Dropdown from "./Dropdown.jsx";
import {useContext} from "react";
import {UserContext} from "../App.jsx";
import {useForm} from "react-hook-form";

function PublicNavbar() {
    // To show cart count
    let {cartCount} = useContext(UserContext);
    let {isAuthenticated} = useContext(UserContext)
    //console.log(cartCount)
    const {handleSubmit,register}=useForm()
    const shouldShowLoginRegister = !isAuthenticated;

    async function onSubmit(data){
        console.log(data)
        let url = "http://localhost:5000/search-bar"
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        }else if (response.records.length === 0) {
            navigate("/*");
        } else {
            navigate("/search-bar-product",{ state: { records: response.records } })
        }
    }

    window.onload = () => {
        const header = document.querySelector('.h1-wrap');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    };

    const navigate = useNavigate()
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
            localStorage.removeItem("userToken");
            localStorage.removeItem("userNotification");
            navigate("/");
            window.location.reload();
            }
        })
    };
    return (
        <>
            <header className="header-area header-style-1  header-height-2 ">
                <div className="mobile-promotion">
                    <span>Grand opening, <strong>up to 15%</strong> off all items. Only <strong>3 days</strong> left</span>
                </div>
                <div className="header-middle header-middle-ptb-1 d-none d-lg-block">
                    <div className="container">
                        <div className="header-wrap">
                            <div className="logo logo-width-2 mx-lg-2">
                                <a href='http://localhost:5173/'><img src="/assets/imgs/theme/logo.svg" alt="logo"/></a>
                            </div>
                            <div className="header-right ">
                                <div className="search-form search-style-2 ml-110">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {/*<select className="form-select" style={{width: "160px"}} {...register("category")}>*/}
                                        {/*    <option>All Categories</option>*/}
                                        {/*    <option>Milk & Dairy</option>*/}
                                        {/*    <option>Fruits & Vegetables</option>*/}
                                        {/*    <option>Cold Drinks & Juices</option>*/}
                                        {/*    <option>Snack & Munchies</option>*/}
                                        {/*    <option>Chicken, Meat & Fish</option>*/}
                                        {/*    <option>Pet Foods</option>*/}
                                        {/*    <option>Bakery & Biscuit</option>*/}
                                        {/*    <option>Tea, Coffee & Herbal Drinks</option>*/}
                                        {/*    <option>Cleaning Essentials</option>*/}
                                        {/*    <option>Atta,Rice & Dal</option>*/}
                                        {/*</select >*/}
                                        <input type="text"{...register("searchBar")} placeholder="Search for items..."/>
                                        <button type="submit"><i className="fi-rs-search"></i></button>
                                    </form>
                                </div>
                                <div className="header-action-right">
                                    <div className="header-action-2">
                                        <div className="header-action-icon-2">
                                            <a className='mini-cart-icon' href='/user-cart'>
                                                <img alt="Nest" src="/assets/imgs/theme/icons/icon-cart.svg"/>
                                                <span className="pro-count blue">{cartCount}</span>
                                            </a>
                                            <a href='/user-cart'><span className="lable">Cart</span></a>
                                        </div>
                                        <div className="header-action-icon-2">
                                            <a href={!isAuthenticated ? '/user-login' : '#'}>
                                                <img className="svgInject" alt="Nest"
                                                     src="/assets/imgs/theme/icons/icon-user.svg"/>
                                            </a>
                                            <a href={!isAuthenticated ? '/user-login' : '#'}><span
                                                className="lable ml-0">Account</span></a>
                                            {isAuthenticated && (
                                                <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                                    <ul>
                                                        <li><a href='/user/dashboard'><i
                                                            className="fi fi-rs-user mr-10"></i>My Account</a></li>
                                                        <li><a onClick={handleLogout}><i
                                                            className="fi fi-rs-sign-out mr-10"></i>Log out</a></li>
                                                    </ul>
                                                </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-15 h1-wrap ">
                    <div className="container">
                        <div className="header-wrap header-space-between position-relative ">
                            <div className="logo logo-width-1 d-block d-lg-none">
                                <a href='/'><img src="/assets/imgs/theme/logo.svg" alt="logo"/></a>
                            </div>
                            <div className="header-nav d-none d-lg-flex ">
                                <Dropdown/>
                                <div
                                    className="main-menu main-menu-padding-1 main-menu-lh-2 d-none d-lg-block font-heading ">
                                    <nav>
                                        <ul className={"ml-100"}>
                                            <li className="ml-20">
                                                <a href='/'>Home</a>
                                            </li>
                                            <li className='ml-20'>
                                                <a href='/about'>About</a>
                                            </li>
                                            <li className='ml-20'>
                                                <a href='/contact'>Contact</a>
                                            </li>
                                            <li className='ml-20'>
                                                <a href='/shop'>Shop </a>
                                            </li>
                                            <li className='ml-20'>
                                                <a href='#'>Blog <i
                                                    className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><a href='/blog1'>Recipe</a></li>
                                                    <li><a href='/blog2'>Kitchen</a></li>
                                                    <li><a href='/blog3'>News</a></li>
                                                </ul>
                                            </li>
                                            <li className='ml-20'>
                                                <a href="#">Pages <i className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    <li><a href='/about'>About Us</a></li>
                                                    <li><a href='/contact'>Contact</a></li>
                                                    <li><a href='/purchase-guide'>Purchase Guide</a></li>
                                                    <li><a href='/privacy-policy'>Privacy Policy</a></li>
                                                    <li><a href='/terms'>Terms of Service</a></li>
                                                </ul>
                                            </li>
                                            <li className='ml-20'>
                                                <a href="#">User <i className="fi-rs-angle-down"></i></a>
                                                <ul className="sub-menu">
                                                    {!isAuthenticated && (
                                                        <li><a href='/user-login'>Login</a></li>
                                                    )}
                                                    { !isAuthenticated && (
                                                        <li><a href='/user-signup'>Register</a></li>
                                                    )}
                                                    {isAuthenticated && (
                                                        <li><a href="/user/change-password">change password</a></li>
                                                    )}
                                                    {/*<li><a href='/user/change-password'>change password</a></li>*/}
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="hotline d-none d-lg-flex">
                                <img src="/assets/imgs/theme/icons/icon-headphone.svg" alt="hotline"/>
                                <p>1900 - 888<span>24/7 Support Center</span></p>
                            </div>

                            {/*Made responsive for mobile*/}
                            <BurgerIcon/>
                            <div className="header-action-right d-block d-lg-none">
                                <div className="header-action-2">
                                    <div className="header-action-icon-2">
                                        <a className='mini-cart-icon' href='/user-cart'>
                                            <img alt="Nest" src="/assets/imgs/theme/icons/icon-cart.svg"/>
                                            <span className="pro-count blue">{cartCount}</span>
                                        </a>
                                    </div>
                                    <div className="header-action-icon-2">
                                        <a href={!isAuthenticated ? '/user-login' : '#'}>
                                            <img className="svgInject" alt="Nest"
                                                 src="/assets/imgs/theme/icons/icon-user.svg"/>
                                        </a>
                                        <a href={!isAuthenticated ? '/user-login' : '#'}><span
                                            className="lable ml-0">Account</span></a>
                                        {isAuthenticated && (
                                            <div className="cart-dropdown-wrap cart-dropdown-hm2 account-dropdown">
                                                <ul>
                                                    <li><a href='/user/dashboard'><i
                                                        className="fi fi-rs-user mr-10"></i>My Account</a></li>
                                                    <li><a href='/track-order'><i
                                                        className="fi fi-rs-location-alt mr-10"></i>Order Tracking</a>
                                                    </li>
                                                    <li><a onClick={handleLogout}><i
                                                        className="fi fi-rs-sign-out mr-10"></i>Log out</a></li>
                                                </ul>
                                            </div>)}
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

export default PublicNavbar