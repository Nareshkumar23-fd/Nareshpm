import Project from "../models/projectModel.js";

export const createProject = async (req, res) => {
  try {
    const { title, type, desc, github } = req.body;

    let { points, tech } = req.body;

    // 1. Get image from multer (Cloudinary upload)
    const img = req.file?.path;

    if (!img) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // 2. Convert string → array (important for Postman / frontend FormData)
    if (typeof points === "string") {
      points = JSON.parse(points);
    }

    if (typeof tech === "string") {
      tech = JSON.parse(tech);
    }

    // 3. Basic validation
    if (!title || !type || !desc || !github) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!Array.isArray(points) || points.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Points must be a non-empty array",
      });
    }

    if (!Array.isArray(tech) || tech.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tech must be a non-empty array",
      });
    }

    // 4. Create project
    const project = await Project.create({
      title,
      type,
      desc,
      points,
      tech,
      github,
      img,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });

  } catch (error) {
    console.log("Error in createProject controller:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    let { title, type, desc, github, points, tech } = req.body;

    // 1. Find existing project
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 2. Handle image update (optional)
    let img = project.img;

    if (req.file?.path) {
      img = req.file.path;
    }

    // 3. Convert arrays if sent as string
    if (typeof points === "string") {
      points = JSON.parse(points);
    }

    if (typeof tech === "string") {
      tech = JSON.parse(tech);
    }

    // 4. Build update object (only update provided fields)
    const updateData = {
      title: title ?? project.title,
      type: type ?? project.type,
      desc: desc ?? project.desc,
      github: github ?? project.github,
      points: points ?? project.points,
      tech: tech ?? project.tech,
      img,
    };

    // 5. Update in DB
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      data: updatedProject,
    });

  } catch (error) {
    console.log("Error in updateProject:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find project
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // 2. Delete from DB
    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.log("Error in deleteProject:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAllProject = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });

  } catch (error) {
    console.log("Error in getAllProject:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });

  } catch (error) {
    console.log("Error in getProjectById:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};