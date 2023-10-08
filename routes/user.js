import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/signup", signup);

export default router;
