import Slider from 'react-slick';

const ShopCategoryCarouselComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PreviousArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024, // desktop
                settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768, // tablet
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480, // mobile
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 320, // small mobile
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            }

        ]
    };

    return (
        <div className="carausel-8-columns-cover position-relative">
            <Slider {...settings}>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/25'><img src="/assets/imgs/theme/icons/category-1.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/25'>Atta Rice<br/>& Dal</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/11'><img src="/assets/imgs/theme/icons/category-2.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/11'>Cold Drinks  <br/>&Juices</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/24'><img src="/assets/imgs/theme/icons/category-3.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/24'>Cleaning  <br/>Essentials</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/21'><img src="/assets/imgs/theme/icons/category-4.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/21'>Pet Foods <br/></a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/19'><img src="/assets/imgs/theme/icons/category-5.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/19'>Snacks & <br/>Munchies</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/18'><img src="/assets/imgs/theme/icons/category-6.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/18'>MilK & <br/>Dairy</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/26'><img src="/assets/imgs/theme/icons/category-7.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/26'> Fruits & <br/> Vegetables</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1">
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/20'><img src="/assets/imgs/theme/icons/category-8.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/20'>Chicken Meat <br/>Fish</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/22'><img src="/assets/imgs/theme/icons/category-9.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/22'>Bakery &<br/>Biscuits</a>
                        </h6>
                    </div>
                </div>
                <div className="carausel-8-columns">
                    <div className="card-1" >
                        <figure className="img-hover-scale overflow-hidden">
                            <a href='/product-by-category/23'><img src="/assets/imgs/theme/icons/category-11.svg"
                                                                alt=""/></a>
                        </figure>
                        <h6>
                            <a href='/product-by-category/23'>Tea Coffee & Health<br/> Drinks</a>
                        </h6>
                    </div>
                </div>
            </Slider>
        </div>
    );
};

const PreviousArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={ "prev-arrow"} onClick={onClick}>
            <i className="fi-rs-angle-left bg-active"/>
        </div>
    );
};

const NextArrow = (props) => {
    const {onClick} = props;
    return (
        <div className={"next-arrow"} onClick={onClick}>
            <i className="fi-rs-angle-right  "/>
        </div>
    );
};

export default ShopCategoryCarouselComponent;