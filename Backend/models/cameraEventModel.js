import mongoose from "mongoose";

const cameraEventSchema = new mongoose.Schema(
   {
     garage: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Garage",
       required: true,
     },
 
     incoming: {
       type: Number,
       required: true,
       min: 0,
     },
 
     outgoing: {
       type: Number,
       required: true,
       min: 0,
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
