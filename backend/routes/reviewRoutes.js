import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import {
  createReview,
  getReviews,
  deleteReviews,
} from "../controllers/reviewController.js";
const router = express.Router();

router.post("/create", verifyToken, createReview);
router.get("/get-review/:id", getReviews);
router.delete("/delete/:id", verifyToken, deleteReviews);

export default router;
