// // backend/models/AttendanceModel.js
// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   date: { type: String, required: true },
//   subject: { type: String, required: true },
//   students: [
//     {
//       studentId: { type: String },
//       name: { type: String },
//       present: { type: Boolean },
//     },
//   ],
// }, { timestamps: true });

// export default mongoose.model('Attendance', attendanceSchema);
// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   date: { type: String, required: true },
//   subject: { type: String, required: true },

//   // Students attendance
//   students: [
//     {
//       studentId: { type: String },
//       name: { type: String },
//       status: { type: String, enum: ["Present", "Absent"] }, // uniform field
//     },
//   ],

//   // Faculties attendance
//   faculties: [
//     {
//       facultyId: { type: String },
//       name: { type: String },
//       status: { type: String, enum: ["Present", "Absent"] }, // same structure
//     },
//   ],
// }, { timestamps: true });

// export default mongoose.model('Attendance', attendanceSchema);



// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   date: { type: String, required: true },
//   subject: { type: String, required: true },

//   // Department + Year
//   department: { type: String, required: true },   // 👈 Add this
//   year: { type: String, required: true },         // 👈 Add this

//   // Students attendance
//   students: [
//     {
//       studentId: { type: String },
//       name: { type: String },
//       status: { type: String, enum: ["Present", "Absent"] }, // uniform field
//     },
//   ],

//   // Faculties attendance
//   faculties: [
//     {
//       facultyId: { type: String },
//       name: { type: String },
//       status: { type: String, enum: ["Present", "Absent"] },
//     },
//   ],
// }, { timestamps: true });

// export default mongoose.model('Attendance', attendanceSchema);



import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  date: { type: String, required: true },
  subject: { type: String, required: true },

  // Students attendance
  students: [
    {
      studentId: { type: String },
      name: { type: String },
      status: { type: String, enum: ["Present", "Absent"] }, // uniform field
    },
  ],

  // Faculties attendance
  faculties: [
    {
      facultyId: { type: String },
      name: { type: String },
      status: { type: String, enum: ["Present", "Absent"] }, // same structure
    },
  ],
}, { timestamps: true });

export const attendanceModel= mongoose.model('attendanceModel', attendanceSchema);  