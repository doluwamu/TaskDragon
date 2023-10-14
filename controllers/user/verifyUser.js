import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Set User Secrets
// @route POST /api/v1/users/verify/:userId
// @access Private
const verifyUser = asyncHandler(async (req, res) => {
  const {
    user: { id, verified },
  } = req;

  const { userId } = req.params;

  if (id !== userId)
    return res.status(400).json({ message: "This is not your id" });

  const foundUser = await User.findById(id).exec();

  if (verified === true)
    return res.status(400).json({ message: "User already verified" });

  foundUser.verified = true;

  await foundUser.save();

  return res.json({ message: "User verified" });
});

export default verifyUser;
