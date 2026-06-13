import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { notifyAllAdmins, notifyUser } from "../lib/notify.js";

const router = Router();

router.get("/", authenticate, authorize("admin", "technician"), async (req, res, next) => {
  try {
    let sql = `SELECT r.*, u.name AS customer_name, tech.name AS technician_name, b.name AS branch_name
               FROM repair_jobs r
               JOIN users u ON r.user_id = u.id
               LEFT JOIN users tech ON r.technician_id = tech.id
               LEFT JOIN branches b ON r.branch_id = b.id
               WHERE 1=1`;
    const params = [];

    if (req.user.role === "customer") { sql += " AND r.user_id = ?"; params.push(req.user.id); }
    if (req.user.role === "technician") { sql += " AND r.technician_id = ?"; params.push(req.user.id); }
    if (req.query.technician_id) { sql += " AND r.technician_id = ?"; params.push(req.query.technician_id); }
    if (req.query.status) { sql += " AND r.status = ?"; params.push(req.query.status); }
    if (req.query.branch_id) { sql += " AND r.branch_id = ?"; params.push(req.query.branch_id); }

    sql += " ORDER BY r.created_at DESC";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT r.*, u.name AS customer_name, tech.name AS technician_name, b.name AS branch_name
       FROM repair_jobs r
       JOIN users u ON r.user_id = u.id
       LEFT JOIN users tech ON r.technician_id = tech.id
       LEFT JOIN branches b ON r.branch_id = b.id
       WHERE r.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Repair job not found" });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  body("device_name").notEmpty(),
  body("issue").notEmpty(),
  body("branch_id").isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { device_name, category, issue, branch_id, delivery_method } = req.body;

      const [result] = await pool.query(
        `INSERT INTO repair_jobs (user_id, device_name, category, issue, branch_id, delivery_method)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.user.id, device_name, category || null, issue, branch_id, delivery_method || "dropoff"]
      );

      const [job] = await pool.query("SELECT * FROM repair_jobs WHERE id = ?", [result.insertId]);
      const [[customer]] = await pool.query("SELECT name, phone FROM users WHERE id = ?", [req.user.id]);

      notifyAllAdmins({
        title: "New repair request",
        message: `${customer?.name || "Customer"} needs repair for ${device_name}`,
        type: "repair",
        referenceId: result.insertId,
        referenceType: "repair_job",
        details: [
          ["Customer", `${customer?.name || "—"}`],
          ["Phone", `${customer?.phone || "—"}`],
          ["Device", `${device_name}`],
          ["Category", `${category || "—"}`],
          ["Issue", `${issue}`],
          ["Delivery", `${delivery_method === "pickup" ? "Pickup (2,000 FCFA)" : "Drop-off at branch"}`],
        ],
      });

      res.status(201).json(job[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id",
  authenticate,
  authorize("admin", "technician"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT id, user_id, device_name FROM repair_jobs WHERE id = ?", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Repair job not found" });

      const { status, technician_id, quote, quote_approved, priority } = req.body;
      const updates = [];
      const params = [];

      if (status) { updates.push("status = ?"); params.push(status); }
      if (technician_id) { updates.push("technician_id = ?"); params.push(technician_id); }
      if (quote !== undefined) { updates.push("quote = ?"); params.push(quote); }
      if (quote_approved !== undefined) { updates.push("quote_approved = ?"); params.push(quote_approved); }
      if (priority) { updates.push("priority = ?"); params.push(priority); }

      if (updates.length) {
        params.push(req.params.id);
        await pool.query(`UPDATE repair_jobs SET ${updates.join(", ")} WHERE id = ?`, params);
      }

      const [updated] = await pool.query("SELECT * FROM repair_jobs WHERE id = ?", [req.params.id]);

      if (status) {
        const msg = quote !== undefined && quote !== null
          ? `Your repair for ${updated[0].device_name} is now: ${status} — Quote: ${quote.toLocaleString()} FCFA`
          : `Your repair for ${updated[0].device_name} is now: ${status}`;
        notifyUser({
          userId: updated[0].user_id,
          title: "Repair status updated",
          message: msg,
          type: "repair",
          referenceId: Number(req.params.id),
          referenceType: "repair_job",
          details: [
            ["Device", `${updated[0].device_name}`],
            ["Status", `${status}`],
            ["Issue", `${updated[0].issue || "—"}`],
            ...(quote !== undefined && quote !== null ? [["Quote", `${quote.toLocaleString()} FCFA`]] : []),
            ...(technician_id ? [["Technician assigned", "Yes"]] : []),
          ],
        });
      }

      res.json(updated[0]);
    } catch (err) { next(err); }
  }
);

export default router;
