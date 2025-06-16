import CarouselFadeExample from "../components/HomePageCarousel.jsx";
import ShopCategoryCarouselComponent from "../components/ShopCategoryCarousel.jsx";
import {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {ToastContainer,toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useContext} from "react";
import {UserContext} from "../App.jsx";


const Home = () => {
    let {ReadCartCount}=useContext(UserContext)
    const navigate = useNavigate()

    const [products, setProducts] = useState([]);

    async function ReadProducts() {
        let url = "http://localhost:5000/products";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else {
            const productswithBadges = response.records.map(products => {
                let badge = '';
                if ( products.discount===0) {
                    if(products.price>70){
                        badge = 'new';
                    }else {
                        badge=''
                    }
                }  else {
                    badge = 'best';
                }
                return {...products, badge};
            });
            setProducts(productswithBadges);
            // console.log(response.records)
        }
    }


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
                if(response.error=== "jwt expired"){
                    navigate("/user-login")
                }else {
                    Qual.errordb('Error', response.error)
                }
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
        ReadProducts()
    }, []);

    return (
        <>
            <main className="main">
                {/* Slider */}
                <section className="home-slider style-2 position-relative mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-12">
                                <div className="home-slide-cover">
                                    <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
                                        <CarouselFadeExample/>
                                    </div>
                                    <div className="slider-arrow hero-slider-1-arrow"></div>
                                </div>
                            </div>
                            <div className="col-lg-4 d-none d-xl-block">
                                <div className="banner-img style-3 animated animated">
                                    <div className="banner-text mt-50">
                                        <h2 className="mb-50">
                                            Delivered <br/>
                                            to
                                            <span className="text-brand">your<br/>
                                        home</span>
                                        </h2>
                                        <a className='btn btn-xs' href='/shop'>Shop Now <i
                                            className="fi-rs-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6">
                                <div className="banner-img style-6 wow animate__animated animate__fadeInUp"
                                     data-wow-delay="0">
                                    <img src="/assets/imgs/banner/banner-16.png" alt=""/>
                                    <div className="banner-text">
                                        <h6 className="mb-10 mt-30">Everyday Fresh with<br/>Our Products</h6>
                                        <a className=' btn  btn-xs' href='/shop'>Shop Now <i
                                            className="fi-rs-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="banner-img style-6 wow animate__animated animate__fadeInUp"
                                     data-wow-delay="0.2s">
                                    <img src="/assets/imgs/banner/banner-17.png" alt=""/>
                                    <div className="banner-text">
                                        <h6 className="mb-10 mt-30">100% guaranteed all<br/>Fresh items</h6>
                                        <a className=' btn btn-xs' href='/shop'>Shop Now <i
                                            className="fi-rs-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="banner-img style-6 wow animate__animated animate__fadeInUp"
                                     data-wow-delay="0.4s">
                                    <img src="/assets/imgs/banner/banner-18.png" alt=""/>
                                    <div className="banner-text">
                                        <h6 className="mb-10 mt-30">Special grocery sale<br/>off this month</h6>
                                        <a className=' btn btn-xs' href='/shop'>Shop Now <i
                                            className="fi-rs-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-6">
                                <div className="banner-img style-6 wow animate__animated animate__fadeInUp"
                                     data-wow-delay="0.6s">
                                    <img src="/assets/imgs/banner/banner-19.png" alt=""/>
                                    <div className="banner-text">
                                        <h6 className="mb-10 mt-30">
                                            Enjoy 15% OFF for all<br/>
                                            vegetable and fruit
                                        </h6>
                                        <a className=' btn btn-xs' href='/shop'>Shop Now <i
                                            className="fi-rs-arrow-small-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section className="mt-50 mx-lg-5 product-tabs section-padding position-relative">
                    <div className="container">
                        <div className="section-title style-2">
                            <h3>Popular Products</h3>
                            <ul className="nav nav-tabs links" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-two" data-bs-toggle="tab"
                                            data-bs-target="#tab-two" type="button" role="tab" aria-controls="tab-two"
                                            aria-selected="false">Milks & Dairies
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-three" data-bs-toggle="tab"
                                            data-bs-target="#tab-three" type="button" role="tab"
                                            aria-controls="tab-three" aria-selected="false">Coffes & Teas
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-four" data-bs-toggle="tab"
                                            data-bs-target="#tab-four" type="button" role="tab" aria-controls="tab-four"
                                            aria-selected="false">Pet Foods
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-five" data-bs-toggle="tab"
                                            data-bs-target="#tab-five" type="button" role="tab" aria-controls="tab-five"
                                            aria-selected="false">Meats
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-six" data-bs-toggle="tab"
                                            data-bs-target="#tab-six" type="button" role="tab" aria-controls="tab-six"
                                            aria-selected="false">Vegetables
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="nav-tab-seven" data-bs-toggle="tab"
                                            data-bs-target="#tab-seven" type="button" role="tab"
                                            aria-controls="tab-seven" aria-selected="false">Fruits
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* Product Card*/}
                        <div className="row">
                            {products.slice(0, 17).map((value,index) => (
                                <div key={index} className="col-lg-2 col-md-4  col-sm-6">
                                    <div className="product-cart-wrap mb-3">
                                        <div className="product-img-action-wrap" style={{height: '200px'}}>
                                            <div className="product-img product-img-zoom">
                                                <Link to="/product-description" state={{product: value}} onClick={() => window.scrollTo(0, 0)}>
                                                    <img src={"http://localhost:5000" + value.photo} alt="#"/>
                                                </Link>
                                            </div>
                                            <div
                                                className="product-badges product-badges-position product-badges-mrg">
                                                {/*{value.badge && <span className={`${value.badge}`}>{value.badge}</span>}*/}
                                                {value.badge?(
                                                    <span className={`${value.badge}`}>{value.badge === 'best' ? '-'+ value.discount +'%' : value.badge}</span>
                                                ):null}
                                            </div>
                                        </div>
                                        <div className="product-content-wrap">
                                            <div className="product-category">
                                                <a>{value.name}</a>
                                            </div>

                                            <h2>
                                                <Link to="/product-description" state={{product: value}} onClick={() => window.scrollTo(0, 0)}>
                                                    {value.productName}
                                                </Link>
                                            </h2>
                                            <div className="product-rate-cover">
                                                {/*<div className="product-rate d-inline-block">*/}
                                                {/*    <div className="product-rating"*/}
                                                {/*         style={{width: '90%'}}></div>*/}
                                                {/*</div>*/}
                                                {/*<span className="font-small ml-5 text-muted"> (4.0)</span>*/}
                                            </div>
                                            <div>
                                                <span className="font-small text-muted">
                                                    {value.description}
                                                </span>
                                            </div>
                                            <div className="product-card-bottom">
                                                <div className="product-price">
                                                    <span>
                                                        &#x20b9;{Math.round(value.price - value.price * value.discount / 100)}
                                                    </span>
                                                    <span className="old-price">&#x20b9;{value.price}</span>
                                                </div>
                                                <div className="add-cart">
                                                    <button type='button' className='add'
                                                            onClick={() => AddToCart(value.product_id)}
                                                            style={{border: 'green'}}><i
                                                        className="fi-rs-shopping-cart mr-5 "></i>Add
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>


                {/*Shop By Category*/}
                <section id=' shopbycategory' className="mx-lg-5 popular-categories section-padding d-none d-lg-block">
                    <div className="container">
                        <div className="section-title">
                            <div className="title">
                                <h3>Shop by Categories</h3>
                                <a className='show-all' href='/shop'>
                                    All Categories
                                    <i className="fi-rs-angle-right"></i>
                                </a>
                            </div>
                            <div className="slider-arrow slider-arrow-2 flex-right carausel-8-columns-arrow"
                                 id="carausel-8-columns-arrows"></div>
                        </div>
                        <ShopCategoryCarouselComponent/>
                    </div>
                </section>

            </main>
            <ToastContainer/>
        </>
    )
}
export default Home