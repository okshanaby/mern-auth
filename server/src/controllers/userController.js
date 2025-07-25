import userModel from "../models/userModel.js";

export const getUserByID = async (req, res) => {
  const  userId  = req.userId;
  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found! Please register an account",
      });
    }

    res.json({
      success: true,
      data: {
        name: user.name,
        isAccountVerified: user.isAccountVerified,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("🚀 ~ getUserByID ~ error:", error);

    res.json({
      success: false,
      message: error.message,
    });
    // do better error handling
  }
};
