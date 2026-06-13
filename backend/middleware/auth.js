import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "revive-market-jwt-secret-2026";

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, branch_id: user.branch_id },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required" });
  }
  try {
    req.user = jwt.verify(header.split(" ")[1], JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
}
