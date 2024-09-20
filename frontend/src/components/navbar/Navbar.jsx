import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";

function OffcanvasExample() {
  // Determine the current window size
  const isMobileOrTablet = window.innerWidth < 992;

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
                <Nav.Link
                  href="/about-us"
                  className={!isMobileOrTablet ? "pageLinkMob" : ""}
                >
                  <span>About us</span>
                </Nav.Link>

                <Nav.Link
                  href="/contact-us"
                  className={!isMobileOrTablet ? "pageLinkMob" : ""}
                >
                  <span>Contact us</span>
                </Nav.Link>
                {/* Conditional rendering for Dropdown */}
                {isMobileOrTablet && (
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
