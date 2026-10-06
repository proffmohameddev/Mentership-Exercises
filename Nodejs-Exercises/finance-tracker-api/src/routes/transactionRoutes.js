import { Router } from "express";
import {
  createTransaction,
  getTransactions,
  getMonthlySummary,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";
import { protect } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import {
  createTransactionSchema,
  updateTransactionSchema,
  idParamSchema,
  listTransactionsSchema,
  summarySchema,
} from "../validators/schemas.js";

const router = Router();

router.use(protect); // every transaction route needs a logged-in user

router.get("/monthly-summary", validate(summarySchema), getMonthlySummary);
router.post("/", validate(createTransactionSchema), createTransaction);
router.get("/", validate(listTransactionsSchema), getTransactions);
router.put("/:id", validate(updateTransactionSchema), updateTransaction);
router.delete("/:id", validate(idParamSchema), deleteTransaction);

export default router;
