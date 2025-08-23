import express from 'express';
import { getAdminDashboardStats } from '../controller/AdminDashboardController.js';
import { isAuthenticated, isAdmin } from '../middlewares/authMiddleware.js'; // ✅ तुझं middleware import कर

const adminDahboardRouter = express.Router();

// ✅ Admin dashboard stats route (GET request) - फक्त Admin ला access
adminDahboardRouter.get(
  '/get-dashboard',
  isAuthenticated, // 🔹 आधी token verify
  isAdmin,         // 🔹 मग role check
  getAdminDashboardStats
);

export default adminDahboardRouter;
