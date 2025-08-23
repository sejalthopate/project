import multer from "multer";

// memory storage so we can send buffer to Cloudinary
const storage = multer.memoryStorage();
export const uploadMemory = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});