import React from "react";
import { Link } from "react-router-dom";
import "./CategoryCards.css";

function CategoryCards({ item }) {
  return (
    <div className="categoryCards">
      <Link to="/gigs/cat=design">
        <img className="categoryImg" src={item.img} alt={item.title} />
        <span className="description">{item.desc}</span>
        <span className="title">{item.title}</span>
      </Link>
    </div>
  );
}

export default CategoryCards;
