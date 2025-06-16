const Blog1=()=>{
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
                                        <li className="hover-up active">
                                            <a href='/blog1'><i className="fi-rs-cross mr-10"></i>Recips</a>
                                        </li>
                                        <li className="hover-up">
                                            <a href='/blog2'><i className="fi-rs-cross mr-10"></i>Kitchen</a>
                                        </li>
                                        <li className="hover-up">
                                            <a href='/blog3'><i className="fi-rs-cross mr-10"></i>News</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-8 col-lg-10 col-md-12 m-auto">
                                <div className="shop-product-fillter mb-50">
                                    <div className="totall-product">
                                        <h2>
                                            <img className="w-36px mr-10" src="/assets/imgs/theme/icons/category-1.svg"
                                                 alt=""/>
                                            Recips Articles
                                        </h2>
                                    </div>
                                    <div className="pagination-area ">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-end">
                                                <li className="page-item active"><a className="page-link" href="/blog1">1</a></li>
                                                <li className="page-item "><a className="page-link" href="/blog2">2</a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="/blog3">3</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="/blog2"><i
                                                        className="fi-rs-arrow-small-right"></i></a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>

                                </div>
                                <div className="loop-grid loop-big">
                                    <div className="row">
                                        <article className="first-post mb-30 hover-up animated"
                                                 style={{visibility: "visible"}}>
                                            <div className="position-relative overflow-hidden">
                                                <span className="top-left-icon"><i
                                                    className="fi-rs-headphones"></i></span>
                                                <div className="post-thumb border-radius-15">
                                                    <a href='blog-post-right.html'>
                                                        <img className="border-radius-15"
                                                             src="/assets/imgs/blog/blog-16.png" alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="entry-content">
                                                <h2 className="post-title mb-20">
                                                    <a href='blog-post-right.html'>Enjoy My Favourite Molten Chocolate
                                                        Cake in This Autumn </a>
                                                </h2>
                                                <p className="post-exerpt font-medium text-muted mb-30">TAliquam
                                                    hendrerit lorem mi nunc sit aliquam nec leo, ut integer nisi,
                                                    iaculis dictumst at diam libero, elit pharetra morbi urna nunc, et
                                                    at nisl, pellentesque massa nec. Aenean ullamcorper eu augue vitae
                                                    tempor. Suspendisse potenti. Nulla facilisi. Sed venenatis mollis
                                                    lacinia.</p>
                                                <div className="mb-20 entry-meta meta-2">
                                                    <div className="entry-meta meta-1 mb-30">
                                                        <div className="font-sm">
                                                            <span><span className="mr-10 text-muted"><i
                                                                className="fi-rs-eye"></i></span>23k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-comment-alt"></i></span>17k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-share"></i></span>18k</span>
                                                        </div>
                                                    </div>
                                                    <a className='btn btn-sm' href='blog-post-right.html'>Read more<i
                                                        className="fi-rs-arrow-right ml-10"></i></a>
                                                </div>
                                            </div>
                                        </article>
                                        <article className="first-post mb-30 hover-up animated"
                                                 style={{visibility: "visible"}}>
                                            <div className="position-relative overflow-hidden">
                                                <span className="top-left-icon"><i
                                                    className="fi-rs-headphones"></i></span>
                                                <div className="post-thumb border-radius-15">
                                                    <a href='blog-post-right.html'>
                                                        <img className="border-radius-15"
                                                             src="/assets/imgs/blog/blog-17.png" alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="entry-content">
                                                <h2 className="post-title mb-20">
                                                    <a href='blog-post-right.html'>The Intermediate Guide to Healthy
                                                        Food Sticky Ginger Rice</a>
                                                </h2>
                                                <p className="post-exerpt font-medium text-muted mb-30">TAliquam
                                                    hendrerit lorem mi nunc sit aliquam nec leo, ut integer nisi,
                                                    iaculis dictumst at diam libero, elit pharetra morbi urna nunc, et
                                                    at nisl, pellentesque massa nec. Aenean ullamcorper eu augue vitae
                                                    tempor. Suspendisse potenti. Nulla facilisi. Sed venenatis mollis
                                                    lacinia.</p>
                                                <div className="mb-20 entry-meta meta-2">
                                                    <div className="entry-meta meta-1 mb-30">
                                                        <div className="font-sm">
                                                            <span><span className="mr-10 text-muted"><i
                                                                className="fi-rs-eye"></i></span>23k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-comment-alt"></i></span>17k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-share"></i></span>18k</span>
                                                        </div>
                                                    </div>
                                                    <a className='btn btn-sm' href='blog-post-right.html'>Read more<i
                                                        className="fi-rs-arrow-right ml-10"></i></a>
                                                </div>
                                            </div>
                                        </article>
                                        <article className="first-post mb-30 hover-up animated"
                                                 style={{visibility: "visible"}}>
                                            <div className="position-relative overflow-hidden">
                                                <span className="top-left-icon"><i
                                                    className="fi-rs-headphones"></i></span>
                                                <div className="post-thumb border-radius-15">
                                                    <a href='blog-post-right.html'>
                                                        <img className="border-radius-15"
                                                             src="/assets/imgs/blog/blog-18.png" alt=""/>
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="entry-content">
                                                <h2 className="post-title mb-20">
                                                    <a href='blog-post-right.html'>Harissa Chickpeas with Whipped Feta
                                                        Sticky Ginger</a>
                                                </h2>
                                                <p className="post-exerpt font-medium text-muted mb-30">TAliquam
                                                    hendrerit lorem mi nunc sit aliquam nec leo, ut integer nisi,
                                                    iaculis dictumst at diam libero, elit pharetra morbi urna nunc, et
                                                    at nisl, pellentesque massa nec. Aenean ullamcorper eu augue vitae
                                                    tempor. Suspendisse potenti. Nulla facilisi. Sed venenatis mollis
                                                    lacinia.</p>
                                                <div className="mb-20 entry-meta meta-2">
                                                    <div className="entry-meta meta-1 mb-30">
                                                        <div className="font-sm">
                                                            <span><span className="mr-10 text-muted"><i
                                                                className="fi-rs-eye"></i></span>23k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-comment-alt"></i></span>17k</span>
                                                            <span className="ml-30"><span
                                                                className="mr-10 text-muted"><i
                                                                className="fi-rs-share"></i></span>18k</span>
                                                        </div>
                                                    </div>
                                                    <a className='btn btn-sm' href='blog-post-right.html'>Read more<i
                                                        className="fi-rs-arrow-right ml-10"></i></a>
                                                </div>
                                            </div>
                                        </article>
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
export default Blog1