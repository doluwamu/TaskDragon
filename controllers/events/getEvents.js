import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";

// @desc Get all events
// @route GET /api/v1/events
// @access Private
const getEvents = asyncHandler(async (req, res) => {
  const { user } = req;
  // const { userId } = req.params;
  const { number, status } = req.query;

  const baseNumber = 20;

  const search = req.query.search
    ? {
        user,
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : { user };

  let foundEvents = null;

  if (status && status.length > 0) {
    foundEvents = await Event.find({ ...search })
      .where({ status })
      .sort({ updatedAt: 1 })
      .limit(Number(number) || baseNumber);
  } else {
    foundEvents = await Event.find({ ...search })
      .sort({ updatedAt: 1 })
      .limit(Number(number) || baseNumber);
  }

  return res.json({ events: foundEvents, number: foundEvents.length });
});

export default getEvents;
