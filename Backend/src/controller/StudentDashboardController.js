// controllers/studentController.js
import Student from "../models/StudentModel.js";
import Attendance from "../models/AttendanceModel.js";
import Assignment from "../models/AssignmentModel.js";

export const getStudentStats = async (req, res) => {
  try {
    const studentId = req.user._id; // login student id

    // 1️⃣ Fetch student subjects
    const student = await Student.findById(studentId).populate("subjects");
    
    // 2️⃣ Attendance records
    const attendanceRecords = await Attendance.find({ student: studentId });

    // 3️⃣ Subject-wise attendance calculation
    const subjectWiseAttendance = student.subjects.map((sub) => {
      const subRecords = attendanceRecords.filter(
        (a) => a.subject.toString() === sub._id.toString()
      );
      const presentDays = subRecords.filter((a) => a.status === "present").length;
      const totalDays = subRecords.length;
      const attendancePercent = totalDays ? Math.round((presentDays / totalDays) * 100) : 0;
      return { subject: sub.name, attendance: attendancePercent };
    });

    // 4️⃣ Pending assignments
    const assignmentsPending = await Assignment.countDocuments({ student: studentId, status: "pending" });

    // 5️⃣ Total attendance
    const presentDays = attendanceRecords.filter((a) => a.status === "present").length;
    const absentDays = attendanceRecords.filter((a) => a.status === "absent").length;
    const totalAttendance =
      presentDays + absentDays > 0 ? Math.round((presentDays / (presentDays + absentDays)) * 100) : 0;

    // 6️⃣ Low attendance subjects
    const lowAttendanceSubjects = subjectWiseAttendance.filter((s) => s.attendance < 75).length;

    res.json({
      totalSubjects: student.subjects.length,
      assignmentsPending,
      upcomingExams: 2, // optional, can fetch from Exam model
      totalAttendance,
      presentDays,
      absentDays,
      lowAttendanceSubjects,
      subjectWiseAttendance,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};