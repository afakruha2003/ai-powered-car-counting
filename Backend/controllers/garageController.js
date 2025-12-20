import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";
import Garage from "../models/garageModel.js";

export const createGarage = asyncHandler(async (req, res) => {
   const garage = await Garage.create(req.body);
   res.status(201).json(garage);
});

export const updateGarage = asyncHandler(async (req, res) => {
   const garage = await Garage.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.json(garage);
});

export const getGarage = asyncHandler(async (req, res) => {
   const garage = await Garage.findById(req.params.id);
   if (!garage) {
      throw new CustomError("Garage not found", 404);
   }
   res.json(garage);
});
