
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject
} from '../controller/ManageSubjectController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const manageSubjectRouter = express.Router();

// ✅ Get all subjects - कोणताही logged-in user
manageSubjectRouter.get('/getall-subjects', isAuthenticated, getAllSubjects);

// ✅ Create subject - फक्त admin
manageSubjectRouter.post('/create-subject', isAuthenticated, isAdmin, createSubject);

// ✅ Update subject by ID - फक्त admin
manageSubjectRouter.put('/update-subject/:id', isAuthenticated, isAdmin, updateSubject);

// ✅ Delete subject by ID - फक्त admin
manageSubjectRouter.delete('/delete-subject/:id', isAuthenticated, isAdmin, deleteSubject);

export default manageSubjectRouter;
