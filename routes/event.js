import express from "express";
import addEvent from "../controllers/events/addEvent.js";
import getEvents from "../controllers/events/getEvents.js";
import { setReminder, stopReminder } from "../controllers/events/reminder.js";
import { userIsVerified, userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();
router.use(userLoggedIn);
router.use(userIsVerified);

router.route("").get(getEvents).post(addEvent);
router.put("/:eventId/reminder", setReminder);
router.put("/:eventId/reminder/stop", stopReminder);

export default router;
