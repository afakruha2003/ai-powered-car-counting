import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";
import Counter from "../models/counterModel.js";

export const incrementCounter = asyncHandler(async (req, res) => {
   const { count } = req.params;

   if (!count) throw new CustomError("please provide the count !!", 400);
   if (count <= 0) throw new CustomError("the count must be count > 0 !!", 400);

   const updated = await Counter.findOneAndUpdate({ name: "carCounter" }, { $inc: { value: count } }, { new: true });

   res.status(200).json({
      success: true,
      message: "counter increment done successfully.",
      newCount: updated.value,
   });
});

export const resetCounter = asyncHandler(async (req, res) => {
   const updated = await Counter.findOneAndUpdate({ name: "carCounter" }, { $set: { value: 0 } }, { new: true });

   res.status(200).json({
      success: true,
      message: "counter resete done successfully.",
      newCount: updated.value,
   });
});

export const getCounter = asyncHandler(async (req, res) => {
   const count = await Counter.findOne({ name: "carCounter" });

   res.status(200).json({
      success: true,
      count: count.value,
   });
});
