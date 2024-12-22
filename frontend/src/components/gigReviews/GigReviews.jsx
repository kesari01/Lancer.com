/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import GigReviewCard from "../gigReviewCard/gigReviewCard";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import "./GigReviews.css";

function GigReviews({ gigId }) {
  const [newReview, setNewReview] = useState("");
  const [newRating, setNewRating] = useState("");

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const queryClient = useQueryClient();

  // Fetch reviews for the gig
  const {
    isLoading: isReviewLoading,
    error: reviewError,
    data: reviewData,
  } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/reviews/get-review/${gigId}`)
        .then((res) => res.data),
  });

  // Mutation to add a review
  const mutation = useMutation({
    mutationFn: (review) => {
      const token = currentUser?.token; // Retrieve token from the current user
      return axios.post("http://localhost:8800/api/reviews/create", review, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to headers
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews"]);
    },
    onError: (error) => {
      alert(`Error: ${error.response?.data || "Something went wrong"}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Accessing input fields using `name` attributes
    const formElements = e.target.elements;
    const description = formElements.description.value;
    const rating = parseInt(formElements.rating.value, 10); // Convert rating to a number

    if (!description || !rating || rating < 1 || rating > 5) {
      alert("Please provide a valid review and a rating between 1 and 5.");
      return;
    }
    mutation.mutate({ userId: currentUser._id, gigId, description, rating });
    setNewReview("");
    setNewRating("");
  };

  if (isReviewLoading) {
    return <div className="Gig">Loading reviews...</div>;
  }

  if (reviewError) {
    return (
      <div className="Gig">
        <p>Error loading reviews: {reviewError.message}</p>
      </div>
    );
  }

  return (
    <div className="gigReviews">
      <h3 className="reviewsHeading">Customer Reviews</h3>
      <div className="reviewsList">
        {reviewData?.map((review) => (
          <GigReviewCard key={review._id} review={review} />
        ))}
      </div>

      <div className="addReviewSection">
        <h4>Add Your Review</h4>
        <form className="reviewForm" onSubmit={handleSubmit}>
          <div className="formRow">
            <TextField
              label="Write your review"
              variant="outlined"
              fullWidth
              name="description" // Added name attribute
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              required
            />
            <TextField
              label="Rating (1-5)"
              variant="outlined"
              type="number"
              name="rating" // Added name attribute
              value={newRating}
              onChange={(e) => setNewRating(e.target.value)}
              inputProps={{ min: 1, max: 5 }}
              style={{ width: "120px", marginLeft: "15px" }}
              required
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="submitReviewButton"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default GigReviews;
