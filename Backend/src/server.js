import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import manageStudentRouter from './routes/ManageStudentRoute.js'
import authRouter from './routes/AuthRoute.js'
import adminDahboardRouter from "./routes/AdminDashboardRoute.js";
import assignfacultyRouter from './routes/FacultyAssignRoute.js'
import manageClassRouter from "./routes/ManageClassRoute.js"
import manageFacultyRouter from "./routes/ManageFacultyRoute.js";
import manageSubjectRouter from "./routes/ManageSubjectRoute.js";
import adminProfileRouter from "./routes/AdminProfileRoute.js";
import noticeRouter from "./routes/NoticeRoute.js";
import courseRouter from "./routes/CourseRoute.js";
import cors from "cors";
import { connectDB } from "./config/db.js";
import attendanceRouter from "./routes/AttendanceRoute.js";
import exammarksRouter from "./routes/ExamMarkRoutes.js";
import scheduleRouter from "./routes/ScheduleRoute.js";
import assignmentRouter from "./routes/AssignmentRoutes.js";
import router from "./routes/LeaveRequestRoute.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRouter);
app.use('/api/v1/assignfaculty', assignfacultyRouter);
app.use("/api/v1/manageclass",manageClassRouter); 
app.use("/api/v1/faculty",manageFacultyRouter );
app.use("/api/v1/subjects",manageSubjectRouter)
app.use("/api/v1/students", manageStudentRouter);
app.use("/api/v1/admin", adminDahboardRouter);
app.use("/api/v1/adminprofile",adminProfileRouter);
app.use("/api/v1/notices", noticeRouter);
app.use("/api/v1/facultyschedule", scheduleRouter);
app.use("/api/v1/AttendanceRoutes",attendanceRouter);
app.use("/api/exammarks", exammarksRouter);
app.use("/api/v1/courses", courseRouter);
app.use("/api/assignments",assignmentRouter);
app.use("/api/v1/leave",router)


app.listen(process.env.PORT,()=>{
  console.log(`server is running on http://localhost:${process.env.PORT}`)
})