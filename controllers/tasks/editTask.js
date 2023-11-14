import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";
import { Task as task } from "../../constants/index.js";

const {
  Status: { undone, doing, done },
} = task;

// @desc Edit a task
// @route PUT /api/v1/tasks/:taskId
// @access Private
const editTaskDetails = asyncHandler(async (req, res) => {
  const { title, description, priority } = req.body;
  const { user } = req;
  const { taskId } = req.params;

  //   const priorityOptions = normal || important || veryImportant;

  if (title && title.length > 200)
    return res
      .status(400)
      .json({ message: "Title cannot be more than 200 characters" });

  const foundTask = await Task.findById(taskId).populate("user").exec();

  if (!foundTask) return res.status(404).json({ message: "Task not found" });

  if (foundTask.user.id !== user.id)
    return res.status(400).json({ message: "This task is not your's" });

  if (foundTask.status === done)
    return res
      .status(400)
      .json({ message: "Update failed: You are done with this task" });

  foundTask.title = title || foundTask.title;
  foundTask.description = description || foundTask.description;
  foundTask.priority = priority || foundTask.priority;

  const editedTask = await foundTask.save();

  return res.json({ message: "Task successfully edited", task: editedTask });
});

// @desc Edit a task status
// @route PUT /api/v1/tasks/:taskId/status
// @access Private
const editTaskStatus = asyncHandler(async (req, res) => {
  const { user } = req;
  const { taskId } = req.params;
  const { status } = req.body;

  //   const priorityOptions = normal || important || veryImportant;

  if (!status) return res.status(400).json({ message: "Enter a task status" });

  const foundTask = await Task.findById(taskId).populate("user").exec();

  if (!foundTask) return res.status(404).json({ message: "Task not found" });

  if (foundTask.user.id !== user.id)
    return res.status(400).json({ message: "This task is not your's" });

  if (status === undone && foundTask.startTime !== null) {
    foundTask.status = undone;
  }

  if (status === doing && foundTask.startTime === null) {
    foundTask.status = doing;
    foundTask.startTime = Date.now();
  }

  if (status === doing && foundTask.startTime !== null) {
    foundTask.status = doing;
  }

  if (status === done && foundTask.startTime === null) {
    foundTask.status = done;
    foundTask.startTime = Date.now();
    foundTask.endTime = Date.now();
  }

  if (status === done) {
    foundTask.status = done;
    foundTask.endTime = Date.now();
  }

  if ((status === undone || status === doing) && foundTask.endTime !== null) {
    return res
      .status(400)
      .json({ message: "Update failed: You are done with this task" });
  }

  const editedTask = await foundTask.save();

  return res.json({
    message: `Task status changed to ${status}`,
    task: editedTask,
  });
});

// @desc Edit a favorite
// @route PUT /api/v1/tasks/:taskId/favorite
// @access Private
const editFavorite = asyncHandler(async (req, res) => {
  const { favorite } = req.body;
  const { taskId } = req.params;
  const { user } = req;

  const foundTask = await Task.findById(taskId).populate("user").exec();

  if (!foundTask) return res.status(404).json({ message: "Task not found" });

  if (foundTask.user.id !== user.id)
    return res.status(400).json({ message: "This task is not your's" });

  foundTask.favorite = favorite;

  const tsk = await foundTask.save();

  return res.json({ message: "Favorite updated", task: tsk });
});

export { editTaskDetails, editTaskStatus, editFavorite };