import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";

// @desc Get all tasks belonging to a certain user
// @route GET /api/v1/tasks/mine?number
// @access Private
const getUserTasks = asyncHandler(async (req, res) => {
  const { user } = req;
  // const { userId } = req.params;
  const { number, status } = req.query;

  const baseNumber = 10;

  // if (user.id !== userId)
  //   return res.status(400).json({ message: "This is not your id" });

  const search = req.query.search
    ? {
        user,
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : { user };

  // const count = await Task.countDocuments({ user });
  const foundTasks = await Task.find({
    ...search,
    status: status && status.length > 0 ? status : "undone",
  }).limit(Number(number) || baseNumber);

  return res.json({
    tasks: foundTasks,
    number: foundTasks.length,
    // total: count,
  });
});

export default getUserTasks;
