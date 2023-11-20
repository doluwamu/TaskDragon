import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Edit a user's profile
// @route POST /api/v1/users/me/edit
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

  return res.json({
    message: "Profile successfullt updated",
    userInfo: updatedProfile,
  });
});

export default updateUserProfile;
