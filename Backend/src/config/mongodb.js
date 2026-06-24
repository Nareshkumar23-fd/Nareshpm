import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.log("Error in the connectDB Function", error);
        process.exit(1);
    }
}

export default connectDB;