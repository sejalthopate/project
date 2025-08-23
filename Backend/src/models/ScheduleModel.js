import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  time: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
}, { _id: false });

const daySchema = new mongoose.Schema({
  day: {
    type: String,
    required: true,
    enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  slots: {
    type: [slotSchema],
    required: true,
    default: [],
  },
}, { _id: false });

const scheduleSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    enum: ["Computer", "Electrical", "Civil", "Mechanical", "IT", "Automobile", "E&TC"],
  },
  year: {
    type: String,
    required: true,
    enum: ["FY", "SY", "TY"],
  },
  timetable: {
    type: [daySchema],
    required: true,
    default: [],
  },
}, { versionKey: false });

export const Schedule = mongoose.model("Schedule", scheduleSchema);