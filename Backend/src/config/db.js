import mongoose from "mongoose";

// const MONGO_URI = "mongodb+srv://thopatesejal184:pass123321@project.zprvbln.mongodb.net/"

export const connectDB = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongodb connected succesfully');
  }
  
  catch(error){
    console.error('mongodb connection failed',error);
    process.exit (1);
  };
};