import mongoose from "mongoose";

const connectDB = async () => {
   mongoose.connection.on("connected", () => {
      console.log(`database connected on: ${mongoose.connection.name}`);
   });

   await mongoose.connect(process.env.DB_CONN_STR);
};

export default connectDB;