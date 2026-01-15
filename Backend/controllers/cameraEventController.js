import Garage from "../models/garageModel.js";
import CameraEvent from "../models/cameraEventModel.js";
import GarageLiveState from "../models/garageLiveStateModel.js";
import GarageStats from "../models/garageStatsModel.js";
import SystemStatus from "../models/systemStatusModel.js";
import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.js";

export const receiveCameraData = asyncHandler(async (req, res) => {
   const { cameraId, incoming, outgoing } = req.body;

   const garage = await Garage.findOne({ uniqueCameraId: cameraId });

   if (!garage) {
      throw new CustomError("garage not found", 404);
   }

   const timestamp = new Date();

   let liveState = await GarageLiveState.findOne({ garage: garage._id });

   if (!liveState) {
      liveState = await GarageLiveState.create({
         garage: garage._id,
         owner: garage.owner,
         currentCars: 0,
         lastIncomingCount: 0,
         lastOutgoingCount: 0,
         lastEventAt: timestamp,
      });
   }

   let deltaIncoming = incoming - liveState.lastIncomingCount;
   let deltaOutgoing = outgoing - liveState.lastOutgoingCount;

   // Handle camera reset (counters went back to 0 or decreased)
   if (deltaIncoming < 0 || deltaOutgoing < 0) {
      // Camera has reset its counters, update baseline without changing currentCars
      liveState.lastIncomingCount = incoming;
      liveState.lastOutgoingCount = outgoing;
      liveState.lastEventAt = timestamp;
      await liveState.save();

      return res.json({
         success: true,
         resetDetected: true,
         message: 'Camera counter reset detected, baseline updated',
         currentCars: liveState.currentCars,
      });
   }

   const delta = deltaIncoming - deltaOutgoing;

   liveState.currentCars += delta;

   if (liveState.currentCars < 0) liveState.currentCars = 0;
   if (liveState.currentCars > garage.capacity) liveState.currentCars = garage.capacity;

   liveState.lastIncomingCount = incoming;
   liveState.lastOutgoingCount = outgoing;
   liveState.lastEventAt = timestamp;

   await liveState.save();

   await CameraEvent.create({
      garage: garage._id,
      incoming: deltaIncoming,
      outgoing: deltaOutgoing,
      timestamp,
   });

   // Update HOUR bucket
   const hourBucketStart = new Date(timestamp);
   hourBucketStart.setMinutes(0, 0, 0);

   await GarageStats.findOneAndUpdate(
      {
         garage: garage._id,
         bucketType: "HOUR",
         bucketStart: hourBucketStart,
      },
      {
         $inc: {
            entries: deltaIncoming,
            exits: deltaOutgoing,
            estimatedRevenue: deltaIncoming * garage.pricePerHour,
         },
      },
      { upsert: true }
   );

   // Update DAY bucket
   const dayBucketStart = new Date(timestamp);
   dayBucketStart.setHours(0, 0, 0, 0);

   await GarageStats.findOneAndUpdate(
      {
         garage: garage._id,
         bucketType: "DAY",
         bucketStart: dayBucketStart,
      },
      {
         $inc: {
            entries: deltaIncoming,
            exits: deltaOutgoing,
            estimatedRevenue: deltaIncoming * garage.pricePerHour,
         },
      },
      { upsert: true }
   );

   // Update WEEK bucket (week starts on Sunday)
   const weekBucketStart = new Date(timestamp);
   weekBucketStart.setDate(weekBucketStart.getDate() - weekBucketStart.getDay());
   weekBucketStart.setHours(0, 0, 0, 0);

   await GarageStats.findOneAndUpdate(
      {
         garage: garage._id,
         bucketType: "WEEK",
         bucketStart: weekBucketStart,
      },
      {
         $inc: {
            entries: deltaIncoming,
            exits: deltaOutgoing,
            estimatedRevenue: deltaIncoming * garage.pricePerHour,
         },
      },
      { upsert: true }
   );

   // Update system status to mark camera as online
   await SystemStatus.findOneAndUpdate(
      { garage: garage._id },
      {
         aiCameraOnline: true,
         lastCameraPing: timestamp,
      },
      { upsert: true }
   );

   res.json({
      success: true,
      deltaIncoming,
      deltaOutgoing,
      currentCars: liveState.currentCars,
   });
});
