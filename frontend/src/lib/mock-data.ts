export type Grade = "A" | "B" | "C";
export type Category = "Phones" | "Laptops" | "Tablets" | "Consoles";
export type Branch = "Yaoundé" | "Douala" | "Bafoussam";

export const BRANCHES: Branch[] = ["Yaoundé", "Douala", "Bafoussam"];
export const CATEGORIES: Category[] = ["Phones", "Laptops", "Tablets", "Consoles"];
export const GRADES: Grade[] = ["A", "B", "C"];

export const GRADE_INFO: Record<Grade, { label: string; warrantyDays: number; desc: string }> = {
  A: { label: "Grade A — Like New", warrantyDays: 90, desc: "Minimal signs of use, fully tested, battery health >90%." },
  B: { label: "Grade B — Very Good", warrantyDays: 60, desc: "Light cosmetic wear, fully functional, battery health >80%." },
  C: { label: "Grade C — Good", warrantyDays: 30, desc: "Visible wear, fully functional, battery health >70%." },
};

export const fcfa = (n: number) => `${n.toLocaleString("fr-FR").replace(/\u202f/g, ",")} FCFA`;

export interface Device {
  id: string;
  trackingId: string;
  name: string;
  brand: string;
  category: Category;
  grade: Grade;
  price: number;
  branch: Branch;
  status: "In Stock" | "Sold" | "In Repair" | "Reserved";
  imei: string;
  specs: string[];
  condition: string;
  image: string;
}

