// backend/controllers/examMarkController.js
import ExamMark from "../models/ExamMarkModel.js";

// ✅ Add new exam mark
export const addExamMark = async (req, res) => {
  try {
    const newMark = new ExamMark(req.body);
    await newMark.save();
    res.status(201).json(newMark);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ✅ Get all exam marks
export const getExamMarks = async (req, res) => {
  try {
    const marks = await ExamMark.find();
    res.json(marks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update exam mark
export const updateExamMark = async (req, res) => {
  try {
    const updated = await ExamMark.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete exam mark
export const deleteExamMark = async (req, res) => {
  try {
    await ExamMark.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};