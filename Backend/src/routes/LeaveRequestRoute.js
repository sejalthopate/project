import express from "express";
import {
  createStudentLeaveRequest,
  createLeaveRequest,
  getStudentLeaveRequests,
  getFacultyLeaveRequests,
  getAdminFacultyRequests,
  updateLeaveStatus,
  getAdminAllRequests,
  // ❌ fetchStudentLeaves काढलं कारण controller मध्ये define नाही
} from "../controller/LeaveRequestController.js";

import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";
import LeaveRequest from "../models/LeaveRequestModel.js";

const router = express.Router();

/* ------------------ 📌 STUDENT ROUTES ------------------ */

// Get all student’s own leave requests
router.get("/student", isAuthenticated, getStudentLeaveRequests);

// ✅ Create new student leave request
router.post("/student/create", isAuthenticated, createStudentLeaveRequest);

// Update student’s own leave request
router.put("/student/:id", isAuthenticated, async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    if (leave.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(leave, req.body);
    const updated = await leave.save();

    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Student update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete student’s own leave request
router.delete("/student/:id", isAuthenticated, async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ success: false, message: "Leave not found" });
    }

    if (leave.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await leave.deleteOne();
    res.json({ success: true, message: "🗑 Leave deleted" });
  } catch (err) {
    console.error("Student delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

/* ------------------ 📌 FACULTY ROUTES ------------------ */

// Faculty gets their own leave requests
router.get("/faculty", isAuthenticated, getFacultyLeaveRequests);

// Faculty creates new leave request
router.post("/faculty/create", isAuthenticated, createLeaveRequest);

// ⚠ इथे आधी fetchStudentLeaves होतं → काढून टाकलं
// जर तुला खरंच हवे असेल की faculty ला student leaves दिसावेत,
// तर त्यासाठी controller मध्ये वेगळा function लिहावा लागेल.

/* ------------------ 📌 ADMIN ROUTES ------------------ */

// ✅ Admin gets only faculty leave requests
router.get("/admin/faculty", isAuthenticated, isAdmin, getAdminFacultyRequests);

// ✅ Admin gets ALL leave requests (students + faculty)
router.get("/admin/all", isAuthenticated, isAdmin, getAdminAllRequests);

// ✅ Admin updates leave status (approve / reject)
router.put("/admin/status/:id", isAuthenticated, isAdmin, updateLeaveStatus);

/* ------------------ 📌 GENERIC ROUTES ------------------ */

// Update leave (for Admin or owner)
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });

    // If user is not admin → check ownership
    if (req.user.role !== "admin" && leave.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(leave, req.body);
    const updated = await leave.save();

    res.json({ success: true, leave: updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Delete leave (for owner only)
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const leave = await LeaveRequest.findById(req.params.id);
    if (!leave) return res.status(404).json({ success: false, message: "Leave not found" });

    if (leave.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await leave.deleteOne();
    res.json({ success: true, message: "🗑 Leave deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;