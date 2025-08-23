import express from "express";
import {
  createOrUpdateSchedule,
  getAllSchedules,
  getScheduleByDeptYear,
} from "../controller/ScheduleController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const scheduleRouter = express.Router();


scheduleRouter.post("/", isAuthenticated, isAdmin, createOrUpdateSchedule);

scheduleRouter.get("/", isAuthenticated, getAllSchedules);


scheduleRouter.get("/:department/:year", isAuthenticated, getScheduleByDeptYear);

export default scheduleRouter;