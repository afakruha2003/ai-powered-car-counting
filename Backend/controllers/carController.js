import asyncHandler from "express-async-handler";
import CustomError from "../utilities/customError.js";

export const printMsg = asyncHandler(async (req, res) => {
   if (1 == 1) throw new CustomError("this error from print function", 404);
   res.status(200).json({
      success: true,
      location: "from car controller",
   });
});
