import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";

function Blog3(){
    const navigate=useNavigate()
    const {handleSubmit,
        register}=useForm()
    async function onSubmit(data){
        let token=localStorage.getItem("userToken")
        if(!token){
            navigate("/user-login")
        }else{
            Qual.successdb('Thank-you for contacting us')
        }

    }
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
                <div className="page-content mb-50">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-9 m-auto">
                                <div className="single-page pt-50 pr-30">
                                    <div className="single-header style-2">
                                        <div className="row">
                                            <div className="col-xl-10 col-lg-12 m-auto">
                                                <h3 className="mb-10"><a href="#">News</a></h3>
                                                <h3 className="mb-10">Best Quality Red meat 2024: the top quality
                                                    grocery you can
                                                    buy today</h3>
                                                <div className="single-header-meta">
                                                    <div className="entry-meta meta-1 font-xs mt-15 mb-15">
                                                        <a className="author-avatar" href="#">
                                                            <img className="img-circle"
                                                                 src="/assets/imgs/blog/author-1.png" alt=""/>
                                                        </a>
                                                        <span className="post-by">By <a href="#">Sugar Rosie</a></span>
                                                        <span className="post-on has-dot">2 hours ago</span>
                                                        <span className="time-reading has-dot">8 mins read</span>
                                                    </div>
                                                    <div className="social-icons single-share">
                                                        <ul className="text-grey-5 d-inline-block">
                                                            <li className="mr-5"><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-bookmark.svg"
                                                                alt=""/></a>
                                                            </li>
                                                            <li><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-heart-2.svg" alt=""/></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="pagination-area ">
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination justify-content-end">
                                                            <li className="page-item">
                                                                <a className="page-link" href="/blog2"><i
                                                                    className="fi-rs-arrow-small-left"></i></a>
                                                            </li>
                                                            <li className="page-item"><a className="page-link"
                                                                                         href="/blog1">1</a>
                                                            </li>
                                                            <li className="page-item "><a className="page-link"
                                                                                          href="/blog2">2</a>
                                                            </li>
                                                            <li className="page-item active"><a className="page-link"
                                                                                                href="/blog3">3</a>
                                                            </li>
                                                        </ul>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <figure className="single-thumbnail">
                                        <img src="/assets/imgs/blog/blog-19.png" alt=""/>
                                    </figure>
                                    <div className="single-content">
                                        <div className="row">
                                            <div className="col-xl-10 col-lg-12 m-auto">
                                                <p className="single-excerpt">Helping everyone live happier, healthier
                                                    lives at home through their kitchen. Kitchn is a daily food magazine
                                                    on the Web celebrating life in the kitchen through home cooking and
                                                    kitchen intelligence.</p>
                                                <p>We've reviewed and ranked all of the best smartwatches on the market
                                                    right now, and we've made a definitive list of the top 10 devices
                                                    you can buy today. One of the 10 picks below may just be your
                                                    perfect next smartwatch.</p>
                                                <p>Those top-end wearables span from the Apple Watch to Fitbits, Garmin
                                                    watches to Tizen-sporting Samsung watches. There's also Wear OS
                                                    which is Google's own wearable operating system in the vein of
                                                    Apple's watchOS - you’ll see it show up in a lot of these
                                                    devices.</p>
                                                <h5 className="mt-50">Lorem ipsum dolor sit amet cons</h5>
                                                <p>Throughout our review process, we look at the design, features,
                                                    battery life, spec, price and more for each smartwatch, rank it
                                                    against the competition and enter it into the list you'll find
                                                    below.</p>
                                                <img className="mb-30" src="/assets/imgs/blog/blog-21.png" alt=""/>
                                                <p>Tortor, lobortis semper viverra ac, molestie tortor laoreet amet
                                                    euismod et diam quis aliquam consequat porttitor integer a nisl, in
                                                    faucibus nunc et aenean turpis dui dignissim nec scelerisque
                                                    ullamcorper eu neque, augue quam quis lacus pretium eros est amet
                                                    turpis nunc in turpis massa et eget facilisis ante molestie
                                                    penatibus dolor volutpat, porta pellentesque scelerisque at ornare
                                                    dui tincidunt cras feugiat tempor lectus</p>
                                                <blockquote>
                                                    <p>Integer eu faucibus <a href="#">dolor</a><sup><a href="#">[5]</a></sup>.
                                                        Ut venenatis tincidunt diam elementum imperdiet. Etiam accumsan
                                                        semper nisl eu congue. Sed aliquam magna erat, ac eleifend lacus
                                                        rhoncus in.</p>
                                                </blockquote>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet id
                                                    enim, libero sit. Est donec lobortis cursus amet, cras elementum
                                                    libero convallis feugiat. Nulla faucibus facilisi tincidunt a arcu,
                                                    sem donec sed sed. Tincidunt morbi scelerisque lectus non. At leo
                                                    mauris, vel augue. Facilisi diam consequat amet, commodo lorem nisl,
                                                    odio malesuada cras. Tempus lectus sed libero viverra ut. Facilisi
                                                    rhoncus elit sit sit.</p>
                                                <div className="entry-bottom mt-50 mb-30">
                                                    <div className="tags w-50 w-sm-100">
                                                        <a className='hover-up btn btn-sm btn-rounded mr-10'
                                                           href='blog-category-big.html' rel='tag'>deer</a>
                                                        <a className='hover-up btn btn-sm btn-rounded mr-10'
                                                           href='blog-category-big.html' rel='tag'>nature</a>
                                                        <a className='hover-up btn btn-sm btn-rounded mr-10'
                                                           href='blog-category-big.html' rel='tag'>conserve</a>
                                                    </div>
                                                    <div className="social-icons single-share">
                                                        <ul className="text-grey-5 d-inline-block">
                                                            <li><strong className="mr-10">Share this:</strong></li>
                                                            <li className="social-facebook"><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-facebook.svg"
                                                                alt=""/></a>
                                                            </li>
                                                            <li className="social-twitter"><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-twitter.svg" alt=""/></a>
                                                            </li>
                                                            <li className="social-instagram"><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-instagram.svg"
                                                                alt=""/></a></li>
                                                            <li className="social-linkedin"><a href="#"><img
                                                                src="/assets/imgs/theme/icons/icon-pinterest.svg"
                                                                alt=""/></a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="author-bio p-30 mt-50 border-radius-15 bg-white">
                                                    <div className="author-image mb-30">
                                                        <a href="author.html"><img src="/assets/imgs/blog/author-1.png"
                                                                                   alt="" className="avatar"/></a>
                                                        <div className="author-infor">
                                                            <h5 className="mb-5">Barbara Cartland</h5>
                                                            <p className="mb-0 text-muted font-xs">
                                                                <span className="mr-10">306 posts</span>
                                                                <span className="has-dot">Since 2012</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="author-des">
                                                        <p>Hi there, I am a veteran food blogger sharing my daily all
                                                            kinds of healthy and fresh recipes. I find inspiration in
                                                            nature, on the streets and almost everywhere. Lorem ipsum
                                                            dolor sit amet, consectetur adipiscing elit. Amet id enim,
                                                            libero sit. Est donec lobortis cursus amet, cras elementum
                                                            libero</p>
                                                    </div>
                                                </div>
                                                {/*Comment form*/}
                                                <div className="comment-form">
                                                    <h3 className="mb-15 text-center mb-30">Leave a Comment</h3>
                                                    <div className="row">
                                                        <div className="col-lg-9 col-md-12  m-auto">
                                                            <form className="form-contact comment_form mb-50" onSubmit={handleSubmit(onSubmit)}
                                                                  id="commentForm">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <textarea className="form-control w-100"
                                                                                      name="comment" id="comment"
                                                                                      cols="30" rows="9"
                                                                                      placeholder="Write Comment"
                                                                                      {...register("comment",{required:"this field is required"})}></textarea>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <input className="form-control" name="name"
                                                                                   id="name" type="text"
                                                                                   placeholder="Name"
                                                                                   {...register("name",{required:"this field is required"})}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-sm-6">
                                                                        <div className="form-group">
                                                                            <input className="form-control" name="email"
                                                                                   id="email" type="email"
                                                                                   placeholder="Email"
                                                                                   {...register("email",{required:"this field is required"})}/>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-12">
                                                                        <div className="form-group">
                                                                            <input className="form-control"
                                                                                   name="website" id="website"
                                                                                   type="text" placeholder="Website"
                                                                                   {...register("website",{required:"this field is required"})}/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <button type="submit"
                                                                            className="button button-contactForm">Post
                                                                        Comment
                                                                    </button>
                                                                </div>
                                                            </form>
                                                            <div className="comments-area">
                                                                <h3 className="mb-30">Comments</h3>
                                                                <div className="comment-list m-auto">
                                                                    <div
                                                                        className=" single-comment justify-content-between d-flex mb-30">
                                                                        <div
                                                                            className="user justify-content-between d-flex">
                                                                            <div className="thumb text-center">
                                                                                <img
                                                                                    src="/assets/imgs/blog/author-2.png"
                                                                                    alt=""/>
                                                                                <a href="#"
                                                                                   className="font-heading text-brand">Sienna</a>
                                                                            </div>
                                                                            <div className="desc">
                                                                                <div
                                                                                    className="d-flex justify-content-between mb-10">
                                                                                    <div
                                                                                        className="d-flex align-items-center">
                                                                                        <span
                                                                                            className="font-xs text-muted">December 4, 2024 at 3:12 pm </span>
                                                                                    </div>
                                                                                    <div
                                                                                        className="product-rate d-inline-block">
                                                                                        <div className="product-rating"
                                                                                             style={{width: "80%"}}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="mb-10">Lorem ipsum dolor
                                                                                    sit amet, consectetur adipisicing
                                                                                    elit. Delectus, suscipit
                                                                                    exercitationem accusantium obcaecati
                                                                                    quos voluptate nesciunt facilis
                                                                                    itaque modi commodi dignissimos
                                                                                    sequi repudiandae minus ab deleniti
                                                                                    totam officia id incidunt? <a
                                                                                        href="#"
                                                                                        className="reply">Reply</a></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="single-comment justify-content-between d-flex mb-30 ml-30">
                                                                        <div
                                                                            className="user justify-content-between d-flex">
                                                                            <div className="thumb text-center">
                                                                                <img
                                                                                    src="/assets/imgs/blog/author-3.png"
                                                                                    alt=""/>
                                                                                <a href="#"
                                                                                   className="font-heading text-brand">Brenna</a>
                                                                            </div>
                                                                            <div className="desc">
                                                                                <div
                                                                                    className="d-flex justify-content-between mb-10">
                                                                                    <div
                                                                                        className="d-flex align-items-center">
                                                                                        <span
                                                                                            className="font-xs text-muted">December 4, 2024 at 3:12 pm </span>
                                                                                    </div>
                                                                                    <div
                                                                                        className="product-rate d-inline-block">
                                                                                        <div className="product-rating"
                                                                                             style={{width: "80%"}}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="mb-10">Lorem ipsum dolor
                                                                                    sit amet, consectetur adipisicing
                                                                                    elit. Delectus, suscipit
                                                                                    exercitationem accusantium obcaecati
                                                                                    quos voluptate nesciunt facilis
                                                                                    itaque modi commodi dignissimos
                                                                                    sequi repudiandae minus ab deleniti
                                                                                    totam officia id incidunt? <a
                                                                                        href="#"
                                                                                        className="reply">Reply</a></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div
                                                                        className="single-comment justify-content-between d-flex">
                                                                        <div
                                                                            className="user justify-content-between d-flex">
                                                                            <div className="thumb text-center">
                                                                                <img
                                                                                    src="/assets/imgs/blog/author-4.png"
                                                                                    alt=""/>
                                                                                <a href="#"
                                                                                   className="font-heading text-brand">Gemma</a>
                                                                            </div>
                                                                            <div className="desc">
                                                                                <div
                                                                                    className="d-flex justify-content-between mb-10">
                                                                                    <div
                                                                                        className="d-flex align-items-center">
                                                                                        <span
                                                                                            className="font-xs text-muted">December 4, 2024 at 3:12 pm </span>
                                                                                    </div>
                                                                                    <div
                                                                                        className="product-rate d-inline-block">
                                                                                        <div className="product-rating"
                                                                                             style={{width: "80%"}}>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <p className="mb-10">Lorem ipsum dolor
                                                                                    sit amet, consectetur adipisicing
                                                                                    elit. Delectus, suscipit
                                                                                    exercitationem accusantium obcaecati
                                                                                    quos voluptate nesciunt facilis
                                                                                    itaque modi commodi dignissimos
                                                                                    sequi repudiandae minus ab deleniti
                                                                                    totam officia id incidunt? <a
                                                                                        href="#"
                                                                                        className="reply">Reply</a></p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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

export default Blog3