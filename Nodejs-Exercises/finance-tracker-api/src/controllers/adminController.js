import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET /admin/overview
export const getOverview = asyncHandler(async (req, res) => {
  const [totalUsers, totalTransactions, topSpending, totals] = await Promise.all([
    User.countDocuments(),
    Transaction.countDocuments(),
    Transaction.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" }, count: { $sum: 1 } } },
      { $sort: { total: 1 } }, // most negative first = biggest spending
      { $limit: 5 },
      { $project: { _id: 0, category: "$_id", totalSpent: { $abs: "$total" }, count: 1 } },
    ]),
    Transaction.aggregate([
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]),
  ]);

  const income = totals.find((t) => t._id === "income")?.total || 0;
  const expense = Math.abs(totals.find((t) => t._id === "expense")?.total || 0);

  res.json({
    success: true,
    totalUsers,
    totalTransactions,
    totalIncome: income,
    totalExpense: expense,
    topSpendingCategories: topSpending,
  });
});
