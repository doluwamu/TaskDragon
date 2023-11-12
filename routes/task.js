import express from "express";
import addTask from "../controllers/tasks/addTask.js";
import deleteTask from "../controllers/tasks/deleteTask.js";
import {
  editTaskDetails,
  editTaskStatus,
  editFavorite,
} from "../controllers/tasks/editTask.js";
import getTask from "../controllers/tasks/getTask.js";
import getUserTasks from "../controllers/tasks/getUserTasks.js";
import { userIsVerified, userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();
router.use(userLoggedIn);
router.use(userIsVerified);

router.post("/new", addTask);
router.get("/mine", getUserTasks);
router.route("/:taskId").get(getTask).put(editTaskDetails).delete(deleteTask);
router.put("/:taskId/status", editTaskStatus);
router.put("/:taskId/favorite", editFavorite);

export default router;
