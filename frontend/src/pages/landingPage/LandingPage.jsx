/* eslint-disable no-unused-vars */
import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import { cards, projects } from "../../data.js";
import ServiceHighlights from "../../components/serviceHighlights/ServiceHighlights";
// import Footer from "../../components/footer/Footer";

function LandingPage() {
  return (
    <div className="landingPage">
      <Featured />
      <TrustedBy />
      {/* Pass the type as "category" */}
      <Slide data={cards} type="category" />
      <ServiceHighlights />
      {/* Pass the type as "project" */}
      <Slide data={projects} type="project" />
      {/* <Footer /> */}
    </div>
  );
}

export default LandingPage;
