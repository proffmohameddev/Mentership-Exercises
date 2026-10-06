import cloudinary from "../config/cloudinary.js";
import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// send the in-memory buffer to Cloudinary as a stream
const uploadToCloudinary = (buffer) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "finance-tracker/profiles", resource_type: "image" },
      (err, result) => (err ? reject(err) : resolve(result))
    );
    stream.end(buffer);
  });

// POST /upload/profile-picture  (form-data, field name: image)
export const uploadProfilePicture = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Please attach an image in the 'image' field");
  }

  const result = await uploadToCloudinary(req.file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePicture: result.secure_url },
    { new: true }
  );

  res.json({ success: true, profilePicture: user.profilePicture });
});
