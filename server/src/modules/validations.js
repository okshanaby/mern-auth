import { z } from "zod";

export const registerInputSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .max(20, { error: "Name must not be above 20 characters" })
    .min(4, { error: "Name must not be below 4 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "Name can only contain letters and numbers only",
    }),
  email: z.email("Please enter valid email"),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must not exceed 20 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

export const loginInputSchema = z.object({
  email: z.email("Please enter valid email"),
  password: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must not exceed 20 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});

export const verifyEmailInputSchema = z.object({
  // userId: z
  //   .string({ error: "User ID is required" })
  //   .max(50, { error: "User ID must not be above 50 characters" })
  //   .min(6, { error: "User ID must not be below 6 characters" })
  //   .regex(/^[a-zA-Z0-9]+$/, {
  //     error: "User ID can only contain letters and numbers only",
  //   }),
  otp: z
    .string({ error: "OTP is required" })
    .min(6, { error: "OTP must be at least 6 characters long" })
    .max(6, { error: "OTP must not exceed 6 characters" }),
});

export const sendVerifyOTPInputSchema = z.object({
  userId: z
    .string({ error: "User ID is required" })
    .max(50, { error: "User ID must not be above 50 characters" })
    .min(6, { error: "User ID must not be below 6 characters" })
    .regex(/^[a-zA-Z0-9]+$/, {
      error: "User ID can only contain letters and numbers only",
    }),
});

export const resetPasswordInputSchema = z.object({
  email: z.email("Please enter valid email"),
});

export const verifyResetPasswordInputSchema = z.object({
  email: z.email("Please enter valid email"),
  otp: z
    .string({ error: "OTP is required" })
    .min(6, { error: "OTP must be at least 6 characters long" })
    .max(6, { error: "OTP must not exceed 6 characters" }),
  newPassword: z
    .string({ error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters long" })
    .max(20, { error: "Password must not exceed 20 characters" })
    .regex(/[a-z]/, {
      error: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      error: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { error: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character",
    }),
});
