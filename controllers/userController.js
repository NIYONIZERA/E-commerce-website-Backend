import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import  jwt from "jsonwebtoken"
import { validationResult } from "express-validator";
import BadRequestError from "../errors/BadRequestError.js";
import UnauthorizedError from "../errors/unauthorized.js";
import { otpGenerator } from "../utils/otp.js";
import { sendEmail } from "../utils/sendEmail.js";

const userController={
  registerUser: async (req, res,next) => {
    const error=validationResult(req);
    if(!error.isEmpty()){
      console.log(error.array());
      return next ( new BadRequestError(error.array()[0].msg))
      
    }
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Generate OTP
      const otp = otpGenerator();

      // Create new user
      user = new userModel({ username, email, password, otp });

      // Hash password
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);

      // Save user to the database
      await user.save();

      // Send OTP email
      await sendEmail(email, "Verify your account", `Your OTP is ${otp}`);

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ message: 'User created', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
  ValidateOpt:async (req, res, next) => {
    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new BadRequestError(errors.array()[0].msg));
    }
    try{
        
    // Checking if the given opt is stored in our database
    const foundUser = await userModel.findOne({ otp: req.body.otp });
    if (!foundUser) {
        next(new UnauthorizedError('Authorization denied'));
    };

    // Checking if the otp is expired or not.
    // if (foundUser.otpExpires < new Date().getTime()) {
    //     next(new UnauthorizedError('OTP expired'));
    // }

    // Updating the user to verified
    foundUser.verified = true;
    const savedUser = await foundUser.save();

    if (savedUser) {
        return res.status(201).json({
            message: "User account verified!",
            user: savedUser
        });
    }

    }catch(err){
next(err);
    }

},

  // Login user
  loginUser : async (req, res) => {
    try {
      const { email, password } = req.body;
      // Check if user exists
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
},
ForgotPassword : async (req, res, next) => {
 

  // Find user
  const foundUser = await userModel.findOne({ email: req.body.email });
  if (!foundUser) {
      return next(new BadRequestError("Your email is not registered!"));
  };

  // Generate token
  const token = jwt.sign({ id: foundUser.id }, process.env.SECRET, { expiresIn: "15m" });

  // Recording the token to the database
  await Token.create({
      token: token,
      user: foundUser._id,
      expirationDate: new Date().getTime() + (60 * 1000 * 5),
  });

  const link = `http://localhost:8080/reset-password?token=${token}&id=${foundUser.id}`;
  const emailBody = `Click on the link bellow to reset your password\n\n${link}`;

  await sendEmail(req.body.email, "Reset your password", emailBody);

  res.status(200).json({
      message: "We sent you a reset password link on your email!",
  });
},
ResetPassword : async (req, res, next) => {
  try{
      const decoded = await jwt.verify(req.body.token, process.env.JWT_SECRET);
      if (!decoded) {
          return next(new BadRequestError("Invalid token!"));
      }
  
      const recordedToken = await Token.findOne({ token: req.body.token });
      
      if (decoded.id!= req.body.id || recordedToken.user!= req.body.id) {
          return next(new BadRequestError("Invalid token!"));
      }
  
      if (new Date(recordedToken.expirationDate).getTime() < new Date().getTime()) {
          return next(new BadRequestError("Token expired!"));
      }
  
      // Find user
      const foundUser = await UserModel.findById(req.body.id);
      if (!foundUser) {
          return next(new BadRequestError("User not found!"));
      };
  
      // Deleting the user token
      await Token.deleteOne({ token: req.body.token });
  
      // Harshing the user password
      const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  
      // Updating the user password
      foundUser.password = hashedPassword;
  
      const savedUser = await foundUser.save();
      if (savedUser) {
          return res.status(200).json({
              message: "Your password has been reset!",
          })
      }
  
  
  }catch(err){
      next(err);
  }
 

}


};

export default userController;
