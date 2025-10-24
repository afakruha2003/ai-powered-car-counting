import express from "express";
const app = express();
import dotenv from "dotenv"
import carRouter from "./routes/carRoutes.js"
import errorController from "./controllers/errorController.js"

dotenv.config()

app.use("/api", carRouter)
app.use(errorController)


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
