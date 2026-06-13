import { Router } from "express";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/stats", authenticate, authorize("admin"), async (_req, res, next) => {
  try {
    const [[{ total_sales }]] = await pool.query(
      "SELECT COALESCE(SUM(price), 0) AS total_sales FROM orders WHERE status != 'Cancelled'"
    );

    const [[{ active_repairs }]] = await pool.query(
      "SELECT COUNT(*) AS active_repairs FROM repair_jobs WHERE status NOT IN ('Completed')"
    );

    const [[{ pending_sell_requests }]] = await pool.query(
      "SELECT COUNT(*) AS pending_sell_requests FROM sell_requests WHERE status IN ('Submitted','Under Review')"
    );

    const [[{ inventory_in_stock }]] = await pool.query(
      "SELECT COUNT(*) AS inventory_in_stock FROM devices WHERE status = 'In Stock'"
    );

    const [sales_by_city] = await pool.query(`
      SELECT b.name AS city, COALESCE(SUM(o.price), 0) AS sales
      FROM branches b
      LEFT JOIN orders o ON o.city = b.name
      GROUP BY b.name ORDER BY b.name
    `);

    const [inventory_by_grade] = await pool.query(`
      SELECT CONCAT('Grade ', grade) AS grade, COUNT(*) AS count
      FROM devices WHERE status = 'In Stock' GROUP BY grade ORDER BY grade
    `);

    const [recent_orders] = await pool.query(`
      SELECT o.*, u.name AS customer, d.name AS device_name
      FROM orders o JOIN users u ON o.user_id = u.id JOIN devices d ON o.device_id = d.id
      ORDER BY o.created_at DESC LIMIT 5
    `);

    res.json({
      kpis: {
        total_sales: Number(total_sales),
        active_repairs: Number(active_repairs),
        pending_sell_requests: Number(pending_sell_requests),
        inventory_in_stock: Number(inventory_in_stock),
      },
      sales_by_city,
      inventory_by_grade,
      recent_orders,
    });
  } catch (err) { next(err); }
});

export default router;
