import { Router } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.phone, u.branch_id, b.name AS branch_name,
        (SELECT COUNT(*) FROM repair_jobs WHERE technician_id = u.id AND status NOT IN ('Completed')) AS active_jobs,
        (SELECT COUNT(*) FROM repair_jobs WHERE technician_id = u.id AND status = 'Completed') AS completed_jobs,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback f JOIN repair_jobs rj ON f.repair_job_id = rj.id WHERE rj.technician_id = u.id) AS rating
       FROM users u
       LEFT JOIN branches b ON u.branch_id = b.id
       WHERE u.role = 'technician'
       ORDER BY u.name`
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT u.*, b.name AS branch_name
       FROM users u LEFT JOIN branches b ON u.branch_id = b.id
       WHERE u.id = ? AND u.role = 'technician'`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Technician not found" });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.get("/:id/performance", authenticate, async (req, res, next) => {
  try {
    const techId = req.params.id;

    const [jobs] = await pool.query(
      `SELECT DATE_FORMAT(created_at, '%Y-%m') AS month, COUNT(*) AS total,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) AS completed
       FROM repair_jobs WHERE technician_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
       GROUP BY month ORDER BY month`,
      [techId]
    );

    const [weekly] = await pool.query(
      `SELECT CONCAT('W', FLOOR((DAYOFYEAR(created_at) - 1) / 7) + 1) AS week, COUNT(*) AS jobs
       FROM repair_jobs WHERE technician_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 4 WEEK)
       GROUP BY week ORDER BY week`,
      [techId]
    );

    const [feedback] = await pool.query(
      `SELECT f.*, u.name AS customer_name FROM feedback f
       JOIN repair_jobs rj ON f.repair_job_id = rj.id
       JOIN users u ON f.customer_id = u.id
       WHERE rj.technician_id = ? ORDER BY f.created_at DESC LIMIT 10`,
      [techId]
    );

    const [stats] = await pool.query(
      `SELECT 
        (SELECT COUNT(*) FROM repair_jobs WHERE technician_id = ? AND status NOT IN ('Completed')) AS active_jobs,
        (SELECT COUNT(*) FROM repair_jobs WHERE technician_id = ? AND status = 'Completed' AND created_at >= DATE_SUB(NOW(), INTERVAL 1 MONTH)) AS monthly_completed,
        (SELECT COALESCE(AVG(rating), 0) FROM feedback f JOIN repair_jobs rj ON f.repair_job_id = rj.id WHERE rj.technician_id = ?) AS avg_rating,
        (SELECT COALESCE(AVG(DATEDIFF(updated_at, created_at)), 0) FROM repair_jobs WHERE technician_id = ? AND status = 'Completed') AS avg_turnover_days
      `, [techId, techId, techId, techId]
    );

    res.json({ monthly: jobs, weekly, feedback, stats: stats[0] });
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  authorize("admin"),
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("branch_id").isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, email, password, phone, branch_id } = req.body;
      const hash = await bcrypt.hash(password, 10);

      const [result] = await pool.query(
        "INSERT INTO users (name, email, phone, password_hash, role, branch_id) VALUES (?, ?, ?, ?, 'technician', ?)",
        [name, email, phone || null, hash, branch_id]
      );

      const [tech] = await pool.query("SELECT id, name, email, role, branch_id FROM users WHERE id = ?", [result.insertId]);
      res.status(201).json(tech[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id",
  authenticate,
  authorize("admin"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT id FROM users WHERE id = ? AND role = 'technician'", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Technician not found" });

      const { name, email, phone, branch_id } = req.body;
      await pool.query(
        "UPDATE users SET name=?, email=?, phone=?, branch_id=? WHERE id=?",
        [name, email, phone, branch_id, req.params.id]
      );

      const [updated] = await pool.query("SELECT id, name, email, role, branch_id FROM users WHERE id = ?", [req.params.id]);
      res.json(updated[0]);
    } catch (err) { next(err); }
  }
);

router.delete("/:id",
  authenticate,
  authorize("admin"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT id FROM users WHERE id = ? AND role = 'technician'", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Technician not found" });
      await pool.query("UPDATE users SET branch_id = NULL WHERE id = ?", [req.params.id]);
      await pool.query("DELETE FROM users WHERE id = ? AND role = 'technician'", [req.params.id]);
      res.json({ message: "Technician deleted" });
    } catch (err) { next(err); }
  }
);

export default router;
