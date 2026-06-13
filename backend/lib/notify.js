import pool from "../db/connection.js";
import { emailAdmin, emailUser } from "./email.js";

export async function notifyAllAdmins({ title, message, type, referenceId, referenceType, details }) {
  try {
    const [admins] = await pool.query("SELECT id FROM users WHERE role = 'admin'");
    if (!admins.length) return;
    const values = admins.map((a) => [a.id, title, message, type, referenceId || null, referenceType || null]);
    const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const flat = values.flat();
    await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type) VALUES ${placeholders}`,
      flat
    );
    emailAdmin({ title, message, type, details }).catch(() => {});
  } catch (err) {
    console.error("Failed to notify admins:", err.message);
  }
}

export async function notifyUser({ userId, title, message, type, referenceId, referenceType, details }) {
  try {
    await pool.query(
      `INSERT INTO notifications (user_id, title, message, type, reference_id, reference_type) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, title, message, type, referenceId || null, referenceType || null]
    );
    emailUser({ userId, title, message, type, details }).catch(() => {});
  } catch (err) {
    console.error("Failed to notify user:", err.message);
  }
}
