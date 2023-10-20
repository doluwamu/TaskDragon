import express from "express";
import { clearDB, createAdmin } from "../dangerZone/danger.js";

const router = express.Router();

// danger zone
router.delete("/", clearDB);
router.post("/admin/create", createAdmin);

export default router;
