import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, authorize("admin", "technician"), async (req, res, next) => {
  try {
    let sql = `SELECT p.*, rj.device_name, rj.status AS job_status
               FROM part_requests p
               JOIN repair_jobs rj ON p.repair_job_id = rj.id
               WHERE 1=1`;
    const params = [];

    if (req.query.repair_job_id) { sql += " AND p.repair_job_id = ?"; params.push(req.query.repair_job_id); }
    if (req.query.status) { sql += " AND p.status = ?"; params.push(req.query.status); }

    sql += " ORDER BY p.created_at DESC";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  authorize("technician"),
  body("repair_job_id").isInt(),
  body("part_name").notEmpty(),
  body("quantity").isInt({ min: 1 }),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { repair_job_id, part_name, quantity } = req.body;
      const [result] = await pool.query(
        "INSERT INTO part_requests (repair_job_id, part_name, quantity) VALUES (?, ?, ?)",
        [repair_job_id, part_name, quantity || 1]
      );

      const [part] = await pool.query("SELECT * FROM part_requests WHERE id = ?", [result.insertId]);
      res.status(201).json(part[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id",
  authenticate,
  authorize("admin", "technician"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT id FROM part_requests WHERE id = ?", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Part request not found" });

      const { status } = req.body;
      if (!["Pending", "Fulfilled", "Released"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }

      await pool.query("UPDATE part_requests SET status = ? WHERE id = ?", [status, req.params.id]);
      const [updated] = await pool.query("SELECT * FROM part_requests WHERE id = ?", [req.params.id]);
      res.json(updated[0]);
    } catch (err) { next(err); }
  }
);

export default router;
