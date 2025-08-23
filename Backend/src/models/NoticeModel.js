import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    visibleTo: { 
      type: String, 
      enum: ['admin', 'faculty', 'student', 'all'], 
      required: true 
    },
    createdBy: { 
      type: String, 
      enum: ['Admin', 'Faculty'], 
      default: 'Admin' 
    },
    createdById: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      default: null 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);