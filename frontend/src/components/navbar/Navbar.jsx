import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  // State to determine if the navbar is active (e.g., when the page is scrolled)
  const [active, setActive] = useState(false);

  // State to manage the visibility of the user options dropdown
  const [open, setOpen] = useState(false);

  // Get the current pathname from the router location
  const { pathname } = useLocation();

  // Function to toggle the navbar's active state based on the scroll position
  const isActive = () => {
    if (window.scrollY > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  // useEffect to add and remove the scroll event listener
  useEffect(() => {
    // Add scroll event listener
    window.addEventListener("scroll", isActive);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // Simulated current user data (replace with actual user data in a real application)
  const currentUser = {
    id: 1,
    username: "john deo",
    isSeller: true,
  };

  return (
    // Apply "active" class to the navbar if scrolled or if not on the home page
    <div
      className={active || pathname !== "/" ? "navbar navbarActive" : "navbar"}
    >
      <div className="navContainer">
        {/* Logo section with link to home page */}
        <Link className="link" to="/">
          <div className="logo">
            <span
              className="textLogo"
              // Change color if scrolled or if not on the home page
              style={active || pathname !== "/" ? { color: "black" } : null}
            >
              Lancer
            </span>
            <span className="dotComTextLogo">.com</span>
          </div>
        </Link>

        {/* Navigation links */}
        <div className="links">
          <Link to="/about-us" className="link">
            About us
          </Link>
          <Link to="/contact-us" className="link">
            Contact us
          </Link>

          {/* Show "Become a seller" link if the user is not a seller */}
          {!currentUser?.isSeller && (
            <span className="link">Become a seller</span>
          )}

          {/* Show login button if the user is not logged in */}
          {!currentUser && <button>Log in</button>}

          {/* Show user options dropdown if the user is logged in */}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src="user.jpg" alt="User avatar" />
              <span>{currentUser?.username}</span>

              {/* Conditionally render dropdown options if the user icon is clicked */}
              {open && (
                <div className="options">
                  {/* Show seller-specific options if the user is a seller */}
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/gig-list">Gigs</Link>
                      <Link to="/add-new-gig">Add new gig</Link>
                    </>
                  )}
                  <Link to="/order-list">Orders</Link>
                  <Link to="/message-list">Messages</Link>
                  <Link to="/logout">Logout</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Render additional menu and separator when the navbar is active or if not on the home page */}
      {(active || pathname !== "/") && (
        <>
          <hr />
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
        </>
      )}
    </div>
  );
}

export default Navbar;
