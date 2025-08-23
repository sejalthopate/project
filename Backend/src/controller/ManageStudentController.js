// import { User } from '../models/AuthModel.js';
// import { manageStudentModel } from '../models/ManageStudentModel.js';

// // CREATE Student
// export const createStudentController = async (req, res) => {
//   try {
//     const {
//       name,
//       enrollmentNo,
//       course,
//       semester,
//       department,
//       className,
//       batch,
//       phone,
//       dob,
//       gender,
//       address
//     } = req.body;

//     const email = `${name}@student.com`;
//     const password = 'student123';

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: 'User already exists with this email'
//       });
//     }
//     const enrollmentNoExist=await manageStudentModel.findOne({enrollmentNo});
//       if(enrollmentNoExist){
//         return res.status(400).json({message:"Enrollment Number already exist "})
        
//       }

//        const phonenoExist=await manageStudentModel.findOne({phone});
//       if(phonenoExist){
//         return res.status(400).json({message:"Phone Number already exist "})
        
//       }
     
//     const newUser = new User({
//       name,
//       email,
//       password,
//       role: 'student'
//     });
//     await newUser.save();

//     const studentExist = await manageStudentModel.findOne({ user: newUser._id });
//     if (studentExist) {
//       return res.status(400).json({
//         success: false,
//         message: 'Student Profile Already Exists'
//       });
//     }

//     const student = new manageStudentModel({
//       user: newUser._id,
//       name,
//       enrollmentNo,
//       course,
//       semester,
//       department,
//       className,
//       batch,
//       phone,
//       dob,
//       gender,
//       address
//     });

//     await student.save();

//     res.status(201).json({
//       success: true,
//       message: 'Student Profile Created Successfully',
//       student
//     });

//   } catch (error) {
//     console.error('Error creating student profile:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// //GET ALL Students
// export const getAllStudentsController = async (req, res) => {
//   try {
//     const students = await manageStudentModel.find().populate('user');
//     res.status(200).json({
//       success: true,
//       students
//     });
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// //  UPDATE Student
// export const updateStudentController = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedStudent = await manageStudentModel.findByIdAndUpdate(id, req.body, {
//       new: true,
//       runValidators: true
//     });

//     if (!updatedStudent) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: 'Student updated successfully',
//       student: updatedStudent
//     });

//   } catch (error) {
//     console.error('Error updating student:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };

// // DELETE Student 
// export const deleteStudentController = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedStudent = await manageStudentModel.findByIdAndDelete(id);
//     if (!deletedStudent) {
//       return res.status(404).json({
//         success: false,
//         message: 'Student not found'
//       });
//     }

//     // Also optionally delete associated User:
//     await User.findByIdAndDelete(deletedStudent.user);

//     res.status(200).json({
//       success: true,
//       message: 'Student deleted successfully'
//     });

//   } catch (error) {
//     console.error('Error deleting student:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error'
//     });
//   }
// };
import { User } from '../models/AuthModel.js';
import { manageStudentModel } from '../models/ManageStudentModel.js';

// CREATE Student
export const createStudentController = async (req, res) => {
  try {
    const {
      name,
      collegeEmail,
      enrollmentNo,
      course,
      semester,
      department,
      className,
      batch,
      phone,
      dob,
      gender,
      address
    } = req.body;

    const password = 'student123';

    // ✅ Check duplicate User
    const existingUser = await User.findOne({ email: collegeEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // ✅ Check enrollmentNo & phone duplicates
    const enrollmentNoExist = await manageStudentModel.findOne({ enrollmentNo });
    if (enrollmentNoExist) {
      return res.status(400).json({ message: "Enrollment Number already exist" });
    }

    const phoneExist = await manageStudentModel.findOne({ phone });
    if (phoneExist) {
      return res.status(400).json({ message: "Phone Number already exist" });
    }

    // ✅ Create User
    const newUser = new User({
      name,
      email: collegeEmail,  // real college email
      password,
      role: 'student'
    });
    await newUser.save();

    // ✅ Create Student Profile
    const studentExist = await manageStudentModel.findOne({ user: newUser._id });
    if (studentExist) {
      return res.status(400).json({
        success: false,
        message: 'Student Profile Already Exists'
      });
    }

    const student = new manageStudentModel({
      user: newUser._id,
      name,
      collegeEmail,         // save email in student collection
      enrollmentNo,
      course,
      semester,
      department,
      className,
      batch,
      phone,
      dob,
      gender,
      address
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student Profile Created Successfully',
      student
    });

  } catch (error) {
    console.error('Error creating student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// GET ALL Students
export const getAllStudentsController = async (req, res) => {
  try {
    const students = await manageStudentModel.find().populate('user');
    res.status(200).json({
      success: true,
      students
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// UPDATE Student
export const updateStudentController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStudent = await manageStudentModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      student: updatedStudent
    });

  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// DELETE Student 
export const deleteStudentController = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedStudent = await manageStudentModel.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Also optionally delete associated User:
    await User.findByIdAndDelete(deletedStudent.user);

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
