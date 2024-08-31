import React, { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  // State to track if the navbar should be active (e.g., when the page is scrolled)
  const [active, setActive] = useState(false);

  // State to manage the visibility of the user options dropdown
  const [open, setOpen] = useState(false);

  // Function to toggle the navbar's active state based on the scroll position
  const isActive = () => {
    if (window.scrollY > 0) {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  // useEffect to add and clean up the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", isActive);
    // Cleanup the event listener when the component unmounts
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
    // Conditionally apply the "active" class to the navbar based on the scroll state
    <div className={active ? "navbar active" : "navbar"}>
      <div className="container">
        {/* Logo section */}
        <div className="logo">
          <span className="textLogo">Lancer</span>
          <span className="dotComTextLogo">.com</span>
        </div>

        {/* Navigation links */}
        <div className="links">
          <span className="link">About us</span>
          <span className="link">Contact us</span>

          {/* Show "Become a seller" link if the user is not a seller */}
          {!currentUser?.isSeller && (
            <span className="link">Become a seller</span>
          )}

          {/* Show login button if the user is not logged in */}
          {!currentUser && <button>Log in</button>}

          {/* Show user options if the user is logged in */}
          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src="user.jpg" alt="User avatar" />
              <span>{currentUser?.username}</span>

              {/* Conditionally render the dropdown options if the user icon is clicked */}
              {open && (
                <div className="options">
                  {/* Show seller-specific options if the user is a seller */}
                  {currentUser?.isSeller && (
                    <>
                      <span>Gigs</span>
                      <span>Add new gigs</span>
                    </>
                  )}
                  <span>Orders</span>
                  <span>Messages</span>
                  <span>Logout</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Render additional menu and separator when the navbar is active */}
      {active && (
        <>
          <hr />
          <div className="menu">
            <span>menu1</span>
            <span>menu2</span>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
