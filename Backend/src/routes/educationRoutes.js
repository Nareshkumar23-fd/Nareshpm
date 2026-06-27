import express from "express";
import { createEducation, deleteEducation, getAllEducation, getEducationById, updateEducation } from "../controllers/educationController.js";

const educationRouter = express.Router();

educationRouter.post("/create", createEducation);
educationRouter.put("/update/:id", updateEducation);
educationRouter.delete("/delete/:id", deleteEducation);
educationRouter.get("/", getAllEducation);
educationRouter.get("/:id", getEducationById);

export default educationRouter;