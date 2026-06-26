import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

dotenv.config();

const seedNaresh = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected");

    const existingUser = await User.findOne({
      email: process.env.SUPERADMIN_EMAIL,
    });

    if (existingUser) {
      console.log("⚠️ Superadmin already exists");
      process.exit();
    }

    const hashPassword = await bcrypt.hash(
      process.env.SUPERADMIN_PASSWORD,
      10
    );

    const user = await User.create({
      name: process.env.SUPERADMIN_NAME,
      email: process.env.SUPERADMIN_EMAIL,
      password: hashPassword,
      contact: process.env.SUPERADMIN_CONTACT,
      role: "superadmin",
    });

    console.log("✅ Seeded Superadmin:", user.email);

    process.exit();
  } catch (error) {
    console.log("❌ Seed Error:", error.message);
    process.exit(1);
  }
};

seedNaresh();