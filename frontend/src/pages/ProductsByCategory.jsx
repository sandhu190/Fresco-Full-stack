import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useContext} from "react";
import {UserContext} from "../App.jsx";
function ProductsByCategory(){
    let {ReadCartCount}=useContext(UserContext)
    const navigate = useNavigate()
    const { categoryId } = useParams();
   //console.log(categoryId)


    const [products, setProducts] = useState([]);

    async function ReadProducts() {
        setProducts([])
        let url = "http://localhost:5000/products";
        let response = await fetch(url);
        response = await response.json();
       console.log(response)
        if (response.error !== "") {
            alert(response.error);
        } else{
            console.log(response.records)
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

            // filter
            setProducts((productswithBadges.filter((product) => product.category_id === parseInt(categoryId))));
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
            if (response.error != '') {
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
        ReadProducts()
    }, [categoryId]);


    return(
        <>
            <main className={"main"}>
                <div className="page-header breadcrumb-wrap mb-10">
                    <div className="container">
                        <div className="breadcrumb">
                            <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home
                            </a><span></span>Category
                            {products.slice(0,1).map(x=>(
                                    <a key={x}><span></span>
                                        {x.categoryName}
                                    </a>
                            ))}
                        </div>
                    </div>
                </div>
                <section className=' mt-60 mx-lg-5'>
                    <div className="container">
                        <div className="row">
                            {products.map((value,index) => (
                                <div key={index} className=" col-lg-2 col-md-4  col-sm-6 ">
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
                                                <a href='shop-grid-right.html'>{value.name}</a>
                                            </div>

                                            <h2>
                                                <Link to="/product-description" state={{product: value}}
                                                      onClick={() => window.scrollTo(0, 0)}>
                                                    {value.productName}
                                                </Link>
                                            </h2>
                                            {/*<div className="product-rate-cover">*/}
                                            {/*    <div className="product-rate d-inline-block">*/}
                                            {/*        <div className="product-rating"*/}
                                            {/*             style={{width: '90%'}}></div>*/}
                                            {/*    </div>*/}
                                            {/*    <span className="font-small ml-5 text-muted"> (4.0)</span>*/}
                                            {/*</div>*/}
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

export default ProductsByCategory