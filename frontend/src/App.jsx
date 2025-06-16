import {BrowserRouter, Routes, Route} from "react-router-dom";
import Category from "./pages/admin/category.jsx";
import AdminLogin from "./pages/admin/adminlogin.jsx";
import Dashboard from "./pages/admin/dashboard.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import ChangePassword from "./pages/admin/changepassword.jsx";
import UserSignup from "./pages/user/user-signup.jsx";
import UserLogin from "./pages/user/userlogin.jsx";
import UserDashboard from "./pages/user/Userdashboard.jsx";
import Home from "./pages/Home.jsx";
import ManageSubCategory from "./pages/admin/ManageSubCategory.jsx";
import ManageProducts from "./pages/admin/ManageProducts.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Terms from "./pages/Terms&Conditons.jsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.jsx";
import PurchaseGuide from "./pages/PurchaseGuide.jsx";
import UserChangePassword from "./pages/user/user-changepassword.jsx";
import Blog1 from "./pages/Blog1.jsx";
import Blog2 from "./pages/Blog2.jsx";
import Blog3 from "./pages/Blog3.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import Cart from "./pages/user/Cart.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import ProductDescription from "./pages/SingleProduct.jsx";
import ProductsByCategory from "./pages/ProductsByCategory.jsx";
import Shop from "./pages/Shop.jsx";
//context
import {createContext, useEffect, useState} from "react";
import SearchProduct from "./pages/SearchProduct.jsx";
import PendingOrder from "./pages/admin/PendingOrder.jsx";
import ShippedOrder from "./pages/admin/ShippedOrder.jsx";
import DeliveredOrder from "./pages/admin/DeliveredOrder.jsx";
import OrderDetails from "./pages/user/OrderDetails.jsx";
import ThankYou from "./pages/ThankYou.jsx";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails.jsx";

export const UserContext = createContext(null)

function App() {
    const [cartCount, setCartCount] = useState(0)

    async function ReadCartCount() {
        let token = localStorage.getItem("userToken")
        if (!token) {
            setCartCount(0)
        } else {
            let token = localStorage.getItem("userToken") //null/ Token
            let data = {token: token}
            let url = `http://localhost:5000/read-cart-data`
            let response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            response = await response.json()
            //console.log(response)
            setCartCount(response.records.length)
        }
    }

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        ReadCartCount();

        const token = localStorage.getItem("userToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <BrowserRouter>
            <UserContext.Provider value={{cartCount, setCartCount, ReadCartCount, isAuthenticated, setIsAuthenticated}}>
                <Routes>
                    <Route path={"/"} element={<UserLayout/>}>
                        <Route index element={<Home/>}/>
                        <Route path={"*"} element={<PageNotFound/>}/>
                        <Route path={"about"} element={<About/>}/>
                        <Route path={"contact"} element={<Contact/>}/>
                        <Route path={"terms"} element={<Terms/>}/>
                        <Route path={"privacy-policy"} element={<PrivacyPolicy/>}/>
                        <Route path={"purchase-guide"} element={<PurchaseGuide/>}/>
                        <Route path={"blog1"} element={<Blog1/>}/>
                        <Route path={"blog2"} element={<Blog2/>}/>
                        <Route path={"blog3"} element={<Blog3/>}/>
                        <Route path={"user/dashboard"} element={<UserDashboard/>}/>
                        <Route path={"user/change-password"} element={<UserChangePassword/>}/>
                        <Route path={"user-signup"} element={<UserSignup/>}/>
                        <Route path={"user-login"} element={<UserLogin/>}/>
                        <Route path={"user-cart"} element={<Cart/>}/>
                        <Route path={"user-checkout"} element={<Checkout/>}/>
                        <Route path={"product-description"} element={<ProductDescription/>}/>
                        <Route path={"product-by-category/:categoryId"} element={<ProductsByCategory/>}/>
                        <Route path={"shop"} element={<Shop/>}/>
                        <Route path={"search-bar-product"} element={<SearchProduct/>}></Route>
                        <Route path={"order-details"} element={<OrderDetails/>}/>

                    </Route>

                    <Route path="/bill" element={<ThankYou/>}/>

                    <Route path={"/admin-login"} element={<AdminLogin/>}/>

                    <Route path={"/admin"} element={<AdminLayout/>}>
                        <Route path={"change-password"} element={<ChangePassword/>}/>
                        <Route path={"dashboard"} element={<Dashboard/>}/>
                        <Route path={"category"} element={<Category/>}/>
                        <Route path={"manage-subcategory"} element={<ManageSubCategory/>}/>
                        <Route path={"manage-products"} element={<ManageProducts/>}/>
                        <Route path={"order-pending"} element={<PendingOrder/>}/>
                        <Route path={"order-shipped"} element={<ShippedOrder/>}/>
                        <Route path={"order-delivered"} element={<DeliveredOrder/>}/>
                        <Route path={"admin-order-details"} element={<AdminOrderDetails/>}/>
                    </Route>


                </Routes>
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App
