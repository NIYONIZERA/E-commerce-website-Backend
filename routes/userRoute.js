import express from "express"
const userRoute=express.Router();
import userController from "../controllers/userController.js";
import {registerUserValidations,loginUserValidations,forgotpasswordValidation,resetPasswordValidation} from "../utils/validation.js"

userRoute.post("/register",registerUserValidations,userController.registerUser);
userRoute.post("/login",loginUserValidations,userController.loginUser);
userRoute.post("/verify",userController.ValidateOpt)
userRoute.post("/forgot",forgotpasswordValidation,userController.ForgotPassword);
userRoute.post("/reset",resetPasswordValidation,userController.ResetPassword);

export default userRoute;