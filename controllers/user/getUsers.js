import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Get a user
// @route POST /api/v1/users
// @access Private
const getUsers = asyncHandler(async (req, res) => {
  const foundUser = await User.find({});

  return res.json(foundUser);
});

export default getUsers;
