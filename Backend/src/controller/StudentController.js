import {User} from '../models/AuthModel.js';
import {Student} from '../models/StudentModel.js';

export const createStudentController = async (req,res) => {

  try{

    const {
      UserId,
      rollno,
      course,
      semester,
      department,
      batch,
      phone,
      DOB,
      gender,
      address
    } = req.body;

    const user = await User.findById(UserId);
    if(!user || user.role !== 'Student')
    {
      return res.status(404).json({
        sucess:false,
        message:'Student user not found'
      });

      const StudentExist = await Student.findOne({ user:UserId});

      if(StudentExist){
        return res.status(400).json({

          sucess:false,
          message:'Student Profile Already Exists'
        });
      }

      const student = new Student ({

       user: UserId,
      rollno,
      course,
      semester,
      department,
      batch,
      phone,
      DOB,
      gender,
      address
    

      });

      await student.save();
      res.status(201).json({

        sucess:true,
        message:'Student Profile Created Successfully',
        student
      });
   
    }
  }
       catch(error) {
        console.error('Error creating student Profile:',error);
        res.status(500).json({

          sucess:false,
          message:'Internal server error'
        })
       }

      

  
}