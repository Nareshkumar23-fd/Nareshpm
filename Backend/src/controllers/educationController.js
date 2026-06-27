import Education from "../models/educationModel.js";

export const createEducation = async (req, res) => {
  try {
    const { title, institute, score, desc } = req.body;

    // Validation
    if (!title || !institute || score === undefined) {
      return res.status(400).json({
        success: false,
        message: "Title, institute and score are required.",
      });
    }

    // Create education
    const education = await Education.create({
      title,
      institute,
      score,
      desc,
    });

    return res.status(201).json({
      success: true,
      message: "Education created successfully.",
      education,
    });
  } catch (error) {
    console.error("Create Education Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, institute, score, desc } = req.body;

    // Check if education exists
    const education = await Education.findById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    // Update fields (only if provided)
    education.title = title ?? education.title;
    education.institute = institute ?? education.institute;
    education.score = score ?? education.score;
    education.desc = desc ?? education.desc;

    await education.save();

    return res.status(200).json({
      success: true,
      message: "Education updated successfully.",
      education,
    });
  } catch (error) {
    console.error("Update Education Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Education deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Education Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getAllEducation = async (req, res) => {
  try {
    const educations = await Education.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: educations.length,
      educations,
    });
  } catch (error) {
    console.error("Get All Education Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getEducationById = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findById(id);

    if (!education) {
      return res.status(404).json({
        success: false,
        message: "Education not found.",
      });
    }

    return res.status(200).json({
      success: true,
      education,
    });
  } catch (error) {
    console.error("Get Education By ID Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};