import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
// import { Event as event } from "../../constants";

// @desc Add an event
// @route POST /api/v1/events
// @access Private
const addEvent = asyncHandler(async (req, res) => {
  const { name, description, startDate, endDate, reminder } = req.body;
  const {
    user: { id },
  } = req;

  const owner = await User.findById(id).exec();

  if (!owner) return res.status(404).json({ message: "Unauthorized" });

  if (!name || name.length < 1)
    return res.status(400).json({ message: "Give your event a name" });

  await Event.create({
    user: owner,
    name,
    description,
    reminder,
    startDate,
    endDate,
  });

  return res.status(201).json({ message: "Event added successfully" });
});

export default addEvent;
