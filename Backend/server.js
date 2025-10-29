import express from "express";
const app = express();
import dotenv from "dotenv";
import counterRouter from "./routes/counterRoutes.js";
import errorController from "./controllers/errorController.js";
import connectDB from "./config/connectDB.js";
import initCounter from "./config/initCounter.js";

dotenv.config();
connectDB();
initCounter();

app.use("/api/counter", counterRouter);
app.use(errorController);

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
   console.log(`Server running on port: ${PORT}`);
});
