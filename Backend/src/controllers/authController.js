import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/generateToken.js";

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        // Check user
        const checkUser = await User.findOne({ email });

        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            checkUser.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Generate JWT
        const token = generateToken(checkUser._id);

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: checkUser._id,
                name: checkUser.name,
                email: checkUser.email,
                role : checkUser.role
            },
        });
    } catch (error) {
        console.log("Error in Login Controller:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        console.log("Error in Logout Controller:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};