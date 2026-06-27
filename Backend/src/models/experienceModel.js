import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    desc: { type: String, required: true, trim: true },

    points: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Points cannot be empty",
      },
    },

    tech: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => Array.isArray(v) && v.length > 0,
        message: "Tech cannot be empty",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Experience =
  mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default Experience;