import mongoose from "mongoose";

const ExamMarkSchema = new mongoose.Schema({
  name: String,
  ut1: Number,
  ut2: Number,
  practical: [{ no: Number, marks: Number }],
  assignment: [{ no: Number, marks: Number }],
  oral: [{ no: Number, marks: Number }],
  average: Number,
  total: Number,
  overallAvg: Number,
});

export default mongoose.model("ExamMark", ExamMarkSchema);