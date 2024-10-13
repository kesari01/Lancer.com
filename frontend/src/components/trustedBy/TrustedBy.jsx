/* eslint-disable no-unused-vars */
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";
import { faSquareInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import "./TrustedBy.css";

function TrustedBy() {
  return (
    <div className="trustedBy">
      <div className="trustContainer">
        <span>Trusted By:</span>
        <FontAwesomeIcon className="trustIcon" icon={faGithub} />
        <FontAwesomeIcon className="trustIcon" icon={faLinkedin} />
        <FontAwesomeIcon className="trustIcon" icon={faDiscord} />
        <FontAwesomeIcon className="trustIcon" icon={faSquareInstagram} />
        <FontAwesomeIcon className="trustIcon" icon={faFacebook} />
      </div>
    </div>
  );
}

export default TrustedBy;
