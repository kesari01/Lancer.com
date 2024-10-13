/* eslint-disable no-unused-vars */
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Gig.css";

function Gig() {
  return (
    <div className="Gig">
      <span>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/gig-list">Gig List</Breadcrumb.Item>
          <Breadcrumb.Item active>Gig</Breadcrumb.Item>
        </Breadcrumb>
      </span>
      <div className="GigContainer">
        <div className="GigContainerLeft">
          <h1>
            Harnessing AI innovation for smarter, efficient solutions
            everywhere.
          </h1>
          <hr />
          <div className="GigMaster">
            <img src="/ai_service_img1.jpeg" alt="image" />
            <h2>About This Gig</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora,
              commodi nulla. Soluta possimus ad illum iusto accusamus mollitia
              itaque! Aliquid inventore repellendus eos voluptatum, quae magnam
              earum expedita deleniti nisi?Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Tempora, commodi nulla. Soluta
              possimus ad illum iusto accusamus mollitia itaque! Aliquid
              inventore repellendus eos voluptatum, quae magnam earum expedita
              deleniti nisi?
            </p>
            <div className="box">
              <div className="gigItems">
                <div className="gigItem">
                  <span className="gigTitle">Name</span>
                  <span className="gigDesc">Pratik</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Origin</span>
                  <span className="gigDesc">India</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Member Since</span>
                  <span className="gigDesc">Aug 2024</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Total Service Given</span>
                  <span className="gigDesc">48</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Avg. Ratings</span>
                  <span className="gigDesc">4.6</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Total Reviews</span>
                  <span className="gigDesc">918</span>
                </div>
              </div>
              <hr />
              <h2>About Me</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                commodi itaque, rerum dolore voluptas, deleniti quidem dicta
                obcaecati natus recusandae sint cupiditate inventore a corrupti
                maxime aliquid accusantium! Quia, dolor?
              </p>
            </div>
          </div>
          <div className="gigReviews">
            <h3>Reviews</h3>
            <div className="gigReview">
              <span>Abhishek</span>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus eaque minima repellat explicabo perferendis quisquam
                at, sit ex odit earum dolorem ut velit maiores, doloribus
                accusamus in voluptatibus eum fuga?
              </span>
              <span>4</span>
            </div>
            <div className="gigReview">
              <span>Rakshit</span>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus eaque minima repellat explicabo perferendis quisquam
                at, sit ex odit earum dolorem ut velit maiores, doloribus
                accusamus in voluptatibus eum fuga?
              </span>
              <span>4.5</span>
            </div>
            <div className="gigReview">
              <span>Avinash</span>
              <span>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Repellendus eaque minima repellat explicabo perferendis quisquam
                at, sit ex odit earum dolorem ut velit maiores, doloribus
                accusamus in voluptatibus eum fuga?
              </span>
              <span>4.2</span>
            </div>
          </div>
        </div>
        <div className="GigContainerRight">
          <div className="gigPrice">
            <h4>1 AI generated image</h4>
            <h3>₹499</h3>
          </div>
          <p>
            I will create a nique high qualiy AI generated image based on a
            description that you will give.
          </p>
          <div className="gigDetails">
            <span>36 hours Delivery gurantee </span>
            <span>3 modifications allowed</span>
          </div>
          <div className="gigFeature">
            <span>✅ Prompt Writing</span>
            <span>✅ Artwork delivery</span>
            <span>✅ Image upscaling</span>
            <span>✅ Additional design</span>
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
