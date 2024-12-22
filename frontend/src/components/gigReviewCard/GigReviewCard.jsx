import { useQuery } from "@tanstack/react-query";
import axios from "axios";

/* eslint-disable react/prop-types */
function GigReviewCard({ review }) {
  // Fetching user data
  const {
    isLoading: isUserLoading,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["user", review.userId],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/users/getUser/${review.userId}`)
        .then((res) => res.data),
    enabled: !!review.userId,
  });

  if (isUserLoading) {
    return <div className="Gig">Loading...</div>;
  }
  if (userError) {
    return (
      <div className="Gig">
        <p>Error loading user data: {userError.message}</p>
      </div>
    );
  }

  // Format the updatedAt date to a more readable format
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(review.updatedAt));

  return (
    <div className="gigReview">
      <span>{userData.name}</span>
      <span>{review.description}</span>
      <div className="reviewMeta">
        <span>{review.rating}🌟</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default GigReviewCard;
