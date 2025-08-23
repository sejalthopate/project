import express from 'express';
import { createStudentController } from '../controller/StudentController.js';

const studentRouter=express.Router();

studentRouter.post('/create-student',createStudentController);

export default studentRouter;