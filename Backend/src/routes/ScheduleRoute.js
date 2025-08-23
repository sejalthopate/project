import express from "express";
import {
  createOrUpdateSchedule,
  getAllSchedules,
  getScheduleByDeptYear,
} from "../controller/ScheduleController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const scheduleRouter = express.Router();

// फक्त admin ला create/update करण्याची परवानगी
scheduleRouter.post("/", isAuthenticated, isAdmin, createOrUpdateSchedule);

// logged-in कोणताही user schedule पाहू शकतो
scheduleRouter.get("/", isAuthenticated, getAllSchedules);

// logged-in कोणताही user specific schedule पाहू शकतो
scheduleRouter.get("/:department/:year", isAuthenticated, getScheduleByDeptYear);

export default scheduleRouter;