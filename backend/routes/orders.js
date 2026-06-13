import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { notifyAllAdmins, notifyUser } from "../lib/notify.js";

const router = Router();

router.get("/", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    let sql = `SELECT o.*, u.name AS customer_name, d.name AS device_name
               FROM orders o
               JOIN users u ON o.user_id = u.id
               JOIN devices d ON o.device_id = d.id
               WHERE 1=1`;
    const params = [];

    if (req.user.role === "customer") { sql += " AND o.user_id = ?"; params.push(req.user.id); }
    if (req.query.status) { sql += " AND o.status = ?"; params.push(req.query.status); }

    sql += " ORDER BY o.created_at DESC";

    if (req.query.page) {
      const page = Math.max(1, Number(req.query.page));
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
      const offset = (page - 1) * limit;

      const countSql = `SELECT COUNT(*) as total FROM orders o
        JOIN users u ON o.user_id = u.id
        JOIN devices d ON o.device_id = d.id
        WHERE 1=1${req.user.role === "customer" ? " AND o.user_id = ?" : ""
      }${req.query.status ? " AND o.status = ?" : ""}`;
      const [countRows] = await pool.query(countSql, params);
      const total = countRows[0].total;

      sql += " LIMIT ? OFFSET ?";
      params.push(limit, offset);

      const [rows] = await pool.query(sql, params);
      res.json({ data: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
    } else {
      const [rows] = await pool.query(sql, params);
      res.json(rows);
    }
  } catch (err) { next(err); }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.*, u.name AS customer_name, d.name AS device_name
       FROM orders o JOIN users u ON o.user_id = u.id JOIN devices d ON o.device_id = d.id
       WHERE o.id = ?`, [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Order not found" });
    if (req.user.role === "customer" && rows[0].user_id !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  body("device_id").isInt(),
  body("payment_method").isIn(["MTN MoMo", "Orange Money", "Pay on Delivery"]),
  body("city").notEmpty(),
  body("address").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { device_id, payment_method, city, address } = req.body;

      const [devices] = await pool.query("SELECT * FROM devices WHERE id = ? AND status = 'In Stock'", [device_id]);
      if (!devices.length) return res.status(400).json({ error: "Device not available" });

      const device = devices[0];
      const trackingId = device.tracking_id;

      const [result] = await pool.query(
        `INSERT INTO orders (user_id, device_id, tracking_id, price, city, address, payment_method, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, 'Processing')`,
        [req.user.id, device_id, trackingId, device.price, city, address, payment_method]
      );

      const escrow = payment_method === "Pay on Delivery" ? "N/A" : "Held";
      await pool.query(
        `INSERT INTO transactions (order_id, user_id, amount, method, escrow) VALUES (?, ?, ?, ?, ?)`,
        [result.insertId, req.user.id, device.price, payment_method, escrow]
      );

      await pool.query("UPDATE devices SET status = 'Sold' WHERE id = ?", [device_id]);

      const [order] = await pool.query("SELECT * FROM orders WHERE id = ?", [result.insertId]);
      const [[customer]] = await pool.query("SELECT name, phone FROM users WHERE id = ?", [req.user.id]);

      notifyAllAdmins({
        title: "New order placed",
        message: `${customer?.name || "Customer"} ordered ${device.name}`,
        type: "order",
        referenceId: result.insertId,
        referenceType: "order",
        details: [
          ["Customer", `${customer?.name || "—"}`],
          ["Phone", `${customer?.phone || "—"}`],
          ["Device", `${device.name}`],
          ["Brand", `${device.brand || "—"}`],
          ["Grade", `${device.grade}`],
          ["IMEI", `${device.imei || "—"}`],
          ["Price", `${device.price.toLocaleString()} FCFA`],
          ["Payment", `${payment_method}`],
          ["City", `${city}`],
          ["Address", `${address}`],
        ],
      });

      res.status(201).json(order[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Processing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const [existing] = await pool.query("SELECT id, user_id FROM orders WHERE id = ?", [req.params.id]);
    if (!existing.length) return res.status(404).json({ error: "Order not found" });

    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, req.params.id]);

    if (status === "Delivered") {
      await pool.query("UPDATE transactions SET escrow = 'Released' WHERE order_id = ?", [req.params.id]);
    }

    const [updated] = await pool.query(
      `SELECT o.*, d.name AS device_name FROM orders o JOIN devices d ON o.device_id = d.id WHERE o.id = ?`,
      [req.params.id]
    );

    notifyUser({
      userId: existing[0].user_id,
      title: "Order status updated",
      message: `Your order ${updated[0].tracking_id} is now: ${status}`,
      type: "order",
      referenceId: Number(req.params.id),
      referenceType: "order",
      details: [
        ["Tracking", `${updated[0].tracking_id}`],
        ["Status", `${status}`],
        ["Device", `${updated[0].device_name || "—"}`],
        ["Amount", `${updated[0].price.toLocaleString()} FCFA`],
        ["Payment", `${updated[0].payment_method}`],
      ],
    });

    res.json(updated[0]);
  } catch (err) { next(err); }
});

export default router;
