
import express from 'express';
import {
  createAssignFaculty,
  getAssignFaculty,
  updateAssignFaculty,
  deleteAssignFaculty
} from '../controller/FacultyAssignController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js'; // 👈 middleware import कर

const assignfacultyRouter = express.Router();

// ✅ Create Assignment (Admin Only)
assignfacultyRouter.post(
  '/create-assignfaculty',
  isAuthenticated,
  isAdmin,
  createAssignFaculty
);

// ✅ Get All Assignments (Admin Only)
assignfacultyRouter.get(
  '/get-assignfaculty',
  isAuthenticated,
  
  getAssignFaculty
);

// ✅ Update Assignment by ID (Admin Only)
assignfacultyRouter.put(
  '/update-assignfaculty/:id',
  isAuthenticated,
  isAdmin,
  updateAssignFaculty
);

// ✅ Delete Assignment by ID (Admin Only)
assignfacultyRouter.delete(
  '/delete-assignfaculty/:id',
  isAuthenticated,
  isAdmin,
  deleteAssignFaculty
);

export default assignfacultyRouter;
