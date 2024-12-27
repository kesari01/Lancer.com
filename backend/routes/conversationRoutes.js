import express from "express";
const router = express.Router();
import { verifyToken } from "../middleware/jwtAuth.js";
import {
  createConversation,
  getConversation,
  getAllConversations,
  updateConversations,
} from "../controllers/conversationController.js";

router.post("/create", verifyToken, createConversation);
router.get("/get-conversation/:id", verifyToken, getConversation);
router.get("/get-conversation-list", verifyToken, getAllConversations);
router.put("/update-conversation/:id", verifyToken, updateConversations);

export default router;
