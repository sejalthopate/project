



import express from 'express';
import {
  markAttendance,
  getFacultyAttendance,
  getStudentAttendance,
  deleteSingleFaculty,
  deleteFacultyAttendance,
  deleteSingleStudent,       // ✅ new import
   deleteStudentAttendance,   // ✅ new import
} from '../controller/AttendanceController.js';

const attendenceRouter = express.Router();

// ------------------ Student Routes ------------------
attendenceRouter.post('/student/mark', markAttendance);
attendenceRouter.get('/student/view', getStudentAttendance);

// ✅ Delete full student attendance record
attendenceRouter.delete('/student/delete/:id', deleteStudentAttendance);


// ✅ Delete single student from a record
attendenceRouter.delete(
  '/student/:recordId/deleteStudent/:studentId',
  deleteSingleStudent
);

// ------------------ Faculty Routes ------------------
attendenceRouter.post('/faculty/mark', markAttendance);
attendenceRouter.get('/faculty/view', getFacultyAttendance);

// ✅ Delete full faculty attendance record
attendenceRouter.delete('/faculty/delete/:id', deleteFacultyAttendance);

// ✅ Delete single faculty from a record
attendenceRouter.delete(
  '/faculty/:recordId/deleteFaculty/:facultyId',
  deleteSingleFaculty
);

export default attendenceRouter;
