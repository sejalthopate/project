import {User} from '../models/AuthModel.js';
import {Faculty} from '../models/FacultyModel.js';
import mongoose from 'mongoose';


export const createFaculty = async (req,res)=>{
  try{

       const {
        UserId,
        employeeId,
        department,
        qualifications,
        yearsOfExperience,
        phone,
        dob,
        gender,
        address,

       }=req.body;

      
       if(!UserId || !employeeId || !department || !qualifications || !yearsOfExperience==null || !phone || !dob || !gender ||! address)
{
  return res.status(400).json({
    success:false,
    message:"All fields are required"
  });
}  


    if(!mongoose.Types.ObjectId.isValid(UserId)){
      return res.status(400).json({
        success:false,
        message:`Invalid UserId:${UserId}`,
      });
    }
 const ExistingUser=await User.findById(UserId);

 if(!ExistingUser){
  return res.status(404).json({
    success:false,
    message:"User not found",
  });
 }

     
     const FacultyExists=await Faculty.findOne({user:UserId});
      if(FacultyExists){
        return res.status(400).json({
          success:false,
          message:"Faculty profile already exists for this user",
        });
      }

      const newFaculty=new Faculty({
        user:UserId,
        employeeId,
        department,
        qualifications,
        yearsOfExperience,
        phone,
        dob,
        gender,
        address,
      });


      const SavedFaculty= await newFaculty.save();

      res.status(201).json({
        success:true,
        message:"Faculty Profile created succesfully",
        Faculty:SavedFaculty,
      });

}
catch(error){
  console.error("Error creating faculty",error);
  res.status(500).json({
    success:false,
    message:"Internal Server Error"
  });
}


};