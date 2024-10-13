/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./ServiceHighlights.css";

function ServiceHighlights() {
  return (
    <div className="ServiceHighlights">
      <div className="ServiceHighlightsContainer">
        <div className="highlightsItemLeft">
          <h1>A Whole World of freelance talent at your fingertips</h1>
          <div className="highlightsTitle">
            <FontAwesomeIcon className="faCircleCheck" icon={faCircleCheck} />
            <p>The best for every budget</p>
          </div>
          <p>
            Find high-quality services at every price point. No hourly rates,
            just project based pricing.
          </p>
          <div className="highlightsTitle">
            <FontAwesomeIcon className="faCircleCheck" icon={faCircleCheck} />
            <p>Quality work done quickly</p>
          </div>
          <p>
            From the right freelancer to begin working on your project within
            minute.
          </p>
          <div className="highlightsTitle">
            <FontAwesomeIcon className="faCircleCheck" icon={faCircleCheck} />
            <p>Protected payment, every time</p>
          </div>
          <p>
            Always know what you'll pay upfront.Your payment ins't released
            until you approve the work
          </p>
          <div className="highlightsTitle">
            <FontAwesomeIcon className="faCircleCheck" icon={faCircleCheck} />
            <p>24/7 Support</p>
          </div>
          <p>
            Get help when you need it, 24/7. Our support team is always there.
          </p>
        </div>
        <div className="highlightsItemRight">
          <video className="highlightsItemVideo" src="video.mp4" controls />
        </div>
      </div>
    </div>
  );
}

export default ServiceHighlights;
