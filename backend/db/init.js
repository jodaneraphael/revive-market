import mysql from "mysql2/promise";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function init() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    multipleStatements: true,
  });

  const schema = readFileSync(join(__dirname, "schema.sql"), "utf8");
  const seed = readFileSync(join(__dirname, "seed.sql"), "utf8");

  try {
    await connection.query("DROP DATABASE IF EXISTS revive_market");
    console.log("Running schema...");
    await connection.query(schema);
    console.log("Running seed data...");
    await connection.query(seed);
    console.log("Database initialized successfully!");
  } catch (err) {
    console.error("Database init failed:", err.message);
    process.exit(1);
  } finally {
    await connection.end();
  }
}

init();
