import { Request,Response } from "express";
import UserModel from "../models/usermodule";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const signup =async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user already exists
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ error: "User already exists login directly" });
      }
  
      // Hash the password
      const hash = await bcrypt.hash(password, 10);
      const user = new UserModel({ email, password: hash });
      await user.save();
  
      res.status(201).json({
        message: 'Signup successful',
        email: user.email,
        password:req.body.password,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error saving user data', error: err.message });
    }
  }



  export const login=async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      // Find the user by email
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({
          message: "Email not found. Check your email or register if you don't have an account",
        });
      }
  
      // Compare the password
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return res.status(400).json({
          message: "Passwords do not match",
        });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, userEmail: user.email },
        "RANDOM-TOKEN",
        { expiresIn: "2h" }
      );
  
      res.status(200).json({
        message: "Login Successful",
        email: user.email,
        token,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Something went wrong",
        error: error.message,
      });
    }
  }