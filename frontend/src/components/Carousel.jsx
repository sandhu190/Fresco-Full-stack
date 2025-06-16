import Slider from 'react-slick';

const CarouselComponent = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: <PreviousArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="carausel-3-columns-cover position-relative">
            <Slider {...settings}>
                <div className="carausel-3-columns">
                    <img src="/assets/imgs/page/about-2.png" alt="" />
                </div>
                <div className="carausel-3-columns">
                    <img src="/assets/imgs/page/about-3.png" alt="" />
                </div>
                <div className="carausel-3-columns">
                    <img src="/assets/imgs/page/about-4.png" alt="" />
                </div>
                <div className="carausel-3-columns">
                    <img src="/assets/imgs/page/about-2.png" alt="" />
                </div>
            </Slider>
        </div>
    );
};

const PreviousArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} prev-arrow`} onClick={onClick}>
            <i className="fi-rs-angle-left" />
        </div>
    );
};

const NextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={`${className} next-arrow`} onClick={onClick}>
            <i className="fi-rs-angle-right" />
        </div>
    );
};

export default CarouselComponent;