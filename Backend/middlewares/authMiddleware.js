import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import CustomError from "../utilities/customError.js";

export const protect = asyncHandler(async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
   }

   // prefer cookie token if present
   if (!token && req.cookies && (req.cookies.accessToken || req.cookies.token)) {
      token = req.cookies.accessToken || req.cookies.token;
   }
   if (!token) {
      throw new CustomError("Not authorized", 401);
   }

   let decoded;
   try {
      const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;
      if (!secret) throw new Error("ACCESS_TOKEN_SECRET (or JWT_SECRET) not set");
      decoded = jwt.verify(token, secret);
   } catch (err) {
      throw new CustomError("Not authorized", 401);
   }

   req.user = await User.findById(decoded.id).select("-password");
   if (!req.user) {
      throw new CustomError("Not authorized", 401);
   }

   next();
});
