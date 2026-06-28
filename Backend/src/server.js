import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongodb.js";

import AuthRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import skillRouter from "./routes/skillRoutes.js";
import educationRouter from "./routes/educationRoutes.js";
import experienceRouter from "./routes/experienceRoutes.js";
import projectRouter from "./routes/projectroutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

connectDB();

app.use(express.json());
app.use(cookieParser())
const allowedOrigins = [
    "http://localhost:3001",
    "https://nareshpm.vercel.app",
];

app.use(
    cors({
        origin: (origin, callback) => {
            if (
                !origin ||
                allowedOrigins.includes(origin) ||
                origin.endsWith(".vercel.app")
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);


app.use("/api/auth", AuthRouter);
app.use("/api/users", userRouter);
app.use("/api/skills", skillRouter);
app.use("/api/education", educationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/projects", projectRouter);

app.get("/", (req, res) => res.status(200).send("Hello Express!"));

app.listen(PORT, () => console.log(`server is running in http://localhost:${PORT}`))
