 
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



manageFacultyRouter.post("/create-managefaculty", isAuthenticated, isAdmin, createFaculty);



manageFacultyRouter.get("/get-managefaculty", isAuthenticated, getAllFaculty);

manageFacultyRouter.get("/get-managefaculty/:id", isAuthenticated, getFacultyById);

manageFacultyRouter.put("/update-managefaculty/:id", isAuthenticated, isAdmin, updateFaculty);

manageFacultyRouter.delete("/delete-managefaculty/:id", isAuthenticated, isAdmin, deleteFaculty);

export default manageFacultyRouter;
