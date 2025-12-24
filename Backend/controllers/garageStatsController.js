import GarageStats from "../models/garageStatsModel.js";
import Garage from "../models/garageModel.js";
import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";

export const getStats = asyncHandler(async (req, res) => {
   const { garageId } = req.params;
   let { bucketType, from, to } = req.body;

   const garage = await Garage.findOne({
      _id: garageId,
      owner: req.user._id,
   });

   if (!garage) {
      throw new CustomError("Garage not found or not authorized", 404);
   }

   const allowedBuckets = ["HOUR", "DAY", "WEEK"];

   if (!allowedBuckets.includes(bucketType)) {
      throw new CustomError("Invalid bucket type", 400);
   }

   if (bucketType === "HOUR") {
      const now = new Date();
      const dayStart = new Date(now);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(now);
      dayEnd.setHours(23, 59, 59, 999);

      if (!from) from = dayStart.toISOString();
      if (!to) to = dayEnd.toISOString();
   }

   const stats = await GarageStats.find({
      garage: garageId,
      bucketType,
      bucketStart: {
         $gte: new Date(from),
         $lte: new Date(to),
      },
   }).sort({ bucketStart: 1 });

   res.json(stats);
});
