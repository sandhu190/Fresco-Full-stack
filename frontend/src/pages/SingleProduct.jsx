import {useState, useEffect} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useContext} from "react";
import {UserContext} from "../App.jsx";
function ProductDescription() {
    let {ReadCartCount}=useContext(UserContext)
    const navigate = useNavigate();
    const location = useLocation();

    const [product, setProduct] = useState([]);

    async function AddToCart(id) {
        let token = localStorage.getItem("userToken");
        if (!token) {
            // alert("Please Login")
            navigate("/user-login")
        } else {
            console.log(id)
            console.log(token)
            let data = {product_id: id, token: token}
            let url = `http://localhost:5000/add-to-cart`
            let response = await fetch(url, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            })
            response = await response.json()
            console.log(response)
            if (response.error !== '') {
                Qual.errordb('Error', response.error)
            } else {
                ReadCartCount()
                toast.success('Product Added to Cart', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }

    }

    useEffect(() => {
        if (!location.state) {
            navigate("/")
        } else {
            console.log(location.state.product);
            setProduct([location.state.product])
        }
    }, []);

    return (
        <>
            <main className="main">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> {product[0]?.name}<span></span>  {product[0]?.productName}
                        </div>
                    </div>
                </div>
                <div className="container mb-30">
                    <div className="row">
                        <div className="col-xl-10 col-lg-12 m-auto">
                            <div className="product-detail accordion-detail">
                                <div className="row mb-50 mt-30">
                                    <div className="col-md-6 col-sm-12 col-xs-12 mb-md-0 mb-sm-5">
                                        <div className="detail-gallery">
                                            <div className="product-image-slider">
                                                <figure className="border-radius-10 ">
                                                    <img src={"http://localhost:5000" + product[0]?.photo} alt="product image"/>
                                                </figure>
                                            </div>
                                        </div>
                                        {/*   end Gallery*/}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-xs-12">
                                        <div className="detail-info pr-30 pl-30">
                                            {/*<span className="stock-status out-stock"> Sale Off </span>*/}
                                            <span
                                                className={`stock-status ${product[0]?.discount > 0 ? "out-stock" : "in-stock"}`}>
                                                {product[0]?.discount > 0 ? "Sale Off" : "New"}
                                            </span>
                                            <h2 className="title-detail">
                                                {product[0]?.productName}
                                            </h2>
                                            <div className="product-detail-rating">
                                                <div className="h6">
                                                    <ul className="mr-50 float-start">
                                                        <li>Stock:<span
                                                            className="in-stock text-brand ml-5">{product[0]?.stock} Items In Stock</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="clearfix product-price-cover">
                                                <div className="product-price primary-color float-left">
                                                    <span
                                                        className="current-price text-brand">&#x20b9;{Math.round(product[0]?.price - product[0]?.price * product[0]?.discount / 100)}</span>
                                                    <span>
                                                <span
                                                    className="save-price font-md color3 ml-15">{product[0]?.discount + '% Off'}</span>
                                                <span
                                                    className="old-price font-md ml-15">&#x20b9;{product[0]?.price}</span>
                                            </span>
                                                </div>
                                            </div>
                                            <div className="short-desc mb-30">
                                                <span className="bold">Size/ Weight:</span>
                                                <span>{product[0]?.description}</span>
                                            </div>
                                            <div className="detail-extralink mb-50">
                                                <div className="product-extra-link2">
                                                    <button onClick={() => AddToCart(product[0]?.product_id)}
                                                            type="button" className="button button-add-to-cart"><i
                                                        className="fi-rs-shopping-cart"></i>Add to cart
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <ToastContainer/>
        </>
    )
}

export default ProductDescription