import { Router } from "express";
import { getOverview } from "../controllers/adminController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = Router();
router.get("/overview", protect, adminOnly, getOverview);

export default router;
