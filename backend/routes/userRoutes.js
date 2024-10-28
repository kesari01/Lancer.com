import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import { deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
