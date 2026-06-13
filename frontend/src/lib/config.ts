export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";
export const DEV_MODE = import.meta.env.DEV || false;

export const BRANCH_NAMES = ["Yaoundé"] as const;
export type BranchName = (typeof BRANCH_NAMES)[number];

export const CATEGORIES = ["Phones", "Laptops", "Tablets", "Consoles"] as const;
export type Category = (typeof CATEGORIES)[number];

export const GRADES = ["A", "B", "C"] as const;
export type Grade = (typeof GRADES)[number];
