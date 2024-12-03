import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import { getUser, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/getUser/:id", getUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
