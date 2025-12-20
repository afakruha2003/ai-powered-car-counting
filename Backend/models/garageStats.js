import mongoose from "mongoose";

const garageStatsSchema = new mongoose.Schema(
   {
      garage: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Garage",
         required: true,
      },

      bucketType: {
         type: String,
         enum: ["HOUR", "DAY", "WEEK"],
         required: true,
      },

      bucketStart: {
         type: Date,
         required: true,
      },

      entries: {
         type: Number,
         default: 0,
      },

      exits: {
         type: Number,
         default: 0,
      },

      estimatedRevenue: {
         type: Number,
         default: 0,
      },
   },
   { timestamps: true }
);

garageStatsSchema.index({ garage: 1, bucketType: 1, bucketStart: 1 }, { unique: true });

const GarageStats = mongoose.model("GarageStats", garageStatsSchema);

export default GarageStats;
