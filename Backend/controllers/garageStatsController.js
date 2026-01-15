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
      throw new CustomError("Invalid bucket type. Allowed: HOUR, DAY, WEEK", 400);
   }

   const now = new Date();

   // Set default date ranges based on bucket type
   if (bucketType === "HOUR") {
      // Default to today
      const dayStart = new Date(now);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(now);
      dayEnd.setHours(23, 59, 59, 999);

      if (!from) from = dayStart.toISOString();
      if (!to) to = dayEnd.toISOString();
   } else if (bucketType === "DAY") {
      // Default to current week (Sunday to Saturday)
      if (!from || !to) {
         const weekStart = new Date(now);
         weekStart.setDate(now.getDate() - now.getDay());
         weekStart.setHours(0, 0, 0, 0);
         
         const weekEnd = new Date(weekStart);
         weekEnd.setDate(weekStart.getDate() + 6);
         weekEnd.setHours(23, 59, 59, 999);

         if (!from) from = weekStart.toISOString();
         if (!to) to = weekEnd.toISOString();
      }
   } else if (bucketType === "WEEK") {
      // Default to current month
      if (!from || !to) {
         const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
         monthStart.setHours(0, 0, 0, 0);
         
         const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
         monthEnd.setHours(23, 59, 59, 999);

         if (!from) from = monthStart.toISOString();
         if (!to) to = monthEnd.toISOString();
      }
   }

   // Validate date range
   const fromDate = new Date(from);
   const toDate = new Date(to);
   
   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new CustomError("Invalid date format", 400);
   }
   
   if (fromDate > toDate) {
      throw new CustomError("'from' date must be before 'to' date", 400);
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
