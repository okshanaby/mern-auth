import express from "express";
import {
  createUser,
  login,
  logout,
  sendEmailVerification,
  verifyEmail,
} from "../controllers/authController.js";
import { inputValidator } from "../middleware.js";
import { protectedRoute } from "../modules/auth.js";
import {
  loginInputSchema,
  registerInputSchema,
  sendVerifyOTPInputSchema,
  verifyEmailInputSchema,
} from "../modules/validations.js";

const authRouter = express.Router();

authRouter.post("/register", inputValidator(registerInputSchema), createUser);
authRouter.post("/login", inputValidator(loginInputSchema), login);
authRouter.get("/logout", logout);

authRouter.post(
  "/send-otp",
  protectedRoute,
  inputValidator(sendVerifyOTPInputSchema),
  sendEmailVerification
);
authRouter.post(
  "/verify-otp",
  protectedRoute,
  inputValidator(verifyEmailInputSchema),
  verifyEmail
);

export default authRouter;
