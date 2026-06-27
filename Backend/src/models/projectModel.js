import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      required: true,
      trim: true,
    },

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

    github: {
      type: String,
      required: true,
      trim: true,
    },

    img: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default Project;