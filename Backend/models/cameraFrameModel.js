import mongoose from "mongoose";

const cameraFrameSchema = new mongoose.Schema({
   garage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garage",
      required: true,
   },
   frameData: {
      type: String,
      required: true,
   },
   timestamp: {
      type: Date,
      default: Date.now,
   },
});

cameraFrameSchema.index({ garage: 1, timestamp: -1 });

const CameraFrame = mongoose.model("CameraFrame", cameraFrameSchema);

export default CameraFrame;
