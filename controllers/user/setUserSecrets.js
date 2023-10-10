import User from "../../models/User.js";
import asyncHandler from "express-async-handler";

// @desc Set User Secrets
// @route POST /api/v1/user/secret/:userId
// @access Private

const setUserSecrets = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { color, DOB, food } = req.body;

  if (!userId) return res.status(400).json({ message: "No user id found" });

  if (!color || !DOB || !food)
    return res.status(400).json({ message: "All fields are required" });

  const foundUser = await User.findById(userId).exec();

  const setSecrets = foundUser.userSecrets;

  if (
    setSecrets.color.length > 0 ||
    setSecrets.DOB ||
    setSecrets.food.length > 0
  )
    return res.status(400).json({ message: "Secrets are already set" });

  if (!foundUser)
    return res.status(404).json({ message: "User does not exist" });

  foundUser.userSecrets.color = color;
  foundUser.userSecrets.DOB = Date(DOB);
  foundUser.userSecrets.food = food;

  await foundUser.save();

  return res.status(201).json({ message: "Secrets successfully uploaded" });
});

export default setUserSecrets;
