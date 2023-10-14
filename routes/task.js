import express from "express";
import addTask from "../controllers/tasks/addTask.js";
import getUserTasks from "../controllers/tasks/getUserTasks.js";
import { userIsVerified, userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();
router.use(userLoggedIn);
router.use(userIsVerified);

router.post("/new", addTask);
router.get("/:userId", getUserTasks);

export default router;
