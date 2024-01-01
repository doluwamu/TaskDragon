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
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      }
    : { user };

  let foundEvents = null;

  if (status && status === "upcoming") {
    foundEvents = await Event.find({
      ...search,
      startDate: { $gt: Date.now() },
    })
      .sort({ reminder: -1 })
      .limit(Number(number) || baseNumber);
  } else if (status && status === "ongoing") {
    foundEvents = await Event.find({
      ...search,
      startDate: { $lte: Date.now() },
      endDate: { $gte: Date.now() },
    })
      .sort({ reminder: -1 })
      .limit(Number(number) || baseNumber);
  } else if (status && status === "ended") {
    foundEvents = await Event.find({ ...search, endDate: { $lt: Date.now() } })
      .sort({ reminder: -1 })
      .limit(Number(number) || baseNumber);
  } else {
    foundEvents = await Event.find({ ...search })
      .sort({ reminder: -1 })
      .limit(Number(number) || baseNumber);
  }

  // foundEvents.sort({rem})

  return res.json({ events: foundEvents, number: foundEvents.length });
});

export default getEvents;
