import express from "express";
import { getUserByID } from "../controllers/userController.js";
import { protectedRoute } from "../modules/auth.js";

const userRouter = express.Router();

userRouter.get("/profile", protectedRoute, getUserByID);

export default userRouter;
