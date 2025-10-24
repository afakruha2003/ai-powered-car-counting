import asyncHandler from "express-async-handler";

export const printMsg = asyncHandler(async (req, res) => {
   res.status(200).json({
      success: true,
      location: "from car controller",
   });
});
