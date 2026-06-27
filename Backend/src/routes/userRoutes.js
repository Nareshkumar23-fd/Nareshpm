import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.put("/update/:id", updateUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;
