import mongoose from "mongoose";
import { CATEGORIES, TYPES } from "../utils/constants.js";

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    // expenses are stored as negative numbers, income as positive
    amount: { type: Number, required: true },
    type: { type: String, enum: TYPES, required: true },
    category: { type: String, enum: CATEGORIES, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", transactionSchema);
