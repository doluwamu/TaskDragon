import Task from "../../models/Task.js";
import asyncHandler from "express-async-handler";

// @desc Get all tasks belonging to a certain user
// @route GET /api/v1/tasks/mine?number
// @access Private
const getUserTasks = asyncHandler(async (req, res) => {
  const { user } = req;
  // const { userId } = req.params;
  const { number } = req.query;

  const baseNumber = 20;

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

  const foundTasks = await Task.find({ ...search }).limit(
    Number(number) || baseNumber
  );

  return res.json({ tasks: foundTasks, number: foundTasks.length });
});

export default getUserTasks;
