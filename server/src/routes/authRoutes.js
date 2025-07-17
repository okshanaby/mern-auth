import express from "express";
import {
  createUser,
  login,
  logout,
  sendEmailVerification,
  sendPasswordResetEmail,
  verifyEmail,
  verifyPasswordReset,
} from "../controllers/authController.js";
import { inputValidator } from "../middleware.js";
import { protectedRoute } from "../modules/auth.js";
import {
  loginInputSchema,
  registerInputSchema,
  resetPasswordInputSchema,
  sendVerifyOTPInputSchema,
  verifyEmailInputSchema,
  verifyResetPasswordInputSchema,
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

authRouter.post(
  "/reset-password",
  inputValidator(resetPasswordInputSchema),
  sendPasswordResetEmail
);

authRouter.post(
  "/verify-password-reset",
  inputValidator(verifyResetPasswordInputSchema),
  verifyPasswordReset
);

export default authRouter;
