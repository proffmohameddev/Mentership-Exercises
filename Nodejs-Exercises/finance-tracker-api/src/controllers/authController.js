import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  profilePicture: u.profilePicture,
});

// POST /auth/register
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body; // email is already lowercased by zod

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(400, "Email already in use");

  // nobody can pick "admin" from the request, only the ADMIN_EMAIL account gets it
  const isAdmin =
    process.env.ADMIN_EMAIL && email === process.env.ADMIN_EMAIL.toLowerCase();

  const user = await User.create({
    name,
    email,
    password,
    role: isAdmin ? "admin" : "user",
  });

  res.status(201).json({
    success: true,
    token: generateToken(user._id),
    user: publicUser(user),
  });
});

// POST /auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  res.json({
    success: true,
    token: generateToken(user._id),
    user: publicUser(user),
  });
});

// GET /auth/profile
export const getProfile = asyncHandler(async (req, res) => {
  res.json({ success: true, user: publicUser(req.user) });
});
