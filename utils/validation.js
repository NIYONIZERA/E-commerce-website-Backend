import {body} from "express-validator"

export const addProductValidator=[
    body("name","product name is required").notEmpty().isString(),
    body("price","product price is required").notEmpty().isNumeric(),
    
];
export const registerUserValidations = [
   
    body("userName", "User name  is required").not().isEmpty(),
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Password should contain atleast 8 characters, uppercase and lower case letters, numbers, and symbols").isStrongPassword()
];

export const loginUserValidations = [
    body("email", "Email is required").not().isEmpty(),
    body("email", "Invalid email").isEmail(),
    body("password", "Password is required").not().isEmpty(),
    body("password", "Invalid password").isStrongPassword()
];
