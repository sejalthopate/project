import { User } from "../models/AuthModel.js";
import LeaveRequest from "../models/LeaveRequestModel.js";


export const canViewOwnRequests = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ success: false, message: "Access denied: Students only" });
    }
 
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const canViewFacultyRequests = (req, res, next) => {
  try {
    if (req.user.role !== "faculty") {
      return res.status(403).json({ success: false, message: "Access denied: Faculty only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};


export const canViewAdminFacultyRequests = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};