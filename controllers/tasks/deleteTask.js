import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";

// @desc Delete a task
// @route DELETE /api/v1/tasks/:taskId
// @access Private
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { user } = req;

  const foundTask = await Task.findById(taskId).populate("user");

  if (!foundTask) return res.status(404).json({ message: "Task not found" });

  if (foundTask.user.id !== user.id)
    return res.status(400).json({ message: "This task is not your's" });

  await foundTask.deleteOne({});

  return res.json({ message: "Task deleted successfully" });
});

export default deleteTask;
