import GarageLiveState from "../models/garageLiveStateModel.js";
import Garage from "../models/garageModel.js";
import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";

export const getLiveState = asyncHandler(async (req, res) => {
   const garageId = req.params.garageId;

   const garage = await Garage.findOne({
      _id: garageId,
      owner: req.user._id,
   });

   if (!garage) {
      throw new CustomError("Garage not found or not authorized", 404);
   }

   const liveState = await GarageLiveState.findOne({ garage: garageId });

   const currentCars = liveState?.currentCars || 0;

   res.json({
      currentCars,
      availableSpots: garage.capacity - currentCars,
      occupancyRate: garage.capacity > 0 ? (currentCars / garage.capacity) * 100 : 0,
      lastUpdate: liveState?.lastEventAt || null,
   });
});
