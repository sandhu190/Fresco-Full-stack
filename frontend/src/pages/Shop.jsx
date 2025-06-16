import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useContext} from "react";
import {UserContext} from "../App.jsx";

function Shop(){
    let {ReadCartCount}=useContext(UserContext)
    const navigate=useNavigate()
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState('relevance');

    async function ReadProducts() {
        let url = "http://localhost:5000/products";
        let response = await fetch(url);
        response = await response.json();
        //console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else {
            const productswithBadges = response.records.map(products => {
                let badge = '';
                if ( products.discount==0) {
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
                }else{
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

    async function handleSortOrderChange(event){
        setSortOrder(event.target.value);
        let sortedProducts = [...products];
        if (event.target.value==='lowToHigh'){
            sortedProducts.sort((a,b)=> (a.price - a.price * a.discount / 100) -(b.price - b.price * b.discount / 100));
        }else if(event.target.value==='highToLow'){
            sortedProducts.sort((a,b)=>(b.price - b.price * b.discount / 100) -(a.price - a.price * a.discount / 100));
        }else if(event.target.value==='discount'){
            sortedProducts.sort((a,b)=> b.discount - a.discount)
        }else if(event.target.value==='newest'){
            sortedProducts.sort((a,b)=>{
                if(a.badge === 'new' && b.badge !== 'new'){
                    return -1;
                }else if(a.badge !== 'new' && b.badge === 'new'){
                    return 1;
                }else{
                    return 0;
                }
            });
        }
        else{
            ReadProducts()
        }
        setProducts(sortedProducts);
    }

    useEffect(() => {
        ReadProducts()
    }, []);





        return(
        <>
            <main className="main">
                <div className="page-header breadcrumb-wrap">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                            <span></span> Shop <span></span> Products
                        </div>
                    </div>
                </div>
                <section className="product-tabs section-padding position-relative mx-lg-5">
                    <div className="container">
                        <div className=" mt-50 style-2 ">
                            <h3>Products</h3>
                        </div>

                        {/*filter*/}
                        <div className="shop-product-fillter justify-content-end mr-100 mb-50 ">
                            <div className="sort-by-product-area">
                                <i className="fi-rs-apps-sort m-auto mr-5"></i>
                                <h6 className="fw-bolder mt-2 mr-5">Sort:</h6>
                                <select className="form-select" value={sortOrder} onChange={handleSortOrderChange}>
                                    <option value="relevance">Relevance</option>
                                    <option value="lowToHigh">Price: Low to High</option>
                                    <option value="highToLow">Price: High to Low</option>
                                    <option value="discount">Discount</option>
                                    <option value="newest">Newest</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {products.map((value, index) => (
                                <div key={index} className="col-lg-2  col-md-4  col-sm-6">
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
                                                {value.badge ? (
                                                    <span
                                                        className={`${value.badge}`}>{value.badge === 'best' ? '-' + value.discount + '%' : value.badge}</span>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="product-content-wrap">
                                            <div className="product-category">
                                                <a>{value.name}</a>
                                            </div>

                                            <h2>
                                                <Link to="/product-description" state={{product: value}}
                                                      onClick={() => window.scrollTo(0, 0)}>
                                                    {value.productName}
                                                </Link>
                                            </h2>
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
            </main>
            <ToastContainer/>
        </>
        )
}

export default Shop