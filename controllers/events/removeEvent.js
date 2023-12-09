import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";

// @desc Remove an event
// @route DELETE /api/v1/events/:eventId
// @access Private
const removeEvent = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req;
  const { eventId } = req.params;

  const foundEvent = await Event.findById(eventId).exec();

  if (!foundEvent)
    return res.status(404).json({ message: "Event does not exist" });

  if (id !== String(foundEvent.user))
    return res.status(400).json({ message: "This event is not your's" });

  await foundEvent.deleteOne({});

  return res.json({ message: "Event removed successfully" });
});

export default removeEvent;
