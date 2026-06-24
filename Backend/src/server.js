import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:
    "http://localhost:3001",
    credentials: true
}));


app.get("/", (req, res) => res.status(200).send("Hello Express!"));

app.listen(PORT, () => console.log(`server is running in http://localhost:${PORT}`))
