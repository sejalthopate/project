// src/routes/assignmentRouter.js
import express from "express";
import { uploadMemory } from "../middlewares/upload.js";
import {
  createAssignment,
  getAssignmentsForFaculty,
  updateAssignment,
  deleteAssignment,
} from "../controller/AssignmentController.js";
import { protect, facultyOnly, studentOnly } from "../middlewares/facultyMiddleware.js";
import { Assignment } from "../models/AssignmentModel.js"; // ✅ Import the model

const assignmentRouter = express.Router();

// -----------------------------
// ✅ Create Assignment (Faculty only)
assignmentRouter.post(
  "/create",
  protect,
  facultyOnly,
  uploadMemory.single("file"),
  createAssignment
);

// -----------------------------
// ✅ Get Assignments for Faculty
assignmentRouter.get(
  "/faculty",
  protect,
  getAssignmentsForFaculty
);

// -----------------------------
// ✅ Update Assignment (Faculty only)
assignmentRouter.put(
  "/:id",
  protect,
  facultyOnly,
  uploadMemory.single("file"),
  updateAssignment
);

// -----------------------------
// ✅ Delete Assignment (Faculty only)
assignmentRouter.delete(
  "/:id",
  protect,
  facultyOnly,
  deleteAssignment
);

// -----------------------------
// ✅ Get All Assignments (student & faculty can access)
assignmentRouter.get(
  "/all",
  protect, // ✅ token required
  async (req, res) => {
    try {
      const assignments = await Assignment.find().sort({ createdAt: -1 });
      res.json(assignments);
    } catch (error) {
      console.error("Error fetching all assignments:", error);
      res.status(500).json({ message: "Server error fetching assignments" });
    }
  }
);

export default assignmentRouter;
