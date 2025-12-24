import SystemStatus from "../models/systemStatusModel.js";
import aysncHandler from "express-async-handler";

export const updateCameraPing = aysncHandler(async (req, res) => {
   const { garageId } = req.body;

   await SystemStatus.findOneAndUpdate(
      { garage: garageId },
      {
         aiCameraOnline: true,
         lastCameraPing: new Date(),
      },
      { upsert: true }
   );

   res.json({ status: "ok" });
});

export const getSystemStatus = aysncHandler(async (req, res) => {
   const status = await SystemStatus.findOne({
      garage: req.params.garageId,
   });

   res.json(status);
});
