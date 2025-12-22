import GarageLiveState from "../models/garageLiveStateModel";
import Garage from "../models/garageModel";
import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError";

export const getLiveState = asyncHandler(async (req, res) => {
   const garageId = req.params.garageId;

   const garage = await Garage.findById(garageId);
   if (!garage) {
      throw new CustomError("Garage not found", 404);
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
