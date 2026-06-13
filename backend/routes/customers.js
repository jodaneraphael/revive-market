import { Router } from "express";
import pool from "../db/connection.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/:id/orders", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const [rows] = await pool.query(
      `SELECT o.*, d.name AS device_name
       FROM orders o JOIN devices d ON o.device_id = d.id
       WHERE o.user_id = ? ORDER BY o.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id/sell-requests", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const [rows] = await pool.query(
      "SELECT * FROM sell_requests WHERE user_id = ? ORDER BY created_at DESC",
      [req.params.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id/repairs", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const [rows] = await pool.query(
      `SELECT r.*, tech.name AS technician_name
       FROM repair_jobs r LEFT JOIN users tech ON r.technician_id = tech.id
       WHERE r.user_id = ? ORDER BY r.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id/devices", authenticate, async (req, res, next) => {
  try {
    if (req.user.role !== "admin" && req.user.id !== Number(req.params.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const [rows] = await pool.query(
      `SELECT d.*, o.created_at AS purchase_date,
        DATE_ADD(o.created_at, INTERVAL CASE d.grade WHEN 'A' THEN 90 WHEN 'B' THEN 60 ELSE 30 END DAY) AS warranty_end
       FROM orders o JOIN devices d ON o.device_id = d.id
       WHERE o.user_id = ? AND o.status = 'Delivered'
       ORDER BY o.created_at DESC`,
      [req.params.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

export default router;
