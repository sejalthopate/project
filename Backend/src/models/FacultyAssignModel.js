// import mongoose from 'mongoose';

// const facultyAssignSchema = new mongoose.Schema({
//     facultyName:
//    { type: String, 
//     required: true 
//   },
//     subjectName: 
//   { 
//     type: String, 
//     required: true
//    },
//    semester: 
//   { type: String,
//      required: true
//      },
//   department: { 
//     type: String, 
//     required: true
//    },
  


// });

// export const facultyAssignModel=mongoose.model('facultyAssignModel', facultyAssignSchema);


import mongoose from 'mongoose';

const facultyAssignSchema = new mongoose.Schema({
  facultyName: { 
    type: String, 
    required: true 
  },

  subjectName: { 
    type: String, 
    required: true
  },
  semester: { 
    type: String,
    required: true
  },
  department: { 
    type: String, 
    required: true
  },
  year: {                     // 👈 नवीन field
    type: String,
    enum: ["FY", "SY", "TY", "Final Year"],
    required: true,
  }
});

export const facultyAssignModel = mongoose.model('facultyAssignModel', facultyAssignSchema);
