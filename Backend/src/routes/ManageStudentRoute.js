
import express from 'express';
import {
  createStudentController,
  getAllStudentsController,
  updateStudentController,
  deleteStudentController
} from '../controller/ManageStudentController.js';

import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js'; // ✅ Auth + Admin middleware import

const manageStudentRouter = express.Router();

// ✅ Create student - only admin
manageStudentRouter.post(
  '/create-managestudent',
  isAuthenticated,
  isAdmin,
  createStudentController
);

// ✅ Get all students - any authenticated user
manageStudentRouter.get(
  '/getall-managestudent',
  isAuthenticated,
  getAllStudentsController
);

// ✅ Update student - only admin
manageStudentRouter.put(
  '/update-managestudent/:id',
  isAuthenticated,
  isAdmin,
  updateStudentController
);

// ✅ Delete student - only admin
manageStudentRouter.delete(
  '/delete-managestudent/:id',
  isAuthenticated,
  isAdmin,
  deleteStudentController
);

export default manageStudentRouter;
