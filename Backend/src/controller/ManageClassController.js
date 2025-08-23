import { manageClassModel } from "../models/ManageClassModel.js";

// Create a class
export const createManageClass = async (req, res) => {
  try {
    const {
      department,
      semester,
      date,
      day,
      time,
      previousLecture,
      previousStaff,
      manageLecture,
      manageStaff,
    } = req.body;

    if (
      !department ||
      !semester ||
      !date ||
      !day ||
      !time ||
      !previousLecture ||
      !previousStaff ||
      !manageLecture ||
      !manageStaff
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    // Staff clash check (same day + same time)
    const staffClash = await manageClassModel.findOne({
      day,
      time,
      manageStaff,
    });

    if (staffClash) {
      return res
        .status(409)
        .json({ message: "This staff already has a class at this time!" });
    }

    const newManageClass = new manageClassModel({
      department,
      semester,
      date,
      day,
      time,
      previousLecture,
      previousStaff,
      manageLecture,
      manageStaff,
    });

    await newManageClass.save();

    return res.status(201).json({
      message: "Manage class created successfully!",
      ManageClass: newManageClass,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Failed to create Manage Class" });
  }
};

// Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await manageClassModel.find();
    res.status(200).json(classes);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error fetching classes", error: error.message });
  }
};

// Update class
export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch existing class
    const existingClass = await manageClassModel.findById(id);
    if (!existingClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    const { day, time, manageStaff } = req.body;

    // Staff clash check only if day/time/staff changed
    if (
      (day && day !== existingClass.day) ||
      (time && time !== existingClass.time) ||
      (manageStaff && manageStaff !== existingClass.manageStaff)
    ) {
      const staffClash = await manageClassModel.findOne({
        _id: { $ne: id },
        day: day || existingClass.day,
        time: time || existingClass.time,
        manageStaff: manageStaff || existingClass.manageStaff,
      });

      if (staffClash) {
        return res
          .status(409)
          .json({ message: "This staff already has a class at this time!" });
      }
    }

    // Merge existing values with new data (optional fields handling)
    const updatedData = {
      department: req.body.department || existingClass.department,
      semester: req.body.semester || existingClass.semester,
      date: req.body.date || existingClass.date,
      day: req.body.day || existingClass.day,
      time: req.body.time || existingClass.time,
      previousLecture: req.body.previousLecture || existingClass.previousLecture,
      previousStaff: req.body.previousStaff || existingClass.previousStaff,
      manageLecture: req.body.manageLecture || existingClass.manageLecture,
      manageStaff: req.body.manageStaff || existingClass.manageStaff,
    };

    const updatedClass = await manageClassModel.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({ message: "Class updated", updatedClass });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error updating class", error: error.message });
  }
};

// Delete class
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await manageClassModel.findByIdAndDelete(id);

    if (!deletedClass) {
      return res.status(404).json({ message: "Class not found" });
    }

    res.status(200).json({ message: "Class deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting class", error: error.message });
  }
};