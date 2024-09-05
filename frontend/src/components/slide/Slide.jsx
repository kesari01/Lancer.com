import React from "react";
import Slider from "infinite-react-carousel";
import "./Slide.css";

function Slide({ children, slidesToShow, arrowsScroll }) {
  return (
    <div className="slide">
      <div className="slideContainer">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
}

export default Slide;
