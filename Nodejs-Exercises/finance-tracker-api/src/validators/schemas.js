import { z } from "zod";
import { CATEGORIES, TYPES } from "../utils/constants.js";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid id");
const month = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use YYYY-MM, e.g. 2025-05");

// ---------- auth ----------
export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().toLowerCase().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
  }),
});

// ---------- transactions ----------
const transactionBody = z.object({
  title: z.string().trim().min(1, "Title is required"),
  amount: z.number().refine((n) => n !== 0, "Amount can't be 0"),
  type: z.enum(TYPES),
  category: z.enum(CATEGORIES),
  date: z.coerce.date().optional(),
});

export const createTransactionSchema = z.object({ body: transactionBody });

export const updateTransactionSchema = z.object({
  params: z.object({ id: objectId }),
  body: transactionBody
    .partial()
    .refine((b) => Object.keys(b).length > 0, "Send at least one field to update"),
});

export const idParamSchema = z.object({ params: z.object({ id: objectId }) });

export const listTransactionsSchema = z.object({
  query: z.object({
    type: z.enum(TYPES).optional(),
    category: z.enum(CATEGORIES).optional(),
    month: month.optional(),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
  }),
});

export const summarySchema = z.object({
  query: z.object({ month: month.optional() }),
});
