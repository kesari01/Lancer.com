import Gig from "../models/gigSchema.js";
import createError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(createError(403, "only sellers can create a gig!"));
  const newGig = new Gig({
    userId: req.userId,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (req.userId !== gig.userId)
      return next(createError(403, "can delete only own gig!"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig deleted successfully!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) next(createError(404, "Gig not found!"));
    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigList = async (req, res, next) => {
  try {
    const gigs = await Gig.find();
    if (!gigs) next(createError(404, "No Gig not found!"));
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
