import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import  jwt from "jsonwebtoken"

const userController={
 registerUser : async (req, res) => {
    try {
      const { username, email, password } = req.body;
      // Check if user already exists
      let user = await userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }
      // Create new user
      user = new userModel({ username, email, password });
      // Hash password
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(password, salt);
      await user.save();
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
},

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
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
}
export default userController;
