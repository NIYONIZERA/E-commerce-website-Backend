import express from "express"
const userRoute=express.Router();
import userController from "../controllers/userController.js";
import {registerUserValidations,loginUserValidations} from "../utils/validation.js"

userRoute.post("/register",registerUserValidations,userController.registerUser);
userRoute.post("/login",loginUserValidations,userController.loginUser);

export default userRoute;