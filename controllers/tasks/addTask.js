import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";

// @desc Add a task
// @route POST /api/v1/tasks/new
// @access Private
const addTask = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  const {
    user: { id },
  } = req;

  if (!title || title.length < 1)
    return res.status(400).json({ message: "Give your task a title" });

  if (title.length > 200)
    return res
      .status(400)
      .json({ message: "Title cannot be more than 200 characters" });

  const owner = await User.findById(id).exec();

  if (!owner) return res.status(404).json({ message: "Unauthorized" });

  const newTask = await Task.create({
    user: owner,
    title,
    description,
    priority,
  });

  return res.json({ message: "Task successfully added" });
});

export default addTask;
