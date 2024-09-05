import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCards.css";

function ProjectCards({ item }) {
  return (
    <Link to="/">
      <div className="projectCards">
        <img className="projectCardsImg" src={item.img} alt="" />
        <div className="projectCardsInfo">
          <img src={item.pp} alt="" />
          <div className="projectCardsInfoText">
            <h2>{item.cat}</h2>
            <span>{item.username}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCards;
