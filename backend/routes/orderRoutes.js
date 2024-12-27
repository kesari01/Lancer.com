import express from "express";
import { verifyToken } from "../middleware/jwtAuth.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/create/:gigId", verifyToken, createOrder);
router.get("/get-order-list", verifyToken, getOrders);

export default router;
