import { Router } from "express";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM branches ORDER BY name");
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/stats", authenticate, authorize("admin"), async (_req, res, next) => {
  try {
    const [rows] = await pool.query(`
      SELECT
        b.id, b.name, b.address,
        (SELECT COUNT(*) FROM devices WHERE branch_id = b.id AND status = 'In Stock') AS inventory_count,
        (SELECT COALESCE(SUM(o.price), 0) FROM orders o
         JOIN devices d ON o.device_id = d.id WHERE d.branch_id = b.id) AS total_sales,
        (SELECT COUNT(*) FROM repair_jobs WHERE branch_id = b.id AND status NOT IN ('Completed')) AS active_repairs,
        (SELECT COUNT(*) FROM users WHERE branch_id = b.id AND role = 'technician') AS staff_count,
        (SELECT GROUP_CONCAT(CONCAT(u.name, '|', u.id) SEPARATOR ',') FROM users u
         WHERE u.branch_id = b.id AND u.role = 'technician') AS staff_list
      FROM branches b
      ORDER BY b.name
    `);

    const result = rows.map((r) => ({
      ...r,
      staff_list: r.staff_list ? r.staff_list.split(",").map((s) => {
        const [name, id] = s.split("|");
        return { id: Number(id), name };
      }) : [],
    }));

    res.json(result);
  } catch (err) { next(err); }
});

export default router;
