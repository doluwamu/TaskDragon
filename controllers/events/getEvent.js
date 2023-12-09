import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";

// @desc Get an event by it's id
// @route GET /api/v1/events/:eventId
// @access Private
const getEvent = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req;
  const { eventId } = req.params;

  const foundEvent = await Event.findById(eventId).exec();

  if (!foundEvent)
    return res.status(404).json({ message: "Event does not exist" });

  if (id !== String(foundEvent.user))
    return res.status(400).json({ message: "This event is not your's" });

  return res.json(foundEvent);
});

export default getEvent;
