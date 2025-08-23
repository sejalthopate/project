import Notice from '../models/NoticeModel.js';

// GET all notices sorted by newest first
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ createdAt: -1 });
    res.json(notices);
  } catch (error) {
    console.error("Error fetching notices:", error);
    res.status(500).json({ message: 'Error fetching notices' });
  }
};

// CREATE new notice
export const createNotice = async (req, res) => {
  const { title, content, visibleTo, createdBy, createdById } = req.body;

  if (!title || !content || !visibleTo) {
    return res.status(400).json({ message: 'Title, content and visibleTo are required' });
  }

  try {
    const newNotice = new Notice({
      title,
      content,
      visibleTo,
      createdBy: createdBy || "Admin",
      createdById: createdById || null,
    });

    await newNotice.save();
    res.status(201).json(newNotice);
  } catch (err) {
    console.error("Error creating notice:", err);
    res.status(500).json({ message: 'Error creating notice' });
  }
};

// UPDATE notice by id
export const updateNotice = async (req, res) => {
  const { id } = req.params;
  const { title, content, visibleTo } = req.body;

  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, content, visibleTo },
      { new: true }
    );

    if (!updatedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json(updatedNotice);
  } catch (error) {
    console.error("Error updating notice:", error);
    res.status(500).json({ message: "Error updating notice" });
  }
};

// DELETE notice by id
export const deleteNotice = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNotice = await Notice.findByIdAndDelete(id);

    if (!deletedNotice) {
      return res.status(404).json({ message: "Notice not found" });
    }

    res.json({ message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    res.status(500).json({ message: "Error deleting notice" });
  }
};