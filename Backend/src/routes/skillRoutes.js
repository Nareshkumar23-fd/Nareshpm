import express from "express";
import { createSkill, deleteSkill, getAllSkill, getSkillById, updateSkill } from "../controllers/skillController.js";

const skillRouter = express.Router();

skillRouter.post("/create", createSkill);
skillRouter.put("/update/:id", updateSkill);
skillRouter.delete("/delete/:id", deleteSkill);
skillRouter.get("/", getAllSkill);
skillRouter.get("/:id", getSkillById);

export default skillRouter;