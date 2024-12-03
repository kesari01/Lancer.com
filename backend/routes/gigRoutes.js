import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import {
  createGig,
  deleteGig,
  getGig,
  getGigList,
} from "../controllers/gigController.js";
const router = express.Router();

router.post("/create", verifyToken, createGig);
router.delete("/delete/:id", verifyToken, deleteGig);
router.get("/get-gig/:id", getGig);
router.get("/get-gig-list", getGigList);

export default router;
