import express from "express";
import getUser from "../controllers/user/getUser.js";
import getUsers from "../controllers/user/getUsers.js";
import setUserSecrets from "../controllers/user/setUserSecrets.js";
import { clearDB, createAdmin } from "../dangerZone/danger.js";
import {
  isAdmin,
  userIsVerified,
  userLoggedIn,
} from "../middleware/userChecks.js";

const router = express.Router();

// User
router.post("/secret/:userId", userLoggedIn, setUserSecrets);
router.get("/:userId", userLoggedIn, getUser);
router.get("/", getUsers);

// Admin only
router.delete("/", userLoggedIn, userIsVerified, isAdmin, clearDB);
router.post(
  "/admin/create",
  userLoggedIn,
  userIsVerified,
  isAdmin,
  createAdmin
);

export default router;
