import mongoose from "mongoose";

const studentSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },

    rollno:{
        type:String,
        required:true,
        unique:true
    },

    course:{
        type:String,
        required:true,
       
    },

    semester:{
        type:Number,
        required:true,
       
    },

     departments:{
        type:String,
        required:true,
       
    },
       
    batch:{
        type:String,
        required:true,
       
    },

    phone:{
        type:String,
        required:true,
         match:/^[6-9]\d{9}$/  //indian mobile validation
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

export const Student=mongoose.model('Student',studentSchema);