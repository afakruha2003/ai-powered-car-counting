import Garage from "../models/garageModel.js";
import CameraFrame from "../models/cameraFrameModel.js";
import SystemStatus from "../models/systemStatusModel.js";
import asyncHandler from "express-async-handler";
import CustomError from "../utils/customError.js";

export const uploadFrame = asyncHandler(async (req, res) => {
   const { cameraId } = req.body;

   if (!cameraId) {
      throw new CustomError("Camera ID is required", 400);
   }

   const garage = await Garage.findOne({ uniqueCameraId: cameraId });

   if (!garage) {
      throw new CustomError("Garage not found", 404);
   }

   if (!req.file) {
      throw new CustomError("No frame uploaded", 400);
   }

   const frameData = req.file.buffer.toString('base64');
   const timestamp = new Date();

   await CameraFrame.deleteMany({ garage: garage._id });

   await CameraFrame.create({
      garage: garage._id,
      frameData,
      timestamp,
   });

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
      message: "Frame uploaded successfully",
   });
});

export const getLatestFrame = asyncHandler(async (req, res) => {
   const { garageId } = req.params;

   const garage = await Garage.findOne({
      _id: garageId,
      owner: req.user._id,
   });

   if (!garage) {
      throw new CustomError("Garage not found or not authorized", 404);
   }

   const frame = await CameraFrame.findOne({ garage: garageId })
      .sort({ timestamp: -1 })
      .limit(1);

   if (!frame) {
      return res.json({
         success: true,
         frame: null,
      });
   }

   res.json({
      success: true,
      frame: {
         data: frame.frameData,
         timestamp: frame.timestamp,
      },
   });
});
