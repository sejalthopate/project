import mongoose from 'mongoose';

const manageSubjectSchema = new mongoose.Schema({
  subjectName: { type: String, required: true },
  subjectCode: { type: String, required: true, unique:true},
  semester: { type: String, required: true },
  department: { type: String, required: true }
});

export const manageSubjectModel = mongoose.model('manageSubjectModel',manageSubjectSchema)