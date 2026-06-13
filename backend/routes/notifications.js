import { Router } from "express";
import pool from "../db/connection.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
      [req.user.id]
    );
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/unread-count", authenticate, async (req, res, next) => {
  try {
    const [[{ count }]] = await pool.query(
      "SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND is_read = FALSE",
      [req.user.id]
    );
    res.json({ count });
  } catch (err) { next(err); }
});

router.put("/:id/read", authenticate, async (req, res, next) => {
  try {
    await pool.query(
      "UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?",
      [req.params.id, req.user.id]
    );
    res.json({ success: true });
  } catch (err) { next(err); }
});

router.put("/read-all", authenticate, async (req, res, next) => {
  try {
    await pool.query(
      "UPDATE notifications SET is_read = TRUE WHERE user_id = ?",
      [req.user.id]
    );
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
