import { CATEGORIES } from "../utils/constants.js";

// GET /categories
export const getCategories = (req, res) => {
  res.json({ success: true, categories: CATEGORIES });
};
