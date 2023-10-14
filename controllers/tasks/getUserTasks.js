import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

// @desc Get all tasks belonging to a certain user
// @route GET /api/v1/tasks/:userId?number
// @access Private
const getUserTasks = asyncHandler(async (req, res) => {
  const { user } = req;
  const { userId } = req.params;
  const { number } = req.query;

  const baseNumber = 20;

  if (user.id !== userId)
    return res.status(400).json({ message: "This is not your id" });

  const foundTasks = await Task.find({}).limit(Number(number) || baseNumber);

  return res.json({ tasks: foundTasks, number: foundTasks.length });
});

export default getUserTasks;
