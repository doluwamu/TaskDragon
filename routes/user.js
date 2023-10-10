import express from "express";
import getUser from "../controllers/user/getUser.js";
import setUserSecrets from "../controllers/user/setUserSecrets.js";
import { userLoggedIn } from "../middleware/userChecks.js";

const router = express.Router();

// User
router.post("/secret/:userId", userLoggedIn, setUserSecrets);
router.get("/:userId", userLoggedIn, getUser);

export default router;
