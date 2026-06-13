import { Router } from "express";
import { body, validationResult } from "express-validator";
import pool from "../db/connection.js";
import { authenticate, authorize } from "../middleware/auth.js";
import { notifyAllAdmins, notifyUser } from "../lib/notify.js";

const router = Router();

router.get("/", authenticate, authorize("admin"), async (req, res, next) => {
  try {
    let sql = `SELECT s.*, u.name AS customer_name, b.name AS branch_name
               FROM sell_requests s
               JOIN users u ON s.user_id = u.id
               LEFT JOIN branches b ON s.branch_id = b.id
               WHERE 1=1`;
    const params = [];

    if (req.user.role === "customer") { sql += " AND s.user_id = ?"; params.push(req.user.id); }
    if (req.query.status) { sql += " AND s.status = ?"; params.push(req.query.status); }
    if (req.query.branch_id) { sql += " AND s.branch_id = ?"; params.push(req.query.branch_id); }

    sql += " ORDER BY s.created_at DESC";
    const [rows] = await pool.query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

router.get("/:id", authenticate, async (req, res, next) => {
  try {
    const [rows] = await pool.query(
      `SELECT s.*, u.name AS customer_name FROM sell_requests s
       JOIN users u ON s.user_id = u.id WHERE s.id = ?`,
      [req.params.id]
    );
    if (!rows.length) return res.status(404).json({ error: "Sell request not found" });
    res.json(rows[0]);
  } catch (err) { next(err); }
});

router.post("/",
  authenticate,
  body("device_name").notEmpty(),
  body("category").isIn(["Phones", "Laptops", "Tablets", "Consoles"]),
  body("imei").notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

      const { device_name, category, imei, condition, description, photo_urls, id_doc_url, branch_id } = req.body;
      const [result] = await pool.query(
        `INSERT INTO sell_requests (user_id, device_name, category, imei, \`condition\`, description, photo_urls, id_doc_url, branch_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [req.user.id, device_name, category, imei, condition || null, description || null,
         photo_urls ? JSON.stringify(photo_urls) : null, id_doc_url || null, branch_id || null]
      );

      const [request] = await pool.query("SELECT * FROM sell_requests WHERE id = ?", [result.insertId]);
      const [[customer]] = await pool.query("SELECT name, phone FROM users WHERE id = ?", [req.user.id]);

      notifyAllAdmins({
        title: "New sell request",
        message: `${customer?.name || "Customer"} wants to sell ${device_name}`,
        type: "sell",
        referenceId: result.insertId,
        referenceType: "sell_request",
        details: [
          ["Customer", `${customer?.name || "—"}`],
          ["Phone", `${customer?.phone || "—"}`],
          ["Device", `${device_name}`],
          ["Category", `${category}`],
          ["IMEI", `${imei || "—"}`],
          ["Condition", `${condition || "—"}`],
        ],
      });

      res.status(201).json(request[0]);
    } catch (err) { next(err); }
  }
);

router.put("/:id",
  authenticate,
  authorize("admin"),
  async (req, res, next) => {
    try {
      const [existing] = await pool.query("SELECT * FROM sell_requests WHERE id = ?", [req.params.id]);
      if (!existing.length) return res.status(404).json({ error: "Sell request not found" });

      const sr = existing[0];
      const { status, offer, grade, imei_status } = req.body;

      const updates = [];
      const params = [];

      if (status) { updates.push("status = ?"); params.push(status); }
      if (offer !== undefined) { updates.push("offer = ?"); params.push(offer); }
      if (grade) { updates.push("grade = ?"); params.push(grade); }
      if (imei_status) { updates.push("imei_status = ?"); params.push(imei_status); }

      if (updates.length) {
        params.push(req.params.id);
        await pool.query(`UPDATE sell_requests SET ${updates.join(", ")} WHERE id = ?`, params);
      }

      if (status === "Accepted" && grade) {
        const branchId = sr.branch_id || 1;
        const trackingId = `RM-YDE-${String(Date.now()).slice(-5)}`;
        const finalOffer = offer !== undefined ? offer : sr.offer || 0;

        await pool.query(
          `INSERT INTO devices (tracking_id, name, brand, category, grade, price, branch_id, imei, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'In Stock')`,
          [trackingId, sr.device_name, null, sr.category, grade, finalOffer, branchId, sr.imei]
        );
      }

      const [updated] = await pool.query("SELECT * FROM sell_requests WHERE id = ?", [req.params.id]);

      if (status && ["Offer Made", "Accepted", "Declined", "Paid"].includes(status)) {
        const msg = status === "Offer Made"
          ? `An offer of ${offer ? offer.toLocaleString() + " FCFA" : "has been made"} for your ${sr.device_name}`
          : `Your sell request for ${sr.device_name} has been ${status.toLowerCase()}`;
        notifyUser({
          userId: sr.user_id,
          title: "Sell request updated",
          message: msg,
          type: "sell",
          referenceId: Number(req.params.id),
          referenceType: "sell_request",
          details: [
            ["Device", `${sr.device_name}`],
            ["IMEI", `${sr.imei || "—"}`],
            ["Status", `${status}`],
            ...(offer ? [["Offer", `${offer.toLocaleString()} FCFA`]] : []),
            ...(grade ? [["Grade", `${grade}`]] : []),
          ],
        });
      }

      res.json(updated[0]);
    } catch (err) { next(err); }
  }
);

export default router;
