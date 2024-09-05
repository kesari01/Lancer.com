import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import { cards, projects } from "../../data.js";
import CategoryCards from "../../components/categoryCards/CategoryCards";
import ServiceHighlights from "../../components/serviceHighlights/ServiceHighlights";
import ProjectCards from "../../components/projectCards/ProjectCards";
// import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landingPage">
      <Featured />
      <TrustedBy />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {cards.map((card) => (
          <CategoryCards item={card} key={card.id} />
        ))}
      </Slide>
      <ServiceHighlights />
      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCards item={card} key={card.id} />
        ))}
      </Slide>
    </div>
  );
}

export default LandingPage;
