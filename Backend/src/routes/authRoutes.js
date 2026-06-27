import express from "express";
import { login, logout } from "../controllers/authController.js";

const AuthRouter = express.Router();

AuthRouter.post("/login", login);
AuthRouter.post("/logout", logout);

export default AuthRouter;