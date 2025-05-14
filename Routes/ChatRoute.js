import express from "express";
import {
  accessChat,
  sendMessage,
  getMessages,
  getUserChats,
} from "../Controller/chatController.js";
import { requireSignIn } from "../Middlewares/authMiddleWare.js";

const router = express.Router();

router.get("/", requireSignIn, getUserChats);
router.post("/", requireSignIn, accessChat);
router.post("/message", requireSignIn, sendMessage);
router.get("/message/:chatId", requireSignIn, getMessages);

export default router;
