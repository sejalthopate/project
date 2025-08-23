import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String },
  dueDate: { type: Date },
  type: { type: String, enum: ["Assignment", "Study Material"], default: "Assignment" },

  semester: { type: String, required: true },
  department: { type: String, required: true },   // e.g., "Computer"
  subject: { type: String, required: true },  // e.g., "Operating System"

  fileUrl: { type: String },      // Cloudinary secure_url
  filePublicId: { type: String }, // Cloudinary public_id (for deletion if needed)
  resourceLink: { type: String }, // optional external link
  
  facultyId: { 
    type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const Assignment = mongoose.model("Assignment", assignmentSchema);