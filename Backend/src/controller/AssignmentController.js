import { Assignment } from "../models/AssignmentModel.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";


// ✅ Create Assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, type, semester, department, subject, resourceLink } = req.body;

    if (!title || !semester || !department || !subject) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    let fileUrl = null;
    let filePublicId = null;

    // Upload file to Cloudinary if provided
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer, "assignments");
      fileUrl = result.secure_url;
      filePublicId = result.public_id;
    }

    const newAssignment = new Assignment({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      type,
      semester,
      department,
      subject,
      resourceLink,
      fileUrl,
      filePublicId,
      facultyId:req.user._id, // ✅ Uses UserId from auth middleware
    });

    await newAssignment.save();
    console.log("✅ Saved Assignment:", newAssignment);
    res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });

  } catch (error) {
    console.error("Create assignment error:", error);
    res.status(500).json({ message: "Error creating assignment", error: error.message });
  }
};



// ✅ Get Assignments for Faculty
export const getAssignmentsForFaculty = async (req, res) => {
  try {
    const facultyId = req.user._id;
    const assignments = await Assignment.find({ facultyId });
    res.status(200).json(assignments);

  } catch (error) {
    console.error("Get assignments for faculty error:", error);
    res.status(500).json({ message: "Error fetching faculty assignments", error: error.message });
  }
};

// ✅ Update Assignment
export const updateAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;
    const { title, description, dueDate, type, semester, department, subject, resourceLink } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

  // Check faculty ownership
  if (assignment.facultyId.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not allowed to update this assignment" });
}


    // File update (if new file uploaded)
    if (req.file) {
      if (assignment.filePublicId) {
        await deleteFromCloudinary(assignment.filePublicId); // Delete old file
      }
      const result = await uploadBufferToCloudinary(req.file.buffer, "assignments");
      assignment.fileUrl = result.secure_url;
      assignment.filePublicId = result.public_id;
    }

    // Update fields
    assignment.title = title || assignment.title;
    assignment.description = description || assignment.description;
    assignment.dueDate = dueDate ? new Date(dueDate) : assignment.dueDate;
    assignment.type = type || assignment.type;
    assignment.semester = semester || assignment.semester;
    assignment.department =department || assignment.department;
    assignment.subject = subject || assignment.subject;
    assignment.resourceLink = resourceLink || assignment.resourceLink;

    await assignment.save();
    res.status(200).json({ message: "Assignment updated successfully", assignment });

  } catch (error) {
    console.error("Update assignment error:", error);
    res.status(500).json({ message: "Error updating assignment", error: error.message });
  }
};

// ✅ Delete Assignment
export const deleteAssignment = async (req, res) => {
  try {
    const assignmentId = req.params.id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Check faculty ownership
if (assignment.facultyId.toString() !== req.user._id.toString()) {
  return res.status(403).json({ message: "Not allowed to delete this assignment" });
}


    // Delete file from Cloudinary
    if (assignment.filePublicId) {
      await deleteFromCloudinary(assignment.filePublicId);
    }

    await Assignment.findByIdAndDelete(assignmentId);
    res.status(200).json({ message: "Assignment deleted successfully" });

  } catch (error) {
    console.error("Delete assignment error:", error);
    res.status(500).json({ message: "Error deleting assignment", error: error.message });
  }
};


