import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
