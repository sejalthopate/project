import { User } from '../models/AuthModel.js';
import jwt from 'jsonwebtoken';

// ✅ User Register
export const UserRegister = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.send("All fields are required");
    }

    const UserExist = await User.findOne({ email });

    if (UserExist) {
      return res.status(400).json({
        success: false,
        message: 'User already registered. Please login',
      });
    }

    const NewUser = new User({ name, email, password, role });
    const SavedUser = await NewUser.save();

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      UserId: SavedUser._id,
    });

  } catch (error) {
    console.error("Error Registering User:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// ✅ User Login
export const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", email, password);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and Password are required',
      });
    }

    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User Not Found',
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    const token = jwt.sign(
      {
        UserId: user._id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    let message = '';
    if (user.role === 'admin') message = 'Admin Login Successful';
    else if (user.role === 'faculty') message = 'Faculty Login Successful';
    else if (user.role === 'student') message = 'Student Login Successful';

    return res.status(200).json({
      success: true,
      message,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};