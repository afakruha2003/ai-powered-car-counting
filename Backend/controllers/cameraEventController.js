import Garage from "../models/garageModel";
import CameraEvent from "../models/cameraEventModel";
import GarageLiveState from "../models/garageLiveStateModel";
import GarageStats from "../models/garageStatsModel";

exports.receiveCameraData = async (req, res) => {
   const { cameraId, incoming, outgoing } = req.body;

   const garage = await Garage.findOne({ uniqueCameraId: cameraId });

   if (!garage) {
      throw new CustomEvent("garage not found", 404);
   }

   const timestamp = new Date();

   let liveState = await GarageLiveState.findOne({ garage: garage._id });

   if (!liveState) {
      await GarageLiveState.create({
         garage: garage._id,
         currentCars: 0,
         lastIncomingCount: incoming,
         lastOutgoingCount: outgoing,
         lastEventAt: timestamp,
      });

      return res.json({
         success: true,
         initialized: true,
      });
   }

   let deltaIncoming = incoming - liveState.lastIncomingCount;
   let deltaOutgoing = outgoing - liveState.lastOutgoingCount;

   if (deltaIncoming < 0 || deltaOutgoing < 0) {
      liveState.lastIncomingCount = incoming;
      liveState.lastOutgoingCount = outgoing;
      liveState.lastEventAt = timestamp;
      await liveState.save();

      return res.json({
         success: true,
         resetDetected: true,
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

   const bucketStart = new Date(timestamp);
   bucketStart.setMinutes(0, 0, 0);

   await GarageStats.findOneAndUpdate(
      {
         garage: garage._id,
         bucketType: "HOUR",
         bucketStart,
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

   res.json({
      success: true,
      deltaIncoming,
      deltaOutgoing,
      currentCars: liveState.currentCars,
   });
};
