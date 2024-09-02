import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
// import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landingPage">
      <Featured />
      <TrustedBy />
    </div>
  );
}

export default LandingPage;
