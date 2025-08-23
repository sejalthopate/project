
import express from 'express';
import {
  createSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject
} from '../controller/ManageSubjectController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js';

const manageSubjectRouter = express.Router();

manageSubjectRouter.get('/getall-subjects', isAuthenticated, getAllSubjects);

// ✅ Create subject -
manageSubjectRouter.post('/create-subject', isAuthenticated, isAdmin, createSubject);

// ✅ Update subject by ID - 
manageSubjectRouter.put('/update-subject/:id', isAuthenticated, isAdmin, updateSubject);

// ✅ Delete subject by ID - 
manageSubjectRouter.delete('/delete-subject/:id', isAuthenticated, isAdmin, deleteSubject);

export default manageSubjectRouter;
