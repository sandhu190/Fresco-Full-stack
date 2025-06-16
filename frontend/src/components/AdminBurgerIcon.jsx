import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
function AdminBurgerIcon(){
    return(
        <>
            <div className="header-action-icon-2 d-block d-lg-none">
                {[false,].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body mb-3 bg-12">
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <a href='index.html'><img  style={{width:"150px"}} src="/assets/imgs/theme/logo.svg" alt="logo"/></a>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3 fw-bold">
                                    <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
                                    <NavDropdown
                                        title="Manage Orders"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/admin/order-pending">Pending</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/admin/order-shipped">
                                           Shipped
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/admin/order-delivered">
                                           Delivered
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Manage Shop"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="/admin/category">Manage Category</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/admin/manage-subcategory">
                                            Manage SubCategory
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="/admin/manage-products">
                                            Manage Products
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link href="/admin/change-password">Change Password</Nav.Link>
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

export default AdminBurgerIcon