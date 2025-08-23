import express from 'express';
import { getAdminDashboardStats } from '../controller/AdminDashboardController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js'; 

const adminDahboardRouter = express.Router();


adminDahboardRouter.get(
  '/get-dashboard',
  isAuthenticated, 
  isAdmin,        
  getAdminDashboardStats
);

export default adminDahboardRouter;
