 
import express from "express";
import {
  createFaculty,
  getAllFaculty,
  getFacultyById,
  updateFaculty,
  deleteFaculty
} from "../controller/ManageFacultyController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const manageFacultyRouter = express.Router();


// ✅ Create Faculty (फक्त admin)
manageFacultyRouter.post("/create-managefaculty", isAuthenticated, isAdmin, createFaculty);


// ✅ Get All Faculties (कोणताही logged-in user पाहू शकतो)
manageFacultyRouter.get("/get-managefaculty", isAuthenticated, getAllFaculty);

// ✅ Get Faculty by ID (कोणताही logged-in user पाहू शकतो)
manageFacultyRouter.get("/get-managefaculty/:id", isAuthenticated, getFacultyById);


// ✅ Update Faculty by ID (फक्त admin)
manageFacultyRouter.put("/update-managefaculty/:id", isAuthenticated, isAdmin, updateFaculty);

// ✅ Delete Faculty by ID (फक्त admin)
manageFacultyRouter.delete("/delete-managefaculty/:id", isAuthenticated, isAdmin, deleteFaculty);

export default manageFacultyRouter;
