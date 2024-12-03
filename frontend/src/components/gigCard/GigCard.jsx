/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

import "./GigCard.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function GigCard({ gig }) {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: [gig.userId],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/users/getUser/${gig.userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <Link to={`/gig/${gig._id}`} className="gigCardLink">
      <div className="GigCard">
        <h6>{gig.title}</h6>
        <img src={gig.dp} alt="" />
        <div className="gigCardInfo">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "Something went wrong..."
          ) : (
            <div className="gigCardUser">
              <img src={data.dp || "user.jpg"} alt="user's dp" />
              <span>{data.name}</span>
            </div>
          )}
          <p>{gig.shortTitle}</p>
          <p>{gig.shortDesc}</p>
        </div>
        <div className="gigCardDetails">
          <div>
            <span>Starting AT</span>
            <h2>${gig.price}</h2>
          </div>
          <div>
            <span>Ratings</span>
            <h2>{gig.ratings}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GigCard;
