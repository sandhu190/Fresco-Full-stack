import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function Dropdown() {
    const [category, setCategory] = useState([]);

    async function ReadCategory() {
        let url = "http://localhost:5000/category";
        let response = await fetch(url);
        response = await response.json();
        // console.log(response);
        if (response.error !== "") {
            alert(response.error);
        } else {
            setCategory(response.records);
        }
    }
    useEffect(() => {
        ReadCategory();
    }, []);
    return (
        <>
            <div className="dropdown ">
                <button className="btn  dropdown-toggle" type="button" data-toggle="dropdown"
                        data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="fi-rs-apps "></span> Browse All Categories
                    <span className="dropdown-icon ml-5"></span>
                </button>
                <ul className="dropdown-menu mt-3 " style={{width:"500px"}}>
                    <div className="row">
                        {category.map((x, index) => (
                            <div key={x.id} className={index % 2 === 0 ? "col-5" : "col-5 offset-1"}>
                                <li>
                                    <Link  className="dropdown-item hover-up dropdown-item-custom" to={`/product-by-category/${x.id}`} >
                                        <div className="d-flex">
                                            <img src="/assets/imgs/theme/icons/category-6.svg" alt=""
                                                 style={{height: "20px"}}/>
                                            <span className="align-middle mx-1">{x.categoryName}</span>
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        ))}
                    </div>
                </ul>
            </div>
        </>
    );
}

export default Dropdown;