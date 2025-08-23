import express from 'express';
import { createFaculty } from '../controller/FacultyController.js';

const facultyRouter=express.Router();

facultyRouter.post('/create-faculty',createFaculty);

export default facultyRouter;