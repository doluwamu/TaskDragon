import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";

// @desc Get a certain task by it's id
// @route GET /api/v1/tasks/:taskId
// @access Private
const getTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { user } = req;

  const foundTask = await Task.findById(taskId).populate("user").exec();

  if (!foundTask) return res.status(404).json({ message: "Task not found" });

  if (foundTask.user.id !== user.id)
    return res.status(400).json({ message: "This task is not your's" });

  const task = foundTask.depopulate("user");
  return res.json(task);
});

export default getTask;
