import express from "express";
import addEvent from "../controllers/events/addEvent.js";
import clearAllEvents from "../controllers/events/clearAllEvents.js";
import { editEvent } from "../controllers/events/editEvent.js";
import getEvent from "../controllers/events/getEvent.js";
import getEvents from "../controllers/events/getEvents.js";
import { setReminder, stopReminder } from "../controllers/events/reminder.js";
import removeEvent from "../controllers/events/removeEvent.js";
import { userIsVerified, userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();
router.use(userLoggedIn);
router.use(userIsVerified);

router.route("").get(getEvents).post(addEvent).delete(clearAllEvents);
router.route("/:eventId").get(getEvent).delete(removeEvent).put(editEvent);
router.put("/:eventId/reminder", setReminder);
router.put("/:eventId/reminder/stop", stopReminder);

export default router;
