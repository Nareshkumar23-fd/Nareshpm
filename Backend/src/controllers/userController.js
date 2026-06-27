import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../lib/generateToken.js";

export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, contact } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required",
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role || "user",
            contact,
        });

        // 🔐 Generate token
        const token = generateToken(newUser._id);

        // 🍪 Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
            token, 
        });
    } catch (error) {
        console.log("Error in createUser Controller:", error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role, contact } = req.body;

    // 1. Check user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Update fields only if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (role) user.role = role;
    if (contact) user.contact = contact;

    // 3. If password is updated → hash it
    if (password) {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: "Password must be at least 6 characters",
        });
      }

      user.password = await bcrypt.hash(password, 10);
    }

    // 4. Save updated user
    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        contact: updatedUser.contact,
      },
    });
  } catch (error) {
    console.log("Error in updateUser Controller:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Check if user exists
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 2. Delete user
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log("Error in deleteUser Controller:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const getAllUsers = async (req, res) => {
  try {

    const users = await User.find().select("-password"); 

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
      totalUsers: users.length
    });

  } catch (error) {
    console.log("Error in getAllUsers Controller:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find user by ID
    const user = await User.findById(id).select("-password");

    // 2. Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Return user
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });

  } catch (error) {
    console.log("Error in getUserById Controller:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





