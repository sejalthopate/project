
import mongoose from "mongoose";

const manageStudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  collegeEmail: {          // ✅ new field
    type: String,
    required: true,
    unique: true
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true
  },
  course: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  className:{
    type: String,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/,
    unique:true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  address: {
    type: String,
    required: true,
    maxlength: 300
  }
}, { timestamps: true });

export const manageStudentModel = mongoose.model("manageStudentModel", manageStudentSchema);
