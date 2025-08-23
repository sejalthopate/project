import express from "express";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse
} from "../controller/CourseController.js";

const courseRouter = express.Router();

// Create Course (Admin only)
courseRouter.post("/", isAuthenticated, isAdmin, addCourse);

// Get all courses
courseRouter.get("/", isAuthenticated, getCourses);

// Update Course (Admin only)
courseRouter.put("/:id", isAuthenticated, isAdmin, updateCourse);

// Delete Course (Admin only)
courseRouter.delete("/:id", isAuthenticated, isAdmin, deleteCourse);

export default courseRouter;