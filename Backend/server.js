import express from "express";
const app = express();
import dotenv from "dotenv";
import garageRoutes from "./routes/garageRoutes.js";
import cameraRoutes from "./routes/liveStateRoutes.js";
import statisticsRoutes from "./routes/statusRouts.js";
import liveRoutes from "./routes/liveStateRoutes.js";
import systemRoutes from "./routes/systemStatusRoutes.js";
import errorController from "./controllers/errorController.js";
import connectDB from "./config/connectDB.js";

dotenv.config();
connectDB();

app.use("/api/garages", garageRoutes);
app.use("/api/camera", cameraRoutes);
app.use("/api/statistics", statisticsRoutes);
app.use("/api/live", liveRoutes);
app.use("/api/system", systemRoutes);
app.use(errorController);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});
