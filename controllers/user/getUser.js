import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Get a user
// @route POST /api/v1/users/:userId
// @access Private
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { user } = req;

  if (!userId) return res.status(400).json({ message: "No user id found" });

  if (user._id !== userId)
    return res.status(400).json({ message: "This is not your id" });

  const foundUser = await User.findById(userId);

  if (!foundUser)
    return res.status(404).json({ message: "User does not exist" });

  return res.json(foundUser);
});

export default getUser;
