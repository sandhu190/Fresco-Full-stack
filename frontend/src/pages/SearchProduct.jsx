import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {toast,ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import {useContext} from "react";
import {UserContext} from "../App.jsx";


function SearchProduct(){
    let navigate=useNavigate()
    let {ReadCartCount}=useContext(UserContext)
    const location = useLocation();
    const records = location.state?.records;
    let [product,setProduct]=useState([])

    const productswithBadges = (product, discount) => {
        let badge = '';
        if (discount===0) {
            if(product.price>70){
                badge = 'new';
            }else {
                badge=''
            }
        }  else {
            badge = 'best';
        }
        return {...product, badge};
    };

    useEffect(() => {
        if (records) {
            setProduct(records.map(record => productswithBadges(record, record.discount)));
        }
    }, [records]);

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

    return(
        <>
            <main className="mx-lg-5 main">
                <section className="product-tabs section-padding position-relative">
                    <div className="container">
                        <div className=" mt-50 mb-50 style-2 ">
                            <h3> Product by Search</h3>
                        </div>

                        <div className="row">
                            {product.map((value, index) => (
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

export default SearchProduct