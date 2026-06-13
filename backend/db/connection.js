import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { existsSync } from "fs";
if (existsSync(".env")) {
  console.warn("[DB] Loading .env file (overriding env vars)");
  dotenv.config();
}

console.log("[DB] Connecting with host:", process.env.DB_HOST, "database:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "revive_market",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
