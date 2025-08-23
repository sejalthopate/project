import mongoose from "mongoose";

const LeaveRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // name: { type: String, required: true },   // 👈 frontend "name"
  leaveType: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },

  dayType: { type: String, enum: ["Full Day", "Half Day"], default: "Full Day" }, // 👈 frontend "dayType"
  reason: { type: String, required: true },
  notes: { type: String },                  // 👈 frontend "notes"
  contactInfo: { type: String },            // 👈 frontend "contactInfo"
  department: { type: String },
  delegationFaculty: { type: String },
  attachment: { type: String },

  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
}, { timestamps: true });

export default mongoose.model("LeaveRequest", LeaveRequestSchema);