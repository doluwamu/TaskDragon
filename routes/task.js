import express from "express";
import addTask from "../controllers/tasks/addTask.js";
import deleteTask from "../controllers/tasks/deleteTask.js";
import {
  editTaskDetails,
  editTaskStatus,
} from "../controllers/tasks/editTask.js";
import getUserTasks from "../controllers/tasks/getUserTasks.js";
import { userIsVerified, userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();
router.use(userLoggedIn);
router.use(userIsVerified);

router.post("/new", addTask);
router.get("/mine", getUserTasks);
router.route("/:taskId").put(editTaskDetails).delete(deleteTask);
router.put("/:taskId/status", editTaskStatus);

export default router;
