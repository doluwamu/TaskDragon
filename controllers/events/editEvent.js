import Event from "../../models/Event.js";
import asyncHandler from "express-async-handler";

// @desc Edit the details of an event
// @route PUT /api/v1/events/:eventId
// @access Private
const editEvent = asyncHandler(async (req, res) => {
  const {
    user: { id },
  } = req;
  const { eventId } = req.params;
  const { name, description, reminder, startDate, endDate } = req.body;

  const foundEvent = await Event.findById(eventId).exec();

  // if (
  //   status &&
  //   status !== "upcoming" &&
  //   status !== "ongoing" &&
  //   status !== "ended"
  // )
  //   return res.status(400).json({ message: "Enter a valid status" });

  if (!foundEvent)
    return res.status(404).json({ message: "Event does not exist" });

  if (id !== String(foundEvent.user))
    return res.status(400).json({ message: "This event is not your's" });

  // if (reminder === true && foundEvent.status === "ended")
  //   return res
  //     .status(400)
  //     .json({ message: "Can't set reminder on ended event" });

  foundEvent.name = name && name.length > 0 ? name : foundEvent.name;
  foundEvent.description =
    description && description.length > 0
      ? description
      : foundEvent.description;
  foundEvent.reminder = reminder;
  foundEvent.startDate =
    startDate && startDate.length > 0 ? startDate : foundEvent.startDate;
  foundEvent.endDate =
    endDate && endDate.length > 0 ? endDate : foundEvent.endDate;

  await foundEvent.save();

  return res.json({ message: "Event edited successfully", event: foundEvent });
});

export { editEvent };
