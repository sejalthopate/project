


import express from "express";
import {
  getAdminProfile,
  createAdminProfile,
  updateAdminProfile,
} from "../controller/AdminProfileController.js";

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const adminProfileRouter = express.Router();

adminProfileRouter.use(isAuthenticated, isAdmin);

// 📌 Create admin profile
adminProfileRouter.post("/create-adminprofile", createAdminProfile);

// 📌 Get admin profile
adminProfileRouter.get("/get-adminprofile", getAdminProfile);

// 📌 Update admin profile
adminProfileRouter.put("/update-adminprofile", updateAdminProfile);

export default adminProfileRouter;
