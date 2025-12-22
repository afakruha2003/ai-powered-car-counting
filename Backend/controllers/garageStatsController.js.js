import GarageStats from "../models/garageStatsModel";
import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError";

export const getStats = asyncHandler(async (req, res) => {
   const { garageId } = req.params;
   const { bucketType, from, to } = req.query;

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
