import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faSquareFacebook,
  faYoutube,
  faLinkedin,
  faSquareInstagram,
  faSquareWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footerContainer">
        <div className="footerContainerTop">
          <div className="footerContainerTopItem">
            <h2>Categories</h2>
            <span>Graphics & Design</span>
            <span>Video & Animation</span>
            <span>Writing & Translation</span>
            <span>AI Services</span>
            <span>Digital Marketing</span>
            <span>Music & Audio</span>
            <span>Programming & Tech</span>
            <span>Business</span>
            <span>Lifestyle</span>
          </div>
          <div className="footerContainerTopItem">
            <h2>About</h2>
            <span>Press & News</span>
            <span>Partnership</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Investor Relation</span>
            <span>Contact Sales</span>
          </div>
          <div className="footerContainerTopItem">
            <h2>Community</h2>
            <span>Customer Success Story</span>
            <span>Community Hub</span>
            <span>Forum</span>
            <span>Events</span>
            <span>Blog</span>
            <span>Invite a Friend</span>
            <span>Become a Seller</span>
            <span>Community Standards</span>
          </div>
        </div>
        <hr />
        <div className="footerContainerbottom">
          <div className="footerContainerbottomLeft">
            <h2>Lancer.com</h2>
            <span>copyright Kesari@2024</span>
          </div>
          <div className="footerContainerbottomRight">
            <div className="socialMediaIcons">
              <FontAwesomeIcon
                className="socialMediaIcon"
                icon={faSquareXTwitter}
              />
              <FontAwesomeIcon
                className="socialMediaIcon"
                icon={faSquareFacebook}
              />
              <FontAwesomeIcon className="socialMediaIcon" icon={faYoutube} />
              <FontAwesomeIcon className="socialMediaIcon" icon={faLinkedin} />
              <FontAwesomeIcon
                className="socialMediaIcon"
                icon={faSquareInstagram}
              />
              <FontAwesomeIcon
                className="socialMediaIcon"
                icon={faSquareWhatsapp}
              />
            </div>
            <div className="server">
              <FontAwesomeIcon className="socialMediaIcon" icon={faGlobe} />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
