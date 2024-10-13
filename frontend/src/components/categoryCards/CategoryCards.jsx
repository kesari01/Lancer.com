/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCards.css";

function CategoryCards({ item }) {
  return (
    <div className="categoryCards">
      <Link to="/gigs/cat=design">
        <img className="categoryImg" src={item.img} alt={item.title} />
        <span className="categoryDescription">{item.desc}</span>
        <span className="categoryTitle">{item.title}</span>
      </Link>
    </div>
  );
}

export default CategoryCards;
