import mongoose from "mongoose";

const manageClassSchema = new mongoose.Schema(
  {
    department: {
      type: String,
      required: [true, "Department is required"],
      trim: true,
    },

    semester: {
      type: Number,
      required: [true, "Semester is required"],
      min: 1,
      max: 6,
    },

    date: {
      type: String,
      required: [true, "Date is required"],
      trim: true,
    },

    day: {
      type: String,
      required: [true, "Day is required"],
      trim: true,
    },

    time: {
      type: String,
      required: [true, "Time is required"],
      trim: true,
    },

    previousLecture: {
      type: String,
      required: [true, "Previous Lecture is required"],
      trim: true,
    },

    previousStaff: {
      type: String,
      required: [true, "Previous Staff is required"],
      trim: true,
    },

    manageLecture: {
      type: String,
      required: [true, "Managed Lecture is required"],
      trim: true,
    },

    manageStaff: {
      type: String,
      required: [true, "Managed Staff is required"],
      trim: true,
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export const manageClassModel = mongoose.model(
  "manageClass",
  manageClassSchema
);