import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";

import { swaggerSpec } from "./docs/swagger.js";
import { logger } from "./middleware/logger.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

app.set("trust proxy", 1); // Render sits behind a proxy

// docs go first so helmet's strict CSP doesn't break Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(logger);

const tooMany = { success: false, message: "Too many requests, slow down", status: 429 };

app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200, message: tooMany }));
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, message: tooMany });

app.get("/", (req, res) => {
  res.json({ success: true, message: "Finance Tracker API is running. Docs at /docs" });
});

app.use("/auth", authLimiter, authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/categories", categoryRoutes);
app.use("/upload", uploadRoutes);
app.use("/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
