import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

// keep the file in memory, then send the buffer to Cloudinary
export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) return cb(null, true);
    cb(new ApiError(400, "Only image files are allowed"));
  },
});
