
import express from "express";
import {
  addExamMark,
  getExamMarks,
  updateExamMark,
  deleteExamMark,
} from "../controller/ExamMarkController.js";

const exammarksRouter = express.Router();

exammarksRouter.post("/", addExamMark);
exammarksRouter.get("/", getExamMarks);
exammarksRouter.put("/:id", updateExamMark);
exammarksRouter.delete("/:id", deleteExamMark);

export default exammarksRouter;