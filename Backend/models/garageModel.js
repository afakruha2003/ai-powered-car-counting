import mongoose from "mongoose";

const garageSchema = new mongoose.Schema(
   {
      name: { type: String, required: true },

      capacity: { type: Number, required: true },

      pricePerHour: { type: Number, required: true },

      currency: { type: String, default: "TRY" },

      uniqueCameraId: { type: String, required: true, unique: true },

      isActive: { type: Boolean, default: true },
   },
   { timestamps: true }
);

const Garage = mongoose.model("Garage", garageSchema);

export default Garage;
