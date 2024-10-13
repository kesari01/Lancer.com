import React from "react";
import { Link } from "react-router-dom";

import "./GigCard.css";

function GigCard({ item }) {
  return (
    <Link to="/gig/123">
      <div className="GigCard">
        <img src={item.img} alt="" />
        <div className="gigCardInfo">
          <div className="gigCardUser">
            <span>{item.username}</span>
          </div>
          <p>{item.desc}</p>
        </div>
        <div className="gigCardDetails">
          <span>Starting AT</span>
          <h2>${item.price}</h2>
        </div>
      </div>
    </Link>
  );
}

export default GigCard;
