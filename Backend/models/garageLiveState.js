import mongoose from "mongoose";

const garageLiveStateSchema = new mongoose.Schema(
   {
      garage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Garage",
         unique: true,
         required: true,
      },

      currentCars: {
         type: Number,
         default: 0,
      },

      lastEventAt: {
         type: Date,
      },
   },
   { timestamps: true }
);

const GarageLiveState = mongoose.model("GarageLiveState", garageLiveStateSchema);

export default GarageLiveState;
