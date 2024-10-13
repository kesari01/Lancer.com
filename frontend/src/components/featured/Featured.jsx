/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="featuredContainer">
        <div className="left">
          {/* Tagline Section */}
          <div className="tagline">
            <h1>Where Talent Meets Opportunity</h1>
            <p>
              <i>Connect. Collaborate. Create.</i>
            </p>
          </div>

          {/* Search Bar Section */}
          <div className="search">
            <div className="searchInput">
              <FontAwesomeIcon className="faSearch" icon={faSearch} />
              <input type="text" placeholder="Try making a portfolio..." />
            </div>
            <button>Search</button>
          </div>

          {/* Popular Categories Section */}
          <div className="popular">
            <span>Popular:</span>
            <button>Web Development</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>

        {/* Featured Image Section */}
        <div className="right">
          <img src="feature.png" alt="Featured" className="featureImage" />
        </div>
      </div>
    </div>
  );
}

export default Featured;
