import express from "express";
import upload from "../middleware/upload.js";

import {
  createProject,
  getAllProject,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const projectRouter = express.Router();


projectRouter.post("/create", upload.single("img"), createProject);


projectRouter.get("/", getAllProject);

projectRouter.get("/:id", getProjectById);


projectRouter.put("/update/:id", upload.single("img"), updateProject);


projectRouter.delete("/delete/:id", deleteProject);

export default projectRouter;