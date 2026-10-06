import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// expense => negative, income => positive (no matter what sign the client sent)
const fixSign = (amount, type) =>
  type === "expense" ? -Math.abs(amount) : Math.abs(amount);

// "2025-05" => [2025-05-01, 2025-06-01)
const monthRange = (month) => {
  const now = new Date();
  const [y, m] = month
    ? month.split("-").map(Number)
    : [now.getUTCFullYear(), now.getUTCMonth() + 1];
  return {
    label: `${y}-${String(m).padStart(2, "0")}`,
    start: new Date(Date.UTC(y, m - 1, 1)),
    end: new Date(Date.UTC(y, m, 1)),
  };
};

// POST /transactions
export const createTransaction = asyncHandler(async (req, res) => {
  const data = { ...req.body, user: req.user._id };
  data.amount = fixSign(data.amount, data.type);

  const transaction = await Transaction.create(data);
  res.status(201).json({ success: true, transaction });
});

// GET /transactions?type=&category=&month=&page=&limit=
export const getTransactions = asyncHandler(async (req, res) => {
  const { type, category, month, page, limit } = req.query;

  const filter = { user: req.user._id };
  if (type) filter.type = type;
  if (category) filter.category = category;
  if (month) {
    const { start, end } = monthRange(month);
    filter.date = { $gte: start, $lt: end };
  }

  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .sort({ date: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Transaction.countDocuments(filter),
  ]);

  res.json({
    success: true,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    transactions,
  });
});

// GET /transactions/monthly-summary?month=2025-05
export const getMonthlySummary = asyncHandler(async (req, res) => {
  const { label, start, end } = monthRange(req.query.month);

  const rows = await Transaction.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(req.user._id),
        date: { $gte: start, $lt: end },
      },
    },
    {
      $group: {
        _id: { category: "$category", type: "$type" },
        total: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { total: 1 } },
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  const categories = rows.map((r) => {
    if (r._id.type === "income") totalIncome += r.total;
    else totalExpense += Math.abs(r.total);

    return {
      category: r._id.category,
      type: r._id.type,
      total: r.total,
      count: r.count,
    };
  });

  res.json({
    success: true,
    month: label,
    totalIncome,
    totalExpense,
    balance: totalIncome - totalExpense,
    categories,
  });
});

// PUT /transactions/:id
export const updateTransaction = asyncHandler(async (req, res) => {
  // filtering by user means you can only touch your own records
  const transaction = await Transaction.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!transaction) throw new ApiError(404, "Transaction not found");

  Object.assign(transaction, req.body);
  transaction.amount = fixSign(transaction.amount, transaction.type);
  await transaction.save();

  res.json({ success: true, transaction });
});

// DELETE /transactions/:id
export const deleteTransaction = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!transaction) throw new ApiError(404, "Transaction not found");

  res.json({ success: true, message: "Transaction deleted" });
});
