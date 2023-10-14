import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Get a user
// @route POST /api/v1/users
// @access Private(Admin only)
const getUsers = asyncHandler(async (req, res) => {
  const { number } = req.query;
  const baseNumber = 50;

  const foundUser = await User.find({}).limit(Number(number) || baseNumber);

  return res.json({
    users: foundUser,
    number: foundUser.length,
  });
});

export default getUsers;
