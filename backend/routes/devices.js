import { Router } from "express";
import { body, query, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    let sql = `SELECT d.*, b.name AS branch_name
               FROM devices d JOIN branches b ON d.branch_id = b.id
               WHERE 1=1`;
    const params = [];

    if (req.query.status) { sql += " AND d.status = ?"; params.push(req.query.status); }
    if (req.query.category) { sql += " AND d.category = ?"; params.push(req.query.category); }
    if (req.query.grade) { sql += " AND d.grade = ?"; params.push(req.query.grade); }
    if (req.query.branch) { sql += " AND b.name = ?"; params.push(req.query.branch); }
    if (req.query.q) { sql += " AND (d.name LIKE ? OR d.brand LIKE ?)"; params.push(`%${req.query.q}%`, `%${req.query.q}%`); }

    const sort = req.query.sort || "featured";
    if (sort === "price-asc") sql += " ORDER BY d.price ASC";
    else if (sort === "price-desc") sql += " ORDER BY d.price DESC";
    else sql += " ORDER BY d.created_at DESC";

    if (req.query.page) {
      const page = Math.max(1, Number(req.query.page));
      const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
      const offset = (page - 1) * limit;

      const countSql = `SELECT COUNT(*) as total FROM devices d JOIN branches b ON d.branch_id = b.id WHERE 1=1${
        req.query.status ? " AND d.status = ?" : ""
      }${req.query.category ? " AND d.category = ?" : ""
      }${req.query.grade ? " AND d.grade = ?" : ""
      }${req.query.branch ? " AND b.name = ?" : ""
      }${req.query.q ? " AND (d.name LIKE ? OR d.brand LIKE ?)" : ""}`;
      const [countRows] = await pool.query(countSql, params);
      const total = countRows[0].total;

      sql += " LIMIT ? OFFSET ?";
      params.push(limit, offset);

      const [rows] = await pool.query(sql, params);
      res.json({ data: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
    } else {
      if (req.query._limit) { sql += " LIMIT ?"; params.push(Number(req.query._limit)); }
      const [rows] = await pool.query(sql, params);
      res.json(rows);
    }
  } catch (err) { next(err); }
});

router.get("/featured", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.*, b.name AS branch_name FROM devices d
       JOIN branches b ON d.branch_id = b.id
       WHERE d.status = 'In Stock' ORDER BY d.created_at DESC LIMIT 8`
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT d.*, b.name AS branch_name FROM devices d
       JOIN branches b ON d.branch_id = b.id WHERE d.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Device not found" });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  authorize("admin"),
  body("name").notEmpty(),
  body("category").isIn(["Phones", "Laptops", "Tablets", "Consoles"]),
  body("grade").isIn(["A", "B", "C"]),
  body("price").isInt({ min: 1 }),
  body("branch_id").isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, brand, category, grade, price, branch_id, imei, specs, description, condition, image_url } = req.body;
      const trackingId = `RM-YDE-${String(Date.now()).slice(-5)}`;

      const [result] = await pool.query(
        `INSERT INTO devices (tracking_id, name, brand, category, grade, price, branch_id, imei, specs, description, \`condition\`, image_url)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [trackingId, name, brand || null, category, grade, price, branch_id, imei || null,
         specs ? JSON.stringify(specs) : null, description || null, condition || null, image_url || null]
      );

      const [device] = await pool.query("SELECT * FROM devices WHERE id = ?", [result.insertId]);
      res.status(201).json(device[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id",
  authenticate,
  authorize("admin"),
  async (req, res, next) => {
    try {
      const { name, brand, category, grade, price, branch_id, status, imei, specs, description, condition, image_url } = req.body;
      const [existing] = await pool.query("SELECT id FROM devices WHERE id = ?", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Device not found" });

      await pool.query(
        `UPDATE devices SET name=?, brand=?, category=?, grade=?, price=?, branch_id=?, \`status\`=?, imei=?, specs=?, description=?, \`condition\`=?, image_url=?
         WHERE id=?`,
        [name, brand, category, grade, price, branch_id, status || "In Stock", imei,
         specs ? JSON.stringify(specs) : null, description, condition, image_url, req.params.id]
      );

      const [updated] = await pool.query("SELECT * FROM devices WHERE id = ?", [req.params.id]);
      res.json(updated[0]);
    } catch (err) { next(err); }
  }
);

router.delete("/:id",
  authenticate,
  authorize("admin"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT id FROM devices WHERE id = ?", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Device not found" });
      await pool.query("DELETE FROM devices WHERE id = ?", [req.params.id]);
      res.json({ message: "Device deleted" });
    } catch (err) { next(err); }
  }
);

export default router;
