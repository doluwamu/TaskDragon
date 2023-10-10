import express from "express";
import signup from "../controllers/auth/signup.js";
import login from "../controllers/auth/login.js";
import refreshSession from "../controllers/auth/refresh.js";
import logout from "../controllers/auth/logout.js";

const router = express.Router();

// Auth
router.post("/login", login);
router.post("/signup", signup);
router.get("/refresh", refreshSession);
router.post("/logout", logout);

export default router;
