import { adminProfileModel } from '../models/AdminProfileModel.js';

// CREATE profile
export const createAdminProfile = async (req, res) => {
  try {
    const { name, email, college, role } = req.body;

    if (!name || !email || !college || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await adminProfileModel.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Profile already exists" });
    }

    const newAdmin = new adminProfileModel({ name, email, college, role });
    await newAdmin.save();

    res.status(201).json({ message: "Profile created", admin: newAdmin });
  } catch (err) {
    console.error("Create error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET profile
export const getAdminProfile = async (req, res) => {
  try {
    const profile = await adminProfileModel.findOne();
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.json(profile);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// UPDATE profile (NO IMAGE)
export const updateAdminProfile = async (req, res) => {
  try {
    const { _id, name, email, college, role } = req.body;

    if (!_id) {
      return res.status(400).json({ error: "ID is required to update" });
    }

    const updatedProfile = await adminProfileModel.findByIdAndUpdate(
      _id,
      { name, email, college, role },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(updatedProfile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
