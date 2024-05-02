import express from "express"
const userRoute=express.Router();
import userController from "../controllers/userController.js";
import {registerUserValidations,loginUserValidations} from "../utils/validation.js"

userRoute.post("/register",registerUserValidations,userController.registerUser);
userRoute.post("/login",loginUserValidations,userController.loginUser);
userRoute.post("/verify",userController.ValidateOpt)

export default userRoute;