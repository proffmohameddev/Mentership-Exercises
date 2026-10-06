import multer from "multer";
import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

export const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
};

// Express knows this is an error handler because it has 4 params
export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Something went wrong";

  if (err instanceof ZodError) {
    status = 400;
    message = err.issues
      .map((i) => `${i.path.filter((p) => p !== "body").join(".")}: ${i.message}`)
      .join(", ");
  } else if (err instanceof multer.MulterError) {
    status = 400;
    message =
      err.code === "LIMIT_FILE_SIZE" ? "Image is too big (max 2MB)" : err.message;
  } else if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    status = 401;
    message = "Invalid or expired token, please log in again";
  } else if (err.name === "CastError") {
    status = 400;
    message = `Invalid ${err.path}`;
  } else if (err.code === 11000) {
    status = 400;
    message = "That value is already in use";
  }

  if (status === 500) console.error(err);

  res.status(status).json({ success: false, message, status });
};
