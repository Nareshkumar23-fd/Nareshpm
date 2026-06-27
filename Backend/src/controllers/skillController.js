import Skill from "../models/skillModel.js";
import mongoose from "mongoose";

export const createSkill = async (req, res) => {
    try {
        const { skillName, percentage, comments } = req.body;

        // ================= VALIDATION =================
        if (!skillName || percentage === undefined) {
            return res.status(400).json({
                success: false,
                message: "Skill name and percentage are required",
            });
        }

        // percentage validation (0 - 100)
        if (percentage < 0 || percentage > 100) {
            return res.status(400).json({
                success: false,
                message: "Percentage must be between 0 and 100",
            });
        }

        // ================= DUPLICATE CHECK =================
        const existingSkill = await Skill.findOne({
            skillName: skillName.trim(),
        });

        if (existingSkill) {
            return res.status(400).json({
                success: false,
                message: "Skill already exists",
            });
        }

        // ================= CREATE SKILL =================
        const newSkill = await Skill.create({
            skillName: skillName.trim(),
            percentage,
            comments: comments || "",
        });

        return res.status(201).json({
            success: true,
            message: "Skill created successfully",
            skill: newSkill,
        });
    } catch (error) {
        console.log("error in the createSkill controller", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        const { skillName, percentage, comments } = req.body;

        // ================= CHECK SKILL EXISTS =================
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }

        // ================= DUPLICATE NAME CHECK =================
        if (skillName) {
            const existingSkill = await Skill.findOne({
                skillName: skillName.trim(),
                _id: { $ne: id }, // exclude current skill
            });

            if (existingSkill) {
                return res.status(400).json({
                    success: false,
                    message: "Skill name already exists",
                });
            }

            skill.skillName = skillName.trim();
        }

        // ================= UPDATE FIELDS =================
        if (percentage !== undefined) {
            if (percentage < 0 || percentage > 100) {
                return res.status(400).json({
                    success: false,
                    message: "Percentage must be between 0 and 100",
                });
            }

            skill.percentage = percentage;
        }

        if (comments !== undefined) {
            skill.comments = comments;
        }

        // ================= SAVE =================
        const updatedSkill = await skill.save();

        return res.status(200).json({
            success: true,
            message: "Skill updated successfully",
            skill: updatedSkill,
        });
    } catch (error) {
        console.log("error in the updateSkill controller", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;

        // ================= CHECK IF SKILL EXISTS =================
        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }

        // ================= DELETE SKILL =================
        await Skill.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Skill deleted successfully",
        });
    } catch (error) {
        console.log("error in the deleteSkill controller", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllSkill = async (req, res) => {
    try {
        // ================= FETCH ALL SKILLS =================
        const skills = await Skill.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: skills.length,
            skills,
        });
    } catch (error) {
        console.log("error in the getAllSkill controller", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSkillById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid skill id",
            });
        }

        const skill = await Skill.findById(id);

        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found",
            });
        }

        return res.status(200).json({
            success: true,
            skill,
        });
    } catch (error) {
        console.log("error in the getSkillById controller", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
