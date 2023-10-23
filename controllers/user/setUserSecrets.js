import User from "../../models/User.js";
import asyncHandler from "express-async-handler";
// import moment from "moment";

// @desc Set User Secrets
// @route POST /api/v1/users/secret/:userId
// @access Private
const setUserSecrets = asyncHandler(async (req, res) => {
  const { color, DOB, food } = req.body;
  const { userId } = req.params;
  const { user } = req;

  if (!userId) return res.status(400).json({ message: "No user id found" });

  if (user.id !== userId)
    return res.status(400).json({ message: "This is not your id" });

  if (!color || !DOB || !food)
    return res.status(400).json({ message: "All fields are required" });

  const foundUser = await User.findById(userId).select("+userSecrets").exec();

  if (!foundUser)
    return res.status(404).json({ message: "User does not exist" });

  const setSecrets = foundUser.userSecrets;

  if (
    setSecrets.color.length > 0 &&
    setSecrets.DOB &&
    setSecrets.food.length > 0
  )
    return res.status(400).json({ message: "Secrets are already set" });

  console.log(color, DOB, food);

  foundUser.userSecrets.color = color && color;
  foundUser.userSecrets.DOB = DOB && DOB; //format to pass in req.body= YYYY-MM-DD
  foundUser.userSecrets.food = food && food;
  foundUser.secretSet = true;

  await foundUser.save();

  const userToReturn = await User.findById(userId).exec();

  return res.status(201).json({
    message: "Secrets successfully uploaded",
    user: userToReturn,
  });
});

export default setUserSecrets;
