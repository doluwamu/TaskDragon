import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";
import User from "../../models/User.js";
// import { Event as event } from "../../constants";

// @desc Set a reminder for an event
// @route PUT /api/v1/events/:eventId/reminder
// @access Private
const setReminder = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const {
    user: { id },
  } = req;

  const foundEvent = await Event.findById(eventId).exec();

  if (id !== String(foundEvent.user))
    return res.status(400).json({ message: "This event is not your's" });

  if (!foundEvent) return res.status(404).json({ message: "Event not found" });

  if (foundEvent && foundEvent.reminder === true)
    return res.status(400).json({ message: "Reminder already set" });

  foundEvent.reminder = true;

  await foundEvent.save();

  return res.json({ message: "Reminder set successfully" });
});

// @desc Stop reminder for an event
// @route PUT /api/v1/events/:eventId/reminder/stop
// @access Private
const stopReminder = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const {
    user: { id },
  } = req;

  const foundEvent = await Event.findById(eventId).exec();

  if (id !== String(foundEvent.user))
    return res.status(400).json({ message: "This event is not your's" });

  if (!foundEvent) return res.status(404).json({ message: "Event not found" });

  if (foundEvent && !foundEvent.reminder)
    return res.status(400).json({ message: "Reminder not set" });

  foundEvent.reminder = false;
  await foundEvent.save();

  return res.json({ message: "Reminder stoped" });
});

export { setReminder, stopReminder };
