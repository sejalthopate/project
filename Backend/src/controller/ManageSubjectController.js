import {manageSubjectModel} from '../models/ManageSubjectModel.js';
//create subject
export const createSubject = async (req, res) => {
  try {
    const {subjectName,subjectCode,semester,department} = req.body;

    if(!subjectName || !subjectCode || !semester || !department){
      return res.status(400).json({message:"All fields are required !"})
    }

    const codeExist = await manageSubjectModel.findOne({subjectCode});

    if(codeExist){
      return res.status(409).json({message:"Subject code already exist !"})
    }

    const newSubject = new manageSubjectModel({
      subjectName,
      subjectCode,
      semester,
      department
    })

    await newSubject.save();

res.status(201).json({
  message: "Subject created successfully !",
  Subject: {
    subjectName: newSubject.subjectName,
    subjectCode: newSubject.subjectCode,
    semester: newSubject.semester,
    department: newSubject.department
  }
});
    
  } catch (error) {
    res.status(500).json({ error: 'Failed to create subject' });
    console.log(error);
  }
};
//get subject
export const getAllSubjects = async (req, res) => {
  try {
    const subjects = await manageSubjectModel.find();
    res.status(200).json(subjects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch subjects' });
  }
};
//update subject
export const updateSubject = async (req, res) => {
  try {
    const subject = await manageSubjectModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update subject' });
  }
};
//delet subject
export const deleteSubject = async (req, res) => {
  try {
    await manageSubjectModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete subject' });
  }
};