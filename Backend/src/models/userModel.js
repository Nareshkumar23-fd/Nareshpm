import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, true: true },
    email: { type: String, unique: true, lowercase: true, required: true, trim: true },
    password: { type: String, minLen: 6, required: true },
    contact : {type : String},
    role : {type : String, enum: ["superadmin", "user"], default: "user", required: true}

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;