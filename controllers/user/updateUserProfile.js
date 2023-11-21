import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

// @desc Edit a user's profile
// @route PUT /api/v1/users/me/edit
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const { user } = req;
  const { username, email } = req.body;

  // if (!userId) return res.status(400).json({ message: "No user id found" });

  // if (user._id !== userId)
  //   return res.status(400).json({ message: "This is not your id" });

  const foundUser = await User.findById(user.id);

  if (foundUser.email === email && email !== user.email)
    return res.status(400).json({ message: "User with this email exists" });

  if (!foundUser)
    return res.status(404).json({ message: "User does not exist" });

  foundUser.username = username || foundUser.username;
  foundUser.email = email || foundUser.email;

  const updatedProfile = await foundUser.save();

  // Set cookies
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, NODE_ENV } = process.env;

  const accessToken = jwt.sign(
    {
      username: updatedProfile.username,
      email: updatedProfile.email,
      role: updatedProfile.role,
      verified: updatedProfile.verified,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: "5m" }
  );

  const refreshToken = jwt.sign(
    {
      username: updatedProfile.username,
      email: updatedProfile.email,
    },
    REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );

  if (NODE_ENV === "development") {
    // Create cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("access", accessToken, {
      httpOnly: true, //accessible only by web server
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
  }

  if (NODE_ENV === "production") {
    // Create cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });

    res.cookie("access", accessToken, {
      httpOnly: true, //accessible only by web server
      secure: true, //https
      sameSite: "none", //cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
    });
  }

  return res.json({
    message: "Profile successfully updated",
    userInfo: updatedProfile,
  });
});

export default updateUserProfile;
