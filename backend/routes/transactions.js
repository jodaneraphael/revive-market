import { Router } from "express";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    let sql = `SELECT t.*, u.name AS customer_name, o.tracking_id AS order_tracking
               FROM transactions t
               JOIN users u ON t.user_id = u.id
               JOIN orders o ON t.order_id = o.id`;
    const params = [];

    if (req.query.method) { sql += " WHERE t.method = ?"; params.push(req.query.method); }
    if (req.query.escrow) { sql += sql.includes("WHERE") ? " AND" : " WHERE"; sql += " t.escrow = ?"; params.push(req.query.escrow); }

    sql += " ORDER BY t.created_at DESC";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

router.put("/:id/escrow", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    const [existing] = await pool.query("SELECT id FROM transactions WHERE id = ?", [req.params.id]);
    if (!existing.length) return res.status(404).json({ error: "Transaction not found" });

    const { escrow } = req.body;
    if (!["Held", "Released", "N/A"].includes(escrow)) {
      return res.status(400).json({ error: "Invalid escrow state" });
    }

    await pool.query("UPDATE transactions SET escrow = ? WHERE id = ?", [escrow, req.params.id]);

    const [updated] = await pool.query("SELECT * FROM transactions WHERE id = ?", [req.params.id]);
    res.json(updated[0]);
  } catch (err) { next(err); }
});

export default router;
