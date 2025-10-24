import CustomError from "../utilities/customError.js";

const devErrors = (error, res) => {
   res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
      stackTrace: error.stack,
      error,
   });
};

// const castErrorHandler = (err) => {
//    const msg = `Invalid value ${err.value} for field ${err.path}`;
//    return new CustomError(msg, 400);
// };

const duplicateKeyErrorHandler = (error) => {
   const errorData = error.cause?.errorResponse || error;
  
   if (!errorData.keyValue) {
     return new CustomError("Duplicate key error, but no keyValue found", 400);
   }
 
   const key = Object.keys(errorData.keyValue)[0];  
   const field = key.includes(".") ? key.split(".")[1] : key;
   const value = errorData.keyValue[key];
 
   const msg = `There is already a user with this ${field}: ${value}`;
   return new CustomError(msg, 400);
};


const prodErrors = (error, res) => {
    if (error.isOperational) {
      res.status(error.statusCode).json({
         status: error.statusCode,
         message: error.message,
      });
   } else {
      res.status(500).json({
         status: "error",
         message: "Something went wrong! please try again later!",
      });
   }
};

const errorController = (error, req, res, next) => {
   error.statusCode = error.statusCode || 500;
   error.status = error.status || "error";

   if (process.env.NODE_ENV === "development") {
      devErrors(error, res);
   } else if (process.env.NODE_ENV === "production") {
      
      // if (error?.name === "CastError") error = castErrorHandler(error);
      if (error?.errorResponse?.code === 11000) error = duplicateKeyErrorHandler(error);

      prodErrors(error, res);
   }
};

export default errorController;