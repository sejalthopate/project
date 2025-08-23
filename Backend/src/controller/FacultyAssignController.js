
import { facultyAssignModel } from "../models/FacultyAssignModel.js";

// 👉 Create assign faculty
export const createAssignFaculty = async (req, res) => {
  try {
    const { facultyName, subjectName, semester, department, year } = req.body;

    // validation
    if (!facultyName || !subjectName || !semester || !department || !year) {
      return res.status(400).json({ message: "All fields are required !" });
    }

    const newAssignFaculty = new facultyAssignModel({
      facultyName,
      subjectName,
      semester,
      department,
      year,  // ✅ new field
    });

    await newAssignFaculty.save();

    res.status(201).json({
      message: "Faculty assigned successfully!",
      Faculty: {
        facultyName: newAssignFaculty.facultyName,
        subjectName: newAssignFaculty.subjectName,
        semester: newAssignFaculty.semester,
        department: newAssignFaculty.department,
        year: newAssignFaculty.year, 
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to Assign Faculty" });
    console.log(error);
  }
};

export const getAssignFaculty = async (req, res) => {
  try {
    const assignments = await facultyAssignModel.find();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch faculty", error: error.message });
  }
};




// 👉 Update assign faculty
export const updateAssignFaculty = async (req, res) => {
  try {
    const updated = await facultyAssignModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Faculty updated successfully", updated });
  } catch (error) {
    res.status(500).json({ message: "Failed to update faculty", error: error.message });
  }
};

// 👉 Delete assign faculty
export const deleteAssignFaculty = async (req, res) => {
  try {
    await facultyAssignModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Faculty deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete faculty", error: error.message });
  }
};

