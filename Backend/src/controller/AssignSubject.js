// GET assignments for logged-in faculty
import { facultyAssignModel } from "../models/FacultyAssignModel";
export const getMyAssignments = async (req, res) => {
  try {
    
    const email = req.user.email;

    const assignments = await facultyAssignModel.find({ facultyEmail: email });

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Failed to fetch assignments:", error);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};
