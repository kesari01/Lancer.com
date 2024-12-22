import createError from "../utils/createError.js";
import Review from "../models/reviewSchema.js";
import Gig from "../models/gigSchema.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers are not allowed to create reviews"));
  const newReview = new Review({
    userId: req.body.userId,
    gigId: req.body.gigId,
    description: req.body.description,
    rating: req.body.rating,
  });

  try {
    const review = await Review.findOne({
      userId: req.userId,
      gigId: req.body.gigId,
    });
    if (review)
      return next(createError(400, "You have already reviewed this gig"));
    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { TotalRatings: req.body.rating, ratingNumber: 1 },
    });

    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReviews = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
