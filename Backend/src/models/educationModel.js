import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    institute: { type: String, required: true },
    score: { type: String, required: true },
    desc: { type: String }
}, { timestamps: true });

const Education = mongoose.models.Education || mongoose.model("Education", educationSchema);

export default Education;


