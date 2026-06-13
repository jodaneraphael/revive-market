import { Router } from "express";
import multer from "multer";
import { join, extname } from "path";
import { randomUUID } from "crypto";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router();

const storage = multer.diskStorage({
  destination: join(__dirname, "..", "uploads", "images"),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    cb(null, allowed.includes(extname(file.originalname).toLowerCase()));
  },
});

router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image file provided" });
  const url = `/uploads/images/${req.file.filename}`;
  res.json({ url });
});

export default router;
