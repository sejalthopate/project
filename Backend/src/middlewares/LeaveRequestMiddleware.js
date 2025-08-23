import { User } from "../models/AuthModel.js";
import LeaveRequest from "../models/LeaveRequestModel.js";

// ✅ Student → फक्त स्वतःची requests पाहू शकतो
export const canViewOwnRequests = async (req, res, next) => {
  try {
    if (req.user.role !== "student") {
      return res.status(403).json({ success: false, message: "Access denied: Students only" });
    }
    // पुढे controller मध्ये req.user._id वापरून स्वतःच्या requests fetch होतात
    next();
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Faculty → स्वतःच्या + students च्या requests पाहू शकतो
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

// ✅ Admin → फक्त faculty च्या requests पाहू शकतो
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