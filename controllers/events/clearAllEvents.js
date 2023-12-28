import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";

// @desc Remove all events
// @route DELETE /api/v1/events
// @access Private
const clearAllEvents = asyncHandler(async (req, res) => {
  const {
    user: { _id },
  } = req;

  await Event.find({ user: _id }).deleteMany({}).exec();

  return res.json({ message: "Events cleared" });
});

export default clearAllEvents;
