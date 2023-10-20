import express from "express";
import getUser from "../controllers/user/getUser.js";
import getUsers from "../controllers/user/getUsers.js";
import setUserSecrets from "../controllers/user/setUserSecrets.js";
import verifyUser from "../controllers/user/verifyUser.js";
import { clearDB, createAdmin } from "../dangerZone/danger.js";
import {
  isAdmin,
  userIsVerified,
  userLoggedIn,
} from "../middleware/userChecks.js";

const router = express.Router();

// User
router.post("/secret/:userId", userLoggedIn, setUserSecrets);
router.get("/me", userLoggedIn, getUser);
router.post("/verify/:userId", userLoggedIn, verifyUser);

// Admin only
router.get("/", userLoggedIn, userIsVerified, isAdmin, getUsers);

export default router;
