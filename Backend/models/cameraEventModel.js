import mongoose from "mongoose";

const cameraEventSchema = new mongoose.Schema(
   {
      garage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Garage",
         required: true,
      },

      type: {
         type: String,
         enum: ["ENTER", "EXIT"],
         required: true,
      },

      timestamp: {
         type: Date,
         required: true,
      },
   },
   { timestamps: true }
);

cameraEventSchema.index({ garage: 1, timestamp: 1 });

const CameraEvent = mongoose.model("CameraEvent", cameraEventSchema);

export default CameraEvent;
