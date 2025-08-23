import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  year: { type: String, enum: ["FY","SY","TY"], required: true }, // ✅ new
  semester: { type: String, required: true }, // ✅ new
  outcomes: [{ type: String, trim: true }],
  marks: { type: Number, default: 0, min: 0 },
  credits: { type: Number, default: 0, min: 0 },
  createdAt: { type: Date, default: Date.now },
});

export const Course = mongoose.model("Course", courseSchema);