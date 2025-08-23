


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