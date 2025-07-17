import userModel from "../models/userModel.js";
import {
  comparePassword,
  createToken,
  hashPassword,
  sendVerifyOTP,
} from "../modules/auth.js";

export const createUser = async (req, res) => {
  // get user input
  const { name, email, password } = req.body;

  // validate - done in middleware

  try {
    // check user if exist
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exist",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user in db and save
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    // create token
    const token = createToken(user);

    // setting cookies
    res.cookie(process.env.APP_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //  7 day from now
    });

    // // sending email
    // const mailOptions = {
    //   from: "info@okshanaby.me",
    //   to: email,
    //   subject: "Welcome to UZNEI",
    //   text:
    //     "Welcome to our website, your account has been created with email id: " +
    //     email,
    // };

    // await transporter.sendMail(mailOptions);
    await sendVerifyOTP(user);

    // return user and token
    res.json({
      success: true,
      message: "User created. Please verify your account, check your email.",
    });
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};

export const login = async (req, res) => {
  // validate user input - middleware

  // check if user exist
  const { password, email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found, Please register",
      });
    }

    // compare password
    const isValidUser = await comparePassword(password, user.password);

    if (!isValidUser) {
      return res.json({
        success: false,
        message: "Invalid password",
      });
    }

    // create token
    const token = createToken(user);

    // setting cookies
    res.cookie(process.env.APP_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), //  7 day from now
    });

    // return user and token
    res.json({ success: true, message: "Welcome back, " + user.name });
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie(process.env.APP_NAME);

    res.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.log("🚀 ~ logout ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });

    // do better error handling
  }
};

export const sendEmailVerification = async (req, res) => {
  // validation - done in middleware

  // get user from db and check if its verified
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found! Please register an account",
      });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    await sendVerifyOTP(user);

    res.json({ success: true, message: "OTP sent to email " + user.email });
  } catch (error) {
    console.log("🚀 ~ sendEmailVerification ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};

export const verifyEmail = async (req, res) => {
  // validation - done in middleware

  const { userId, otp } = req.body;

  try {
    // check if user exist
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found! Please register an account",
      });
    }

    // check if otp is expired
    if (user.verifyOTPExpireAt < Date.now()) {
      return res.json({
        success: false,
        message: "OTP Expired! Please login to request again",
      });
    }

    // check and verifyOTP
    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({
        success: false,
        message: "Invalid OTP! Please login to request again",
      });
    }

    // update user data and save
    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpireAt = 0;

    await user.save();

    res.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    console.log("🚀 ~ verifyEmail ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};
