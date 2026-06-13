import nodemailer from "nodemailer";
import pool from "../db/connection.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "127.0.0.1",
  port: Number(process.env.SMTP_PORT) || 25,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "papercut",
    pass: process.env.SMTP_PASSWORD || "papercut",
  },
  tls: { rejectUnauthorized: false },
});

const FROM = `"${process.env.SMTP_FROM_NAME || "REVIVE MARKET"}" <${process.env.SMTP_FROM || "noreply@revivemarket.com"}>`;

export async function sendEmailNotification({ to, subject, title, message, type, details }) {
  const typeLabels = { order: "🛒 Order", sell: "💰 Sell Request", repair: "🔧 Repair", general: "📢 Notification" };
  const label = typeLabels[type] || "Notification";

  const detailsHtml = details && details.length
    ? `<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:13px">
        ${details.map(([key, val]) =>
          `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;font-weight:600;width:120px">${key}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#222">${val}</td></tr>`
        ).join("")}
       </table>`
    : "";

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 16px">
    <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.1)">
      <tr><td style="background:#2E7D32;padding:20px 32px;text-align:center">
        <h1 style="color:#fff;margin:0;font-size:20px">REVIVE MARKET</h1>
        <p style="color:#a5d6a7;margin:4px 0 0;font-size:13px">Smart Choice. Second Life. Better Tomorrow.</p>
      </td></tr>
      <tr><td style="padding:32px">
        <p style="color:#666;font-size:13px;margin:0 0 4px">${label}</p>
        <h2 style="margin:0 0 12px;font-size:18px;color:#222">${title}</h2>
        <p style="margin:0 0 8px;font-size:14px;color:#444;line-height:1.5">${message}</p>
        ${detailsHtml}
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
        <p style="margin:0;font-size:12px;color:#999">This is an automated message from Revive Market Cameroon. Please do not reply directly.</p>
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  try {
    const info = await transporter.sendMail({
      from: FROM,
      to,
      subject: `${label}: ${title}`,
      html,
    });
    console.log(`Email sent to ${to}: ${info.messageId}`);
  } catch (err) {
    console.error(`Failed to send email to ${to}:`, err.message);
  }
}

export async function emailAdmin({ title, message, type, details }) {
  try {
    const [admins] = await pool.query("SELECT email, name FROM users WHERE role = 'admin' AND email IS NOT NULL");
    for (const admin of admins) {
      await sendEmailNotification({ to: admin.email, subject: title, title, message, type, details });
    }
  } catch (err) {
    console.error("Failed to email admins:", err.message);
  }
}

export async function emailUser({ userId, title, message, type, details }) {
  try {
    const [users] = await pool.query("SELECT email, name FROM users WHERE id = ? AND email IS NOT NULL", [userId]);
    if (!users.length) return;
    await sendEmailNotification({ to: users[0].email, subject: title, title, message, type, details });
  } catch (err) {
    console.error("Failed to email user:", err.message);
  }
}


