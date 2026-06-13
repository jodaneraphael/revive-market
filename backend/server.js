import express from "express";
import cors from "cors";
import "dotenv/config";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import devicesRoutes from "./routes/devices.js";
import ordersRoutes from "./routes/orders.js";
import sellRequestsRoutes from "./routes/sellRequests.js";
import repairsRoutes from "./routes/repairs.js";
import techniciansRoutes from "./routes/technicians.js";
import transactionsRoutes from "./routes/transactions.js";
import partsRoutes from "./routes/parts.js";
import branchesRoutes from "./routes/branches.js";
import dashboardRoutes from "./routes/dashboard.js";
import customersRoutes from "./routes/customers.js";
import uploadRoutes from "./routes/uploads.js";
import notificationsRoutes from "./routes/notifications.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

const corsOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: corsOrigin === "*" ? "*" : corsOrigin.split(",").map((s) => s.trim()), credentials: true }));
app.use(express.json());
app.use("/uploads", express.static(join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/devices", devicesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/sell-requests", sellRequestsRoutes);
app.use("/api/repair-jobs", repairsRoutes);
app.use("/api/technicians", techniciansRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/part-requests", partsRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/notifications", notificationsRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Revive Market API running on http://localhost:${PORT}`);
});
