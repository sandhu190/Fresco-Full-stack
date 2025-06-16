function ThankYou(){
    return(
        <>
            <main className="">
                <div className="mt-100">
                    <div className="container">
                        <div className="col-xl-10 col-lg-10 col-md-12 m-auto text-center">
                            <div className="home-slide-cover mt-30 mb-200 ">
                                <div className="hero-slider-1 style-4 dot-style-1 dot-style-1-position-1">
                                    <div className="single-hero-slider single-animation-wrap"
                                         style={{backgroundImage: "url(assets/imgs/slider/slider-1.png)"}}>
                                        <div className="slider-content">
                                            <h1 className="display-2 mb-40">
                                                Thankyou For<br/>
                                                Shopping with Fresco
                                            </h1>
                                            {/*<p className="mb-65">Sign up for the daily newsletter</p>*/}
                                            <a className='btn btn-default submit-auto-width font-xs hover-up mt-30'
                                               href='/'><i
                                                className="fi-rs-home mr-5"></i> Back To Home Page</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ThankYou
