/* eslint-disable no-unused-vars */
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import "./Gig.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

function Gig() {
  const { id } = useParams();

  // Fetching gig data
  const {
    isLoading: isGigLoading,
    error: gigError,
    data: gigData,
  } = useQuery({
    queryKey: ["gig", id],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/gigs/get-gig/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });

  // Fetching user data
  const userId = gigData?.userId; // Assuming gigData contains a `userId` field
  const {
    isLoading: isUserLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/users/getUser/${userId}`)
        .then((res) => res.data),
    enabled: !!userId,
  });

  if (isGigLoading || isUserLoading) {
    return <div className="Gig">Loading...</div>;
  }
  if (gigError) {
    return (
      <div className="Gig">
        <p>Error loading gig data: {gigError.message}</p>
      </div>
    );
  }
  if (userError) {
    return (
      <div className="Gig">
        <p>Error loading user data: {userError.message}</p>
      </div>
    );
  }
  return (
    <div className="Gig">
      <span>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/gig-list">Gig List</Breadcrumb.Item>
          <Breadcrumb.Item active>{gigData.title}</Breadcrumb.Item>
        </Breadcrumb>
      </span>
      <div className="GigContainer">
        <div className="GigContainerLeft">
          <h2>{gigData.shortTitle}</h2>
          <hr />
          <h3>{gigData.shortDesc}</h3>
          <hr />
          <div className="GigMaster">
            <img src={gigData.dp} alt="Gig Display" />
            <h2>About This Gig</h2>
            <p>{gigData.aboutGig}</p>
            {gigData.details && gigData.details.length > 0 ? (
              gigData.details.map((detail, index) => (
                <p key={index}>* {detail}</p>
              ))
            ) : (
              <p>No details available</p>
            )}
            <div className="box">
              <div className="gigItems">
                <div className="gigItem">
                  <span className="gigTitle">Name</span>
                  <span className="gigDesc">{userData.name}</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Origin</span>
                  <span className="gigDesc">{userData.country}</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Member Since</span>
                  <span className="gigDesc">
                    {new Date(userData.createdAt).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Total Service Given</span>
                  <span className="gigDesc">
                    {gigData.ratings && gigData.TotalRatings
                      ? Math.floor(gigData.ratings * gigData.TotalRatings)
                      : "N/A"}
                  </span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Avg. Ratings</span>
                  <span className="gigDesc">{gigData.ratings}</span>
                </div>
                <div className="gigItem">
                  <span className="gigTitle">Total Reviews</span>
                  <span className="gigDesc">{gigData.TotalRatings}</span>
                </div>
              </div>
              <hr />
              <h2>About Me</h2>
              <p>{gigData.aboutMe}</p>
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
            <h5>1 {gigData.shortTitle}</h5>
            <h4>₹{gigData.price}</h4>
          </div>
          <p>{gigData.aboutGig}</p>
          <div className="gigDetails">
            <span>{gigData.deliveryTime} hours Delivery guarantee</span>
            <span>{gigData.modificationAllow} modifications allowed</span>
          </div>
          <div className="gigFeature">
            {gigData.features && gigData.features.length > 0 ? (
              gigData.features.map((feature, index) => (
                <span key={index}>✅ {feature}</span>
              ))
            ) : (
              <span>No features available</span>
            )}
          </div>
          <button>Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Gig;
