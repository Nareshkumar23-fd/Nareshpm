import Experience from "../models/experienceModel.js";

export const createExperience = async (req, res) => {
  try {
    const { company, role, desc, points, tech } = req.body;

    // ================= VALIDATION =================
    if (!company || !role || !desc) {
      return res.status(400).json({
        success: false,
        message: "Company, role, and description are required!",
      });
    }

    if (!Array.isArray(points) || points.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Points must be a non-empty array!",
      });
    }

    if (!Array.isArray(tech) || tech.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Tech must be a non-empty array!",
      });
    }

    // ================= CREATE =================
    const experience = await Experience.create({
      company,
      role,
      desc,
      points,
      tech,
    });

    return res.status(201).json({
      success: true,
      message: "Experience created successfully!",
      experience,
    });
  } catch (error) {
    console.error("Create Experience Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, role, desc, points, tech } = req.body;

    // ================= CHECK IF EXISTS =================
    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found!",
      });
    }

    // ================= VALIDATION =================
    if (company) experience.company = company;
    if (role) experience.role = role;
    if (desc) experience.desc = desc;

    if (points) {
      if (!Array.isArray(points)) {
        return res.status(400).json({
          success: false,
          message: "Points must be an array!",
        });
      }
      experience.points = points;
    }

    if (tech) {
      if (!Array.isArray(tech)) {
        return res.status(400).json({
          success: false,
          message: "Tech must be an array!",
        });
      }
      experience.tech = tech;
    }

    // ================= SAVE =================
    await experience.save();

    return res.status(200).json({
      success: true,
      message: "Experience updated successfully!",
      experience,
    });
  } catch (error) {
    console.error("Update Experience Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found!",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Experience deleted successfully!",
    });
  } catch (error) {
    console.error("Delete Experience Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getAllExperience = async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    console.error("Get All Experience Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found!",
      });
    }

    return res.status(200).json({
      success: true,
      experience,
    });
  } catch (error) {
    console.error("Get Experience By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};