import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
    skillName : {type: String, trim: true},
    percentage : {type: String, trim: true},
    comments : {type: String, trim: true},
}, {timestamps: true});

const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default Skill;