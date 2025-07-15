import userModel from "../models/userModel.js";
import { createToken, hashPassword } from "../modules/auth.js";

export const createUser = async (req, res) => {
  // get user input
  const { name, email, password } = req.body;

  // validate - done in middleware

  try {
    // check user if exist
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({
        sucess: false,
        message: "User already exist",
      });
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create user in db
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

    // return user and token
    res.json({ sucess: true, message: "user created" });
  } catch (error) {
    console.log("🚀 ~ createUser ~ error:", error);

    res.json({
      sucess: false,
      message: error.message,
    });
    // do better error handling
  }
};
