import mongoose from "mongoose";

const facultySchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
     
    
    employeeId:{
        type:String,
        required:true,
        unique:true
    },
 
    department:{
        type:String,
        required:true,
        
    },

     qualifications:{
        type:String,
        required:true,
        
    },

    yearsOfExperience:{
        type:Number,
        required:true,
        min:0,
        max:60
    },

    phone:{
        type:String,
        required:true,
         match:/^[6-9]\d{9}$/
    },

    dob:{
        type:Date,
        required:true,
        
    },

    gender:{
        type:String,
        enum:['Male','Female','Other'],
        required:true,
        
    },

    address:{
        type:String,
        required:true,
        maxlength:300
    },
},{timestamps:true});

export const Faculty=mongoose.model('Faculty',facultySchema);