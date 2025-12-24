import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";
import Garage from "../models/garageModel.js";

export const createGarage = asyncHandler(async (req, res) => {
   const garage = await Garage.create({
      ...req.body,
      owner: req.user._id,
   });
   res.status(201).json(garage);
});

export const updateGarage = asyncHandler(async (req, res) => {
   const allowedUpdates = {
      name: req.body.name ,
      capacity: req.body.capacity ,
      pricePerHour: req.body.pricePerHour,
   };

   const garage = await Garage.findOneAndUpdate({ _id: req.params.id, owner: req.user._id }, allowedUpdates, { new: true });


   if (!garage) {
      throw new CustomError("Garage not found or not authorized", 404);
   }

   res.json(garage);
});

export const getGarage = asyncHandler(async (req, res) => {
   if (!req.user) {
      throw new CustomError("Not authenticated", 401);
   }

   const garage = await Garage.findOne({
      _id: req.params.id,
      owner: req.user._id,
   });

   if (!garage) {
      throw new CustomError("Garage not found or not authorized", 404);
   }

   res.json(garage);
});

export const getMyGarages = asyncHandler(async (req, res) => {
   if (!req.user) {
      throw new CustomError("Not authenticated", 401);
   }

   const garages = await Garage.find({ owner: req.user._id });
   res.json({ count: garages.length, garages });
});
