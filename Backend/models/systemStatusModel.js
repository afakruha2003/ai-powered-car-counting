import mongoose from "mongoose";

const systemStatusSchema = new mongoose.Schema(
   {
      garage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Garage",
         unique: true,
         required: true,
      },

      aiCameraOnline: { type: Boolean, default: false },

      lastCameraPing: { type: Date },
   },
   { timestamps: true }
);

const systemStatus = mongoose.model("SystemStatus", systemStatusSchema);

export default systemStatus;