// Curated free Unsplash photos
const img = (q: string) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=800&q=70`;

export const DEVICES: Device[] = [
  { id: "d1", trackingId: "RM-YDE-00123", name: "iPhone 11 64GB", brand: "Apple", category: "Phones", grade: "A", price: 185000, branch: "Yaoundé", status: "In Stock", imei: "356789102345678", specs: ["6.1\" Liquid Retina", "A13 Bionic", "64GB / 4GB RAM", "Battery 89%"], condition: "Minimal scratches on frame, screen pristine.", image: img("photo-1592750475338-74b7b21085ab") },
  { id: "d2", trackingId: "RM-DLA-00088", name: "Samsung Galaxy A14", brand: "Samsung", category: "Phones", grade: "B", price: 78000, branch: "Douala", status: "In Stock", imei: "352145789632147", specs: ["6.6\" PLS LCD", "Helio G80", "128GB / 4GB"], condition: "Light wear on back panel.", image: img("photo-1610945415295-d9bbf067e59c") },
  { id: "d3", trackingId: "RM-BAF-00041", name: "Tecno Camon 20", brand: "Tecno", category: "Phones", grade: "B", price: 95000, branch: "Bafoussam", status: "In Stock", imei: "356123789654123", specs: ["6.67\" AMOLED", "Helio G85", "256GB / 8GB"], condition: "Excellent screen, minor edge wear.", image: img("photo-1511707171634-5f897ff02aa9") },
  { id: "d4", trackingId: "RM-YDE-00131", name: "iPhone 12 Pro 128GB", brand: "Apple", category: "Phones", grade: "A", price: 285000, branch: "Yaoundé", status: "In Stock", imei: "357412589632147", specs: ["6.1\" Super Retina XDR", "A14 Bionic", "128GB / 6GB", "Battery 91%"], condition: "Like new, original box included.", image: img("photo-1603891128711-11b4b03bb138") },
  { id: "d5", trackingId: "RM-DLA-00102", name: "HP EliteBook 840 G6", brand: "HP", category: "Laptops", grade: "B", price: 235000, branch: "Douala", status: "In Stock", imei: "HP840G6-7732", specs: ["14\" FHD", "Intel i5-8265U", "16GB / 256GB SSD"], condition: "Keyboard slightly worn, screen clean.", image: img("photo-1496181133206-80ce9b88a853") },
  { id: "d6", trackingId: "RM-YDE-00145", name: "Lenovo ThinkPad T480", brand: "Lenovo", category: "Laptops", grade: "A", price: 280000, branch: "Yaoundé", status: "In Stock", imei: "TP-T480-9921", specs: ["14\" FHD IPS", "Intel i7-8650U", "16GB / 512GB SSD"], condition: "Refurbished, new battery installed.", image: img("photo-1525547719571-a2d4ac8945e2") },
  { id: "d7", trackingId: "RM-BAF-00052", name: "Dell Latitude 7490", brand: "Dell", category: "Laptops", grade: "C", price: 165000, branch: "Bafoussam", status: "In Stock", imei: "DL7490-3321", specs: ["14\" FHD", "Intel i5-8350U", "8GB / 256GB SSD"], condition: "Visible wear, fully functional.", image: img("photo-1593642632559-0c6d3fc62b89") },
  { id: "d8", trackingId: "RM-DLA-00115", name: "Samsung Galaxy Tab A8", brand: "Samsung", category: "Tablets", grade: "A", price: 135000, branch: "Douala", status: "In Stock", imei: "GT-A8-77129", specs: ["10.5\" LCD", "Unisoc T618", "64GB / 4GB"], condition: "Mint condition with cover.", image: img("photo-1561154464-82e9adf32764") },
  { id: "d9", trackingId: "RM-YDE-00150", name: "iPad 9th Gen 64GB", brand: "Apple", category: "Tablets", grade: "B", price: 195000, branch: "Yaoundé", status: "Sold", imei: "IPAD9-44218", specs: ["10.2\" Retina", "A13 Bionic", "64GB"], condition: "Light scratches on back.", image: img("photo-1544244015-0df4b3ffc6b0") },
  { id: "d10", trackingId: "RM-DLA-00121", name: "PlayStation 4 Slim 1TB", brand: "Sony", category: "Consoles", grade: "B", price: 145000, branch: "Douala", status: "In Stock", imei: "PS4S-99213", specs: ["1TB HDD", "2 Controllers", "3 Games included"], condition: "Working perfectly, slight controller wear.", image: img("photo-1486401899868-0e435ed85128") },
  { id: "d11", trackingId: "RM-YDE-00158", name: "PlayStation 4 Pro 1TB", brand: "Sony", category: "Consoles", grade: "A", price: 210000, branch: "Yaoundé", status: "In Stock", imei: "PS4P-66128", specs: ["1TB HDD", "4K HDR", "2 Controllers"], condition: "Excellent condition, original box.", image: img("photo-1606144042614-b2417e99c4e3") },
  { id: "d12", trackingId: "RM-BAF-00059", name: "Xiaomi Redmi Note 11", brand: "Xiaomi", category: "Phones", grade: "A", price: 110000, branch: "Bafoussam", status: "In Stock", imei: "RN11-55432", specs: ["6.43\" AMOLED", "Snapdragon 680", "128GB / 6GB"], condition: "Like new with screen protector.", image: img("photo-1567581935884-3349723552ca") },
  { id: "d13", trackingId: "RM-DLA-00128", name: "MacBook Air M1 256GB", brand: "Apple", category: "Laptops", grade: "A", price: 350000, branch: "Douala", status: "In Stock", imei: "MBA-M1-22113", specs: ["13.3\" Retina", "Apple M1", "8GB / 256GB SSD"], condition: "Mint, battery cycles <100.", image: img("photo-1517336714731-489689fd1ca8") },
  { id: "d14", trackingId: "RM-YDE-00162", name: "Infinix Hot 30", brand: "Infinix", category: "Phones", grade: "C", price: 45000, branch: "Yaoundé", status: "In Stock", imei: "INF30-77721", specs: ["6.78\" IPS", "Helio G88", "128GB / 4GB"], condition: "Scratches on screen edge.", image: img("photo-1565849904461-04a58ad377e0") },
  { id: "d15", trackingId: "RM-BAF-00063", name: "Lenovo Tab M10", brand: "Lenovo", category: "Tablets", grade: "B", price: 88000, branch: "Bafoussam", status: "In Stock", imei: "LT-M10-33287", specs: ["10.1\" HD", "Helio P22T", "32GB / 3GB"], condition: "Good shape, minor wear.", image: img("photo-1585790050230-5dd28404ccb9") },
];

export interface Order {
  id: string;
  customer: string;
  deviceName: string;
  price: number;
  city: Branch;
  status: "Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
  payment: "MTN MoMo" | "Orange Money" | "Pay on Delivery";
  trackingId: string;
  date: string;
}

export const ORDERS: Order[] = [
  { id: "o1", customer: "Jean Mbarga", deviceName: "iPhone 11 64GB", price: 185000, city: "Yaoundé", status: "Out for Delivery", payment: "MTN MoMo", trackingId: "RM-YDE-00123", date: "2026-06-09" },
  { id: "o2", customer: "Aïssa Foka", deviceName: "Samsung Galaxy A14", price: 78000, city: "Douala", status: "Delivered", payment: "Orange Money", trackingId: "RM-DLA-00088", date: "2026-06-05" },
  { id: "o3", customer: "Paul Nkomo", deviceName: "HP EliteBook 840 G6", price: 235000, city: "Douala", status: "Processing", payment: "MTN MoMo", trackingId: "RM-DLA-00102", date: "2026-06-11" },
  { id: "o4", customer: "Marie Tchamba", deviceName: "iPad 9th Gen", price: 195000, city: "Yaoundé", status: "Delivered", payment: "Pay on Delivery", trackingId: "RM-YDE-00150", date: "2026-05-29" },
  { id: "o5", customer: "Ousmane Diallo", deviceName: "Tecno Camon 20", price: 95000, city: "Bafoussam", status: "Processing", payment: "Orange Money", trackingId: "RM-BAF-00041", date: "2026-06-10" },
  { id: "o6", customer: "Cynthia Eyenga", deviceName: "PS4 Slim 1TB", price: 145000, city: "Douala", status: "Out for Delivery", payment: "MTN MoMo", trackingId: "RM-DLA-00121", date: "2026-06-08" },
  { id: "o7", customer: "Brice Talla", deviceName: "MacBook Air M1", price: 350000, city: "Douala", status: "Delivered", payment: "MTN MoMo", trackingId: "RM-DLA-00128", date: "2026-05-22" },
];

export interface SellRequest {
  id: string;
  customer: string;
  device: string;
  category: Category;
  imei: string;
  imeiStatus: "Verified" | "Flagged" | "Pending";
  status: "Submitted" | "Under Review" | "Offer Made" | "Accepted" | "Declined" | "Paid";
  offer?: number;
  city: Branch;
  date: string;
}

export const SELL_REQUESTS: SellRequest[] = [
  { id: "s1", customer: "Jean Mbarga", device: "iPhone X 64GB", category: "Phones", imei: "356789102345111", imeiStatus: "Verified", status: "Offer Made", offer: 95000, city: "Yaoundé", date: "2026-06-08" },
  { id: "s2", customer: "Aïssa Foka", device: "Tecno Spark 10", category: "Phones", imei: "356123789654999", imeiStatus: "Verified", status: "Under Review", city: "Douala", date: "2026-06-10" },
  { id: "s3", customer: "Anonymous", device: "iPhone 13 128GB", category: "Phones", imei: "357412589632000", imeiStatus: "Flagged", status: "Submitted", city: "Douala", date: "2026-06-11" },
  { id: "s4", customer: "Marie Tchamba", device: "Lenovo IdeaPad 3", category: "Laptops", imei: "LI3-77821", imeiStatus: "Verified", status: "Accepted", offer: 145000, city: "Yaoundé", date: "2026-06-02" },
  { id: "s5", customer: "Ousmane Diallo", device: "Samsung Galaxy Tab A7", category: "Tablets", imei: "GT-A7-21345", imeiStatus: "Verified", status: "Paid", offer: 65000, city: "Bafoussam", date: "2026-05-25" },
  { id: "s6", customer: "Cynthia Eyenga", device: "Xbox One S", category: "Consoles", imei: "XB1S-99001", imeiStatus: "Pending", status: "Submitted", city: "Douala", date: "2026-06-11" },
];

export interface RepairJob {
  id: string;
  customer: string;
  device: string;
  issue: string;
  branch: Branch;
  technician: string;
  status: "Received" | "Diagnosing" | "Awaiting Parts" | "In Repair" | "Ready" | "Completed";
  quote?: number;
  quoteApproved?: boolean;
  priority: "Low" | "Normal" | "High";
  date: string;
}

export const REPAIRS: RepairJob[] = [
  { id: "r1", customer: "Paul Nkomo", device: "iPhone 11", issue: "Cracked screen", branch: "Yaoundé", technician: "Eric Tabi", status: "In Repair", quote: 45000, quoteApproved: true, priority: "High", date: "2026-06-09" },
  { id: "r2", customer: "Marie Tchamba", device: "HP Pavilion 15", issue: "Won't power on", branch: "Douala", technician: "Sandrine Mballa", status: "Diagnosing", priority: "Normal", date: "2026-06-10" },
  { id: "r3", customer: "Ousmane Diallo", device: "Samsung Galaxy A52", issue: "Battery drains fast", branch: "Bafoussam", technician: "Yannick Foko", status: "Awaiting Parts", quote: 22000, quoteApproved: true, priority: "Normal", date: "2026-06-07" },
  { id: "r4", customer: "Aïssa Foka", device: "PS4 Slim", issue: "HDMI port broken", branch: "Douala", technician: "Sandrine Mballa", status: "Ready", quote: 35000, quoteApproved: true, priority: "Normal", date: "2026-06-04" },
  { id: "r5", customer: "Brice Talla", device: "MacBook Pro 2017", issue: "Keyboard not responsive", branch: "Douala", technician: "Sandrine Mballa", status: "Received", priority: "Low", date: "2026-06-11" },
  { id: "r6", customer: "Cynthia Eyenga", device: "iPad Air 2", issue: "Touch unresponsive on top", branch: "Yaoundé", technician: "Eric Tabi", status: "Completed", quote: 28000, quoteApproved: true, priority: "Normal", date: "2026-05-30" },
];

export interface Technician {
  id: string;
  name: string;
  branch: Branch;
  activeJobs: number;
  completedJobs: number;
  rating: number;
  avgTurnaround: string;
}

export const TECHNICIANS: Technician[] = [
  { id: "t1", name: "Eric Tabi", branch: "Yaoundé", activeJobs: 4, completedJobs: 38, rating: 4.8, avgTurnaround: "2.1 days" },
  { id: "t2", name: "Sandrine Mballa", branch: "Douala", activeJobs: 6, completedJobs: 52, rating: 4.9, avgTurnaround: "1.8 days" },
  { id: "t3", name: "Yannick Foko", branch: "Bafoussam", activeJobs: 3, completedJobs: 27, rating: 4.6, avgTurnaround: "2.5 days" },
  { id: "t4", name: "Patrick Owono", branch: "Yaoundé", activeJobs: 2, completedJobs: 41, rating: 4.7, avgTurnaround: "2.0 days" },
  { id: "t5", name: "Linda Ngo", branch: "Douala", activeJobs: 5, completedJobs: 33, rating: 4.5, avgTurnaround: "2.3 days" },
];

export interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  method: "MTN MoMo" | "Orange Money" | "Pay on Delivery";
  escrow: "Held" | "Released" | "N/A";
  date: string;
}

export const TRANSACTIONS: Transaction[] = [
  { id: "tx1", orderId: "o1", customer: "Jean Mbarga", amount: 185000, method: "MTN MoMo", escrow: "Held", date: "2026-06-09" },
  { id: "tx2", orderId: "o2", customer: "Aïssa Foka", amount: 78000, method: "Orange Money", escrow: "Released", date: "2026-06-05" },
  { id: "tx3", orderId: "o3", customer: "Paul Nkomo", amount: 235000, method: "MTN MoMo", escrow: "Held", date: "2026-06-11" },
  { id: "tx4", orderId: "o4", customer: "Marie Tchamba", amount: 195000, method: "Pay on Delivery", escrow: "N/A", date: "2026-05-29" },
  { id: "tx5", orderId: "o5", customer: "Ousmane Diallo", amount: 95000, method: "Orange Money", escrow: "Held", date: "2026-06-10" },
  { id: "tx6", orderId: "o6", customer: "Cynthia Eyenga", amount: 145000, method: "MTN MoMo", escrow: "Held", date: "2026-06-08" },
  { id: "tx7", orderId: "o7", customer: "Brice Talla", amount: 350000, method: "MTN MoMo", escrow: "Released", date: "2026-05-22" },
];

export const CUSTOMER_DEVICES = [
  { id: "cd1", name: "iPhone 11 64GB", trackingId: "RM-YDE-00123", purchaseDate: "2026-06-09", warrantyEnd: "2026-09-07", grade: "A" as Grade },
  { id: "cd2", name: "Samsung Galaxy Tab A8", trackingId: "RM-DLA-00099", purchaseDate: "2026-03-12", warrantyEnd: "2026-06-10", grade: "A" as Grade },
];

export const SALES_BY_CITY = [
  { city: "Yaoundé", sales: 1850000 },
  { city: "Douala", sales: 2240000 },
  { city: "Bafoussam", sales: 985000 },
];

export const INVENTORY_BY_GRADE = [
  { grade: "Grade A", count: 6 },
  { grade: "Grade B", count: 5 },
  { grade: "Grade C", count: 3 },
];