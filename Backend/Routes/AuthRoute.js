import express from "express";
import {
  registerController,
  loginController,
  getAllUsersController,
} from "../Controller/authController.js";
import { requireSignIn } from "../Middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/users", requireSignIn, getAllUsersController);

export default router;
