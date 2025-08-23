


import {attendanceModel} from '../models/AttendanceModel.js';

// ✅ Attendance mark करणे (students + faculties दोन्ही साठी)
export const markAttendance = async (req, res) => {
  try {
    const { date, subject, students, faculties } = req.body;

    const attendanceRecord = new attendanceModel({
      date,
      subject: subject || "N/A",   // faculty साठी subject नसेल तर default
      students: students || [],
      faculties: faculties || []
    });

    await attendanceRecord.save();

    res.status(200).json({
      message: 'Attendance saved successfully',
      attendance: attendanceRecord
    });

  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: 'Error saving attendance', error });
  }
};

// ✅ सर्व attendance (common)
export const getAllAttendance = async (req, res) => {
  try {
    const records = await attendanceModel.find().sort({ createdAt: -1 });
    res.status(200).json({ attendance: records });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance', error });
  }
};

// ✅ फक्त Faculty Attendance
export const getFacultyAttendance = async (req, res) => {
  try {
    const records = await attendanceModel.find({ faculties: { $exists: true, $ne: [] } })
      .sort({ createdAt: -1 });
    res.status(200).json({ attendance: records });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching faculty attendance', error });
  }
};

// ✅ फक्त Student Attendance
export const getStudentAttendance = async (req, res) => {
  try {
    const records = await attendanceModel.find({ students: { $exists: true, $ne: [] } })
      .sort({ createdAt: -1 });
    res.status(200).json({ attendance: records });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student attendance', error });
  }
};

// ---------------- Faculty Delete Controllers ----------------

// ✅ Single Faculty delete (inside a record)
export const deleteSingleFaculty = async (req, res) => {
  try {
    const { recordId, facultyId } = req.params;

    const record = await attendanceModel.findById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.faculties = record.faculties.filter(
      (f) => f._id.toString() !== facultyId
    );

    await record.save();
    res.status(200).json({ message: "Faculty deleted", record });
  } catch (error) {
    console.error("Error deleting faculty:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ✅ Full Faculty Attendance Record delete
export const deleteFacultyAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await attendanceModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    res.status(200).json({ message: "Attendance record deleted successfully" });
  } catch (error) {
    console.error("Error deleting record:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// ---------------- Student Delete Controllers ----------------

// ✅ Single Student delete (inside a record)
export const deleteSingleStudent = async (req, res) => {
  try {
    const { recordId, studentId } = req.params;

    const record = await attendanceModel.findById(recordId);
    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    record.students = record.students.filter(
      (s) => s._id.toString() !== studentId
    );

    await record.save();
    res.status(200).json({ message: "Student deleted", record });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const deleteStudentAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    // Replace with your DB logic (e.g., MongoDB)
    const deleted = await attendanceModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
