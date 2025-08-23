import mongoose from "mongoose";

const adminProfileSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  email: {
     type: String,
      unique: true
     },
  college: {
    type:String,
    required:true
  },
  role:{
type:String,
required:true
  } 
});

export const adminProfileModel= mongoose.model("adminProfileModel", adminProfileSchema);