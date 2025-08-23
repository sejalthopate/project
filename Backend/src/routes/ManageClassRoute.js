import express from "express";
import {
  createManageClass,
  deleteClass,
  getAllClasses,
  updateClass,
} from "../controller/ManageClassController.js";

import { isAuthenticated } from "../middlewares/authMiddleware.js";

const manageClassRouter = express.Router();

manageClassRouter.post("/create-manageclass", isAuthenticated, createManageClass);
manageClassRouter.get("/getall-manageclass", isAuthenticated, getAllClasses);
manageClassRouter.put("/update-manageclass/:id", isAuthenticated, updateClass);
manageClassRouter.delete("/delete-manageclass/:id", isAuthenticated, deleteClass);

export default manageClassRouter;