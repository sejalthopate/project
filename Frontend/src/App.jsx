import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import AccessDenied from "./pages/AccessDenied";

// Admin Pages
import AdminDashboardLayout from "./components/AdminDashboardLayout";
import AdminDashboard from "./dashboard/admin/AdminDashboard";
import AdminProfile from "./dashboard/admin/AdminProfile";
import AssignFaculty from "./dashboard/admin/AssignFaculty";
import AttendancdReport from "./dashboard/admin/AttendancdReport";
import ManageclassAdmin from "./dashboard/admin/ManageClassAdmin";
import ManageStudents from "./dashboard/admin/ManageStudents";
import ManageSubject from "./dashboard/admin/ManageSubjects";
import ManageFaculty from "./dashboard/admin/ManageFaculty";
import ScheduleClass from "./dashboard/admin/ScheduleClass";
import AdminNotice from "./dashboard/admin/AdminNotice";
import FacultyAttendence from "./dashboard/admin/FacultyAttendence";
import ViewAttendence from "./dashboard/admin/ViewAttendance";
import  AdminCourses from './dashboard/admin/Courses'
import AdminLeaveRequests from "./dashboard/admin/AdminLeaveRequest";
// ProtectedRoute
import ProtectedRoute from "./route/ProtectedRoute";

// Faculty Pages
import Faculty from "./dashboard/faculty/Faculty";
import FacultyDashboard from "./dashboard/faculty/FacultyDashboard";
import FacultyProfile from "./dashboard/faculty/FacultyProfile";
import MarkAttendance from "./dashboard/faculty/MarkAttendance";
import ViewAttendanceFaculty from "./dashboard/faculty/ViewAttendance";
import ManageClassFaculty from "./dashboard/faculty/ManageClassFaculty";
import StudentsList from "./dashboard/faculty/StudentsList";
import FacultyNotice from "./dashboard/faculty/FacultyNotice";
import LeaveRequests from "./dashboard/faculty/LeaveRequests";
import AttendanceReport from "./dashboard/faculty/AttendanceReport";
import ClassResources from "./dashboard/faculty/ClassResources";
import FacultyTimeTable from "./dashboard/faculty/FacultyTimeTable";
import ExamMarks from "./dashboard/faculty/ExamMarks";
import Courses from "./dashboard/faculty/Courses";
import Assignments from "./dashboard/faculty/Assignments";
import AssignSubjects from "./dashboard/faculty/AssignSubjects";
import FacultyLeaveRequests from "./dashboard/faculty/LeaveRequests";
import MyAttendance from './dashboard/faculty/MyAttendance'

// Student Pages
import StudentDashboard from "./dashboard/students/StudentDashboard";
import StudentDashboardMenu from "./dashboard/students/StudentDashboardMenu";
import StudentProfile from "./dashboard/students/StudentProfile";
import StudentExamMarks from "./dashboard/students/StudentExamMarks";
import StudentTimeTable from "./dashboard/students/StudentTimeTable";
import StudentAttendanceReport from  './dashboard/students/StudentAttendanceReport'
import StudentCourses from "./dashboard/students/StudentCourses";
import StudentAssignments from "./dashboard/students/StudentAssignments";
import SubjectAssignmentData from "./dashboard/students/SubjectAssignmentData";
import StudentNotice from "./dashboard/students/StudentNotice";
import ManageclassStudent from "./dashboard/students/ManageClassStudent";
import StudentLeaveRequests from "./dashboard/students/LeaveRequest";
import StudentList from './dashboard/students/StudentList'
import StudentAttendance from './dashboard/students/StudentAttendance';


function App() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

 const hideNavbar =
  location.pathname === "/" ||
  location.pathname === "/access-denied" ||
  location.pathname.startsWith("/admin") ||
  location.pathname.startsWith("/faculty") ||
  location.pathname.startsWith("/students");


  if (isAuthenticated === null) {
    return <div className="text-white text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute allowedRoles={["admin","faculty","student"]}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute allowedRoles={["admin","faculty","student"]}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route path="/access-denied" element={<AccessDenied />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="admindashboard" />} />
          <Route path="admindashboard" element={<AdminDashboard />} />
          <Route path="adminprofile" element={<AdminProfile />} />
          <Route path="assignfaculty" element={<AssignFaculty />} />
          <Route path="attendancdreport" element={<AttendancdReport />} />
          <Route path="managestudents" element={<ManageStudents />} />
          <Route path="managesubject" element={<ManageSubject />} />
          <Route path="managefaculty" element={<ManageFaculty />} />
          <Route path="scheduleclass" element={<ScheduleClass />} />
          <Route path="adminnotices" element={<AdminNotice />} />
          <Route path="manageclass" element={<ManageclassAdmin />} />
          <Route path="facultyattendence" element={<FacultyAttendence />} />
          <Route path="viewattendence" element={<ViewAttendence />} />
          <Route path="courses" element={<AdminCourses />} />
                 <Route path="leaverequest" element={<AdminLeaveRequests />} />
        </Route>

        {/* Faculty Routes */}
        <Route
          path="/faculty"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <Faculty />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<FacultyDashboard />} />
          <Route path="profile" element={<FacultyProfile />} />
          <Route path="mark-attendance" element={<MarkAttendance />} />
          <Route path="view-attendance" element={<ViewAttendanceFaculty />} />
          <Route path="schedule" element={<FacultyTimeTable />} />
          <Route path="students" element={<StudentsList />} />
          <Route path="notices" element={<FacultyNotice />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route path="attendance-report" element={<AttendanceReport />} />
          <Route path="class-resources" element={<ClassResources />} />
          <Route path="timetable" element={<FacultyTimeTable />} />
          <Route path="exam-marks" element={<ExamMarks />} />
          <Route path="courses" element={<Courses />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="manageclass" element={<ManageClassFaculty />} />
             <Route path="assignsubjects" element={<AssignSubjects/>} />
                  <Route path="leaverequest" element={<LeaveRequests/>} />
                     <Route path="myattendance" element={<MyAttendance/>} />
        </Route>

        {/* Student Routes */}
        <Route
          path="/students"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="StudentDashboardMenu" />} />
          <Route path="StudentDashboardMenu" element={<StudentDashboardMenu />} />
          <Route path="studentprofile" element={<StudentProfile />} />
          <Route path="studentexammarks" element={<StudentExamMarks />} />
          <Route path="studenttimetable" element={<StudentTimeTable />} />
            <Route path="attendancereport" element={<StudentAttendanceReport/>} />
          <Route path="studentcourses" element={<StudentCourses />} />
          <Route path="studentassignments" element={<StudentAssignments />} />
          <Route path="assignments/:subject" element={<SubjectAssignmentData />} />
          <Route path="studentnotices" element={<StudentNotice />} />
          <Route path="manageclasses" element={<ManageclassStudent />} />
            <Route path="leaverequest" element={<LeaveRequests />} />
                <Route path="studentlist" element={<StudentList/>} />
              <Route path="myattendance" element={<StudentAttendance/>} />
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/access-denied" replace />} />
      </Routes>
    </>
  );
}

export default App;
