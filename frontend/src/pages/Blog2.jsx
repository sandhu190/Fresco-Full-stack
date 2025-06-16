function Blog2(){
    return(
        <>
            <main className="main">
                <div className="page-header mt-30 mb-75">
                    <div className="container">
                        <div className="archive-header">
                            <div className="row align-items-center">
                                <div className="col-xl-3">
                                    <h1 className="mb-15">Blog & News</h1>
                                    <div className="breadcrumb">
                                        <a href='/' rel='nofollow'><i className="fi-rs-home mr-5"></i>Home</a>
                                        <span></span> Blog & News
                                    </div>
                                </div>
                                <div className="col-xl-9 text-end d-none d-xl-block">
                                    <ul className="tags-list">
                                        <li className="hover-up ">
                                            <a href='/blog1'><i className="fi-rs-cross mr-10"></i>Recips</a>
                                        </li>
                                        <li className="hover-up">
                                            <a href='/blog3'><i className="fi-rs-cross mr-10"></i>News</a>
                                        </li>
                                        <li className="hover-up active">
                                            <a href='/blog2'><i className="fi-rs-cross mr-10"></i>Kitchen</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-lg-5 page-content mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="shop-product-fillter mb-50 pr-30">
                                    <div className="totall-product">
                                        <h2>
                                            <img className="w-36px mr-10" src="/assets/imgs/theme/icons/category-1.svg"
                                                 alt=""/>
                                            Kitchen Articles
                                        </h2>
                                    </div>
                                    <div className="pagination-area ">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-start">
                                                <li className="page-item">
                                                    <a className="page-link" href="/blog1"><i
                                                        className="fi-rs-arrow-small-left"></i></a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="/blog1">1</a>
                                                </li>
                                                <li className="page-item active"><a className="page-link"
                                                                                    href="/blog2">2</a>
                                                </li>
                                                <li className="page-item "><a className="page-link"
                                                                                    href="/blog3">3</a>
                                                </li>
                                                <li className="page-item">
                                                    <a className="page-link" href="/blog3"><i
                                                        className="fi-rs-arrow-small-right"></i></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className="loop-grid loop-list pr-30 mb-50">
                                <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-1.png)"}}>
                                            <div className="entry-meta">
                                                <a className='entry-meta meta-2' href='blog-category-grid.html'><i
                                                    className="fi-rs-play-alt"></i></a>
                                            </div>
                                        </div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>9 Tasty Ideas That Will Inspire You to
                                                    Grow a Home Herb Garden Today</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-2.png)"}}></div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>The Easy Italian Chicken Dinner I Make
                                                    Over and Over Again</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-3.png)"}}>
                                            <div className="entry-meta">
                                                <a className='entry-meta meta-2' href='blog-category-grid.html'><i
                                                    className="fi-rs-picture"></i></a>
                                            </div>
                                        </div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>I Tried 38 Different Bottles of Mustard —
                                                    These Are the Ones I’ll Buy Again</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-4.png)"}}>
                                            <div className="entry-meta">
                                                <a className='entry-meta meta-2' href='blog-category-grid.html'><i
                                                    className="fi-rs-play-alt"></i></a>
                                            </div>
                                        </div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>How I Prep a Week of Absolutely Simple
                                                    Summer Meals in Just 1 Hour</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-5.png)"}}>
                                            <div className="entry-meta">
                                                <a className='entry-meta meta-2' href='blog-category-grid.html'><i
                                                    className="fi-rs-heart"></i></a>
                                            </div>
                                        </div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>Jenny Rosenstrach Has a Game Plan for the
                                                    Weekday Vegetarian</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-6.png)"}}></div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>Prime Day Is Here and These Are the Best
                                                    Kitchen Deals to Shop ASAP</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage: "url(/assets/imgs/blog/blog-1.png)"}}></div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>9 Tasty Ideas That Will Inspire You to
                                                    Grow a Home Herb Garden Today</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                    <article className="wow fadeIn animated hover-up mb-30 animated">
                                        <div className="post-thumb"
                                             style={{backgroundImage:" url(/assets/imgs/blog/blog-7.png)"}}>
                                            <div className="entry-meta">
                                                <a className='entry-meta meta-2' href='blog-category-grid.html'><i
                                                    className="fi-rs-headset"></i></a>
                                            </div>
                                        </div>
                                        <div className="entry-content-2 pl-50">
                                            <h3 className="post-title mb-20">
                                                <a href='blog-post-right.html'>How I Prep a Week of Absolutely Simple
                                                    Summer Meals in Just 1 Hour</a>
                                            </h3>
                                            <p className="post-exerpt mb-40">Lorem ipsum dolor sit amet, consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                                                magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                                                in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur.</p>
                                            <div className="entry-meta meta-1 font-xs color-grey mt-10 pb-10">
                                                <div>
                                                    <span className="post-on">25 April 2024</span>
                                                    <span className="hit-count has-dot">126k Views</span>
                                                </div>
                                                <a className='text-brand font-heading font-weight-bold'
                                                   href='blog-post-right.html'>Read more <i
                                                    className="fi-rs-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </article>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </>
    )
}

export default Blog2