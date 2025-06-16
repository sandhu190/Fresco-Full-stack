import Carousel from 'react-bootstrap/Carousel';

function CarouselFadeExample() {
    return (
        <Carousel fade>
            <Carousel.Item interval={1200}>
                <div className="single-hero-slider single-animation-wrap"
                     style={{backgroundImage: 'url(assets/imgs/slider/slider-7.png)'}}>
                    <div className="slider-content">
                        <h1 className="display-2 mb-40">
                            Don’t miss amazing<br/>
                            grocery deals
                        </h1>
                        <p className="mb-65">Sign up for the daily newsletter</p>
                        <form className="form-subcriber d-flex">
                            <input type="email" placeholder="Your emaill address"/>
                            <button className="btn" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={1200}>
                <div className="single-hero-slider single-animation-wrap"
                     style={{backgroundImage: 'url(assets/imgs/slider/slider-8.png)'}}>
                    <div className="slider-content">
                        <h1 className="display-2 mb-40">
                            Fresh Vegetables<br/>
                            Big discount
                        </h1>
                        <p className="mb-65">Save up to 50% off on your first order</p>
                        <form className="form-subcriber d-flex">
                            <input type="email" placeholder="Your emaill address"/>
                            <button className="btn" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={1200}>
                <div className="single-hero-slider single-animation-wrap"
                     style={{backgroundImage: 'url(assets/imgs/slider/slider-4.png)'}}>
                    <div className="slider-content">
                        <h1 className="display-2 mb-40">
                            Snacks box<br/>
                           Daily Save
                        </h1>
                        <form className="form-subcriber d-flex">
                            <input type="email" placeholder="Your emaill address"/>
                            <button className="btn" type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselFadeExample;