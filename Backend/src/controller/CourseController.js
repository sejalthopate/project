import { Course } from "../models/CourseModel.js";

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add course (Admin only)
export const addCourse = async (req, res) => {
  try {
    const { name, department, year, semester, outcomes, marks } = req.body;

    const course = new Course({
      name,
      department,
      year,        // ✅ new field
      semester,    // ✅ new field
      outcomes,
      marks,
    });

    const savedCourse = await course.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, department, year, semester, outcomes, marks } = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      { name, department, year, semester, outcomes, marks }, // ✅ include year & semester
      { new: true }
    );

    res.json({ message: "Course updated successfully", course });
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Delete course (Admin only)
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};