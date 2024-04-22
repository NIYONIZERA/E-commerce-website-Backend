import express from "express"
const userRoute=express.Router();
import userController from "../controllers/userController.js";


userRoute.post("/register",userController.registerUser);
userRoute.post("/login",userController.loginUser);

export default userRoute;