import { User } from "../models/AuthModel.js";
import { manageFacultyModel } from "../models/ManageFacultyModel.js";

// ✅ CREATE Faculty
export const createFaculty = async (req, res) => {
  try {
    console.log("POST Body:", req.body); // 🔎 debug

    const {
      name,
      employeeId,
      department,
      qualifications,
      yearsOfExperience,
      phone,
      dob,
      gender,
      address,
      facultyEmail,
    } = req.body;

    // 🔎 validation
    if (
      !name || !employeeId || !department || !qualifications ||
      yearsOfExperience == null || !phone || !dob || !gender || !address || !facultyEmail
    ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // 🔎 Validate phone
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number" });
    }

    // 🔎 Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(facultyEmail)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // 🔎 Validate dob
    const dobDate = new Date(dob);
    if (isNaN(dobDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date of birth" });
    }

    // 🔎 Check duplicate in User collection
    const existingUser = await User.findOne({ email: facultyEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exists!" });
    }

    const password = "faculty@123"; // default password

    // Step 1: Create User
    let newUser;
    try {
      newUser = new User({
        name,
        email: facultyEmail,
        password,
        role: "faculty",
      });
      await newUser.save();
    } catch (err) {
      console.error("Error saving User:", err);
      return res.status(500).json({ success: false, message: "Failed to create user" });
    }

    // Step 2: Check duplicates in Faculty model
    const exist = await manageFacultyModel.findOne({
      $or: [
        { facultyEmail },
        { employeeId },
        { phone },
        { name },
      ]
    });

    if (exist) {
      return res.status(400).json({ success: false, message: "Faculty already exists with same name, email, phone or employee ID" });
    }

    // Step 3: Create Faculty Profile
    const newFaculty = new manageFacultyModel({
      user: newUser._id,
      name,
      employeeId,
      department,
      qualifications,
      yearsOfExperience,
      phone,
      dob: dobDate,
      gender,
      address,
      facultyEmail,
    });

    const savedFaculty = await newFaculty.save();

    res.status(201).json({
      success: true,
      message: "Faculty Profile created successfully",
      faculty: savedFaculty,
    });
  } catch (error) {
    console.error("❌ Error creating faculty:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ GET all faculty
export const getAllFaculty = async (req, res) => {
  try {
    const faculties = await manageFacultyModel.find().populate("user", "name email role");
    res.status(200).json({ success: true, faculties });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ GET single faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const faculty = await manageFacultyModel.findById(req.params.id).populate("user", "name email role");
    if (!faculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.status(200).json({ success: true, faculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ UPDATE Faculty
export const updateFaculty = async (req, res) => {
  try {
    const updatedFaculty = await manageFacultyModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFaculty) return res.status(404).json({ success: false, message: "Faculty not found" });
    res.status(200).json({ success: true, message: "Faculty updated", updatedFaculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// ✅ DELETE Faculty
export const deleteFaculty = async (req, res) => {
  try {
    const deleted = await manageFacultyModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Faculty not found" });
    await User.findByIdAndDelete(deleted.user);
    res.status(200).json({ success: true, message: "Faculty deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
