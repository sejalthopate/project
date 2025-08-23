
import mongoose from "mongoose";

const manageFacultySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, unique: true },
  employeeId: { type: String, required: true, unique: true },
  department: { type: String, required: true },
  qualifications: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  phone: { type: String, required: true, unique: true, match: /^[6-9]\d{9}$/ },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  facultyEmail: { type: String, required: true, unique: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
}, { timestamps: true });

export const manageFacultyModel = mongoose.model("manageFacultyModel", manageFacultySchema);
