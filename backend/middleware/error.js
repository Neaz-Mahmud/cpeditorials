import logger from "../utils/logger";
const errorHandler = (err, req, res, next) => {
  // Log the full error for developers (always — even in production, logs
  // should capture everything for debugging)
  logger.error(`${err.name}: ${err.message}`);
  if (process.env.NODE_ENV === "development") {
    logger.error(err.stack);
  }

  // Default values for unexpected errors
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let errors = err.errors || [];

  // --- Handle specific error types ---

  // Mongoose validation errors (e.g. required field missing)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // Mongoose duplicate key error (e.g. unique email already exists)
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue)[0];
    message = `${field} already exists`;
  }

  // Mongoose bad ObjectId (e.g. /posts/not-a-valid-id)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // Send the consistent error response shape
  res.status(statusCode).json({
    success: false,
    message,
    errors,
    // Only include stack trace in development for debugging
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export default errorHandler;
