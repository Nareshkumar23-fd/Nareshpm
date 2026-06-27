import express from "express";
import { createExperience, deleteExperience, getAllExperience, getExperienceById, updateExperience } from "../controllers/experienceController.js";

const experienceRouter = express.Router();

experienceRouter.get("/", getAllExperience);
experienceRouter.get("/:id", getExperienceById);
experienceRouter.post("/create", createExperience);
experienceRouter.put("/update/:id", updateExperience);
experienceRouter.delete("/delete/:id", deleteExperience);

export default experienceRouter;