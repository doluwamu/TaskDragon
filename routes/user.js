import express from "express";
import getUser from "../controllers/user/getUser.js";
import setUserSecrets from "../controllers/user/setUserSecrets.js";

const router = express.Router();

// User
router.post("/secret/:userId", setUserSecrets);
router.get("/:userId", getUser);

export default router;
