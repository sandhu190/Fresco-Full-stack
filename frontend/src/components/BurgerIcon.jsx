import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
function BurgerIcon(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {handleSubmit,register}=useForm()

    async function onSubmit(data){
        console.log(data)
        let url = "http://localhost:5000/search-bar"
        let response = await fetch(url, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        response = await response.json()
        console.log(response)
        if (response.error !== '') {
            Qual.errordb('Error', response.error)
        }else if (response.records.length === 0) {
            navigate("/*");
        } else {
            navigate("/search-bar-product",{ state: { records: response.records } })
        }
    }
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    return(
        <>
            <div className="header-action-icon-2 d-block d-lg-none">
                {[false,].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body mb-3 bg-15">
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        <a href='/'><img  style={{width:"150px"}} src="/assets/imgs/theme/logo.svg" alt="logo"/></a>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <div className="mobile-search search-style-3 mobile-header-border">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input type="text" {...register("searchBar")} placeholder="Search for items..."/>
                                        <button type="submit"><i className="fi-rs-search"></i></button>
                                    </form>
                                </div>
                                <Nav className="justify-content-end flex-grow-1 pe-3 fw-bold">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/about">About</Nav.Link>
                                    <Nav.Link href="/contact">Contact</Nav.Link>
                                    <Nav.Link href="/shop">Shop</Nav.Link>
                                    <NavDropdown
                                        title="Blog"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/blog1">Reciepe</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/blog2">
                                           Kitchen
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/blog3">
                                            News
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Pages"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/purchase-guide">Purchase Guide</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/privacy-policy">
                                            Privacy Policy
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/terms">
                                            Terms of Service
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Users"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/user-login">Login</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/user-signup">
                                            Register
                                        </NavDropdown.Item>
                                        { isAuthenticated && <NavDropdown.Divider/>}
                                        {(isAuthenticated && <NavDropdown.Item href="/user/change-password">
                                            change password
                                        </NavDropdown.Item>)}
                                    </NavDropdown>
                                </Nav>
                                <div className="mobile-social-icon mt-50 mb-50">
                                    <h6 className="mb-15">Follow Us</h6>
                                    <a href="#"><img src="/assets/imgs/theme/icons/icon-facebook-white.svg" alt=""/></a>
                                    <a href="#"><img src="/assets/imgs/theme/icons/icon-twitter-white.svg" alt=""/></a>
                                    <a href="#"><img src="/assets/imgs/theme/icons/icon-instagram-white.svg"
                                                     alt=""/></a>
                                    <a href="#"><img src="/assets/imgs/theme/icons/icon-pinterest-white.svg"
                                                     alt=""/></a>
                                    <a href="#"><img src="/assets/imgs/theme/icons/icon-youtube-white.svg" alt=""/></a>
                                </div>
                                <div className="site-copyright">Copyright 2024 © blinkit. All rights reserved. Powered by
                                    AliThemes.
                                </div>
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Navbar>
                ))}
            </div>
        </>
    )
}

export default BurgerIcon