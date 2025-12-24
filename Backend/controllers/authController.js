import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Garage from "../models/garageModel.js";
import CustomError from "../utilities/customError.js";
import crypto from "crypto";

const generateToken = (id) => {
   const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
   if (!secret) throw new Error("ACCESS_TOKEN_SECRET (or JWT_SECRET) is not defined");
   return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export const register = asyncHandler(async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || typeof name !== "string" || name.trim().length < 2) {
      throw new CustomError("Name is required and must be at least 2 characters", 400);
   }

   if (!email || typeof email !== "string") {
      throw new CustomError("Email is required", 400);
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
      throw new CustomError("Invalid email format (example@gmail.com)", 400);
   }

   if (!password || typeof password !== "string" || password.length < 6) {
      throw new CustomError("Password must be at least 6 characters", 400);
   }

   const userExists = await User.findOne({ email });
   if (userExists) {
      throw new CustomError("User already exists", 400);
   }

   const user = await User.create({ name, email, password });

   const garage = await Garage.create({
      owner: user._id,
      name: `${name}'s Garage`,
      capacity: 0,
      pricePerHour: 0,
      uniqueCameraId: crypto.randomUUID(),
   });

   const token = generateToken(user._id);
   const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
   };

   res.cookie("accessToken", token, cookieOptions);
   res.status(201).json({
      user: {
         _id: user._id,
         name: user.name,
         email: user.email,
      },
      garage: {
         _id: garage._id,
         name: garage.name,
         uniqueCameraId: garage.uniqueCameraId,
      },
   });
});

export const login = asyncHandler(async (req, res) => {
   const { email, password } = req.body;

   const user = await User.findOne({ email });
   if (!user || !(await user.matchPassword(password))) {
      throw new CustomError("Invalid email or password", 401);
   }

   const token = generateToken(user._id);
   const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
   };
   res.cookie("accessToken", token, cookieOptions);
   res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
   });
});
