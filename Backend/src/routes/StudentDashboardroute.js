// routes/studentRoutes.js
import express from "express";
import { getStudentStats } from "../controllers/studentController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET student stats
router.get("/stats", isAuthenticated, getStudentStats);

export default router;