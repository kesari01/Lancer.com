/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "./Navbar.css";

function OffcanvasExample() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(
    window.innerWidth < 992
  );
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const navigate = useNavigate();

  const userName = currentUser ? currentUser.name : "Login";

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8800/api/auth/logout");
      localStorage.removeItem("currentUser");
      setCurrentUser(null); // Update state
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrTablet(window.innerWidth < 992);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container fluid className="navbarTop">
          <Navbar.Brand href="/" className="brandTitle">
            <h1>Lancer</h1>
            <span>.com</span>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="offcanvasNavbar"
            className="navbarButton"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            className="offcanvarSidebar"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <span>Menu</span>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {/* <Nav.Link
                  href="/about-us"
                  className={!isMobileOrTablet ? "pageLinkMob" : ""}
                >
                  <span>About us</span>
                </Nav.Link> */}

                {/* <Nav.Link
                  href="/contact-us"
                  className={!isMobileOrTablet ? "pageLinkMob" : ""}
                >
                  <span>Contact us</span>
                </Nav.Link> */}
                {/* <div>kesari</div> */}
                {/* Conditional rendering for Dropdown */}
                <>
                  {!isMobileOrTablet && (
                    <div className="navbarDropdown">
                      <div className="">
                        <DropdownButton
                          as={ButtonGroup}
                          key="start"
                          id={`dropdown-button-drop-start`}
                          drop="start"
                          variant="secondary"
                          title={userName}
                        >
                          <Dropdown.Item eventKey="1" href="/gig-list">
                            Gig Available
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="2" href="/manage-gig">
                            Manage Gig
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="3" href="/order-list">
                            My Orders
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="4" href="/message-list">
                            My Messages
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item eventKey="5" onClick={handleLogout}>
                            Logout
                          </Dropdown.Item>
                        </DropdownButton>
                      </div>
                    </div>
                  )}
                </>
                {isMobileOrTablet && (
                  <>
                    <NavDropdown title={userName} id="offcanvasNavbarDropdown">
                      <NavDropdown.Item
                        href="/gig-list"
                        className="pageSubLinkMob"
                      >
                        Gig Available
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/manage-gig"
                        className="pageSubLinkMob"
                      >
                        Manage Gig
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/order-list"
                        className="pageSubLinkMob"
                      >
                        My Orders
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="/message-list"
                        className="pageSubLinkMob"
                      >
                        My Messages
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        className="pageSubLinkMob"
                        onClick={handleLogout}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Services" id="offcanvasNavbarDropdown">
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Graphics & Design
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Video & Animation
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Writing & Translation
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        AI Services
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Digital Marketing
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Music & Audio
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Programming & Tech
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Business & Ideas
                      </NavDropdown.Item>
                      <NavDropdown.Item href="/" className="pageSubLinkMob">
                        Lifestyle & Fashion
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {!isMobileOrTablet && (
        <div className="menu">
          <Link className="link" to="/">
            Graphics & Design
          </Link>
          <Link className="link" to="/">
            Video & Animation
          </Link>
          <Link className="link" to="/">
            Writing & Translation
          </Link>
          <Link className="link" to="/">
            AI Services
          </Link>
          <Link className="link" to="/">
            Digital Marketing
          </Link>
          <Link className="link" to="/">
            Music & Audio
          </Link>
          <Link className="link" to="/">
            Programming & Tech
          </Link>
          <Link className="link" to="/">
            Business
          </Link>
          <Link className="link" to="/">
            Lifestyle
          </Link>
        </div>
      )}
    </>
  );
}

export default OffcanvasExample;
