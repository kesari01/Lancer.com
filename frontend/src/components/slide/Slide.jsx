/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "primereact/carousel";
import CategoryCards from "../categoryCards/CategoryCards";
import ProjectCards from "../projectCards/ProjectCards";
import "./Slide.css";

export default function Slide({ data, type }) {
  const responsiveOptions = [
    {
      breakpoint: "1400px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "1199px",
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  // Conditional rendering based on the type prop
  const cardTemplate = (item) => {
    if (type === "category") {
      return <CategoryCards key={item.id} item={item} />;
    } else if (type === "project") {
      return <ProjectCards key={item.id} item={item} />;
    }
  };

  return (
    <div className="card">
      <Carousel
        value={data}
        numVisible={4}
        numScroll={3}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        circular
        autoplayInterval={3000}
        itemTemplate={cardTemplate}
      />
    </div>
  );
}
