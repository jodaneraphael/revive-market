import { Router } from "express";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { generateToken } from "../middleware/auth.js";

const router = Router();

router.post(
  "/register",
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  body("phone").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { name, email, password, phone } = req.body;
      const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
      if (existing.length) return res.status(409).json({ error: "Email already registered" });

      const hash = await bcrypt.hash(password, 10);
      const [result] = await pool.query(
        "INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, 'customer')",
        [name, email, phone, hash]
      );

      const token = generateToken({ id: result.insertId, role: "customer", branch_id: null });
      res.status(201).json({ token, user: { id: result.insertId, name, email, phone, role: "customer" } });
    } catch (err) { next(err); }
  }
);

router.post(
  "/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { email, password } = req.body;
      const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
      if (!rows.length) return res.status(401).json({ error: "Invalid credentials" });

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = generateToken(user);
      res.json({
        token,
        user: { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role, branch_id: user.branch_id },
      });
    } catch (err) { next(err); }
  }
);

export default router;
