import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../lib/nodemailer.js";
import { generateOTP } from "../utils/index.js";

export const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

export const createToken = user => {
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      // exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

export const sendVerifyOTP = async user => {
  // create OTP expiration and save to DB
  const OTP = generateOTP();
  user.verifyOTP = OTP;
  user.verifyOTPExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

  // save user data
  await user.save();

  // send otp email
  const mailOptions = {
    from: '"UZNEI" <info@okshanaby.me>',
    to: user.email,
    subject: "Account Verification",
    html: `
      <p>Here is your OTP:</p>
      <h2 style="color: #000;"><strong>${OTP}</strong></h2>
      <p>Please use this code to verify your account. <br />
      <strong>Note:</strong> This OTP will expire in <strong>15 minutes</strong>.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export const verifyToken = token => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const protectedRoute = async (req, res, next) => {
  const token = req.cookies[process.env.APP_NAME];

  if (!token) {
    return res.json({ success: false, message: "Not authorized! Login again" });
  }

  try {
    const decodedToken = verifyToken(token);

    if (decodedToken.id) {
      req.body.userId = decodedToken.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized! Login again",
      });
    }

    next();
  } catch (error) {
    console.log("🚀 ~ protectedRoute ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};
