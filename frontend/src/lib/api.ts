import { getToken, logout } from "./auth";
import { API_BASE } from "./config";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (res.status === 401) {
    logout();
    window.location.href = "/login";
    throw new ApiError("Unauthorized", 401);
  }
  const data = await res.json();
  if (!res.ok) {
    throw new ApiError(data.error || data.errors?.[0]?.msg || "Request failed", res.status);
  }
  return data as T;
}

export interface Branch {
  id: number;
  name: string;
  address: string;
}

export interface Device {
  id: number;
  tracking_id: string;
  name: string;
  brand: string;
  category: string;
  grade: string;
  price: number;
  branch_id: number;
  branch_name: string;
  status: string;
  imei: string;
  specs: string;
  condition: string;
  image_url: string;
  description: string;
  created_at: string;
}

export interface Order {
  id: number;
  user_id: number;
  device_id: number;
  tracking_id: string;
  price: number;
  delivery_fee: number;
  total: number;
  city: string;
  address: string;
  payment_method: string;
  status: string;
  created_at: string;
  customer_name: string;
  device_name: string;
}

export interface SellRequest {
  id: number;
  user_id: number;
  device_name: string;
  category: string;
  imei: string;
  condition: string;
  description: string;
  photo_urls: string | null;
  id_doc_url: string | null;
  branch_id: number;
  branch_name: string;
  imei_status: string;
  status: string;
  offer: number | null;
  grade: string | null;
  created_at: string;
  customer_name: string;
}

export interface RepairJob {
  id: number;
  user_id: number;
  device_name: string;
  category: string;
  issue: string;
  branch_id: number;
  branch_name: string;
  technician_id: number | null;
  technician_name: string;
  status: string;
  delivery_method: string;
  quote: number | null;
  quote_approved: boolean;
  priority: string;
  created_at: string;
  updated_at: string;
  customer_name: string;
}

export interface Transaction {
  id: number;
  order_id: number;
  user_id: number;
  amount: number;
  method: string;
  escrow: string;
  created_at: string;
  customer_name: string;
  order_tracking: string;
}

export interface PartRequest {
  id: number;
  repair_job_id: number;
  part_name: string;
  quantity: number;
  status: string;
  created_at: string;
  device_name: string;
  job_status: string;
}

export interface Technician {
  id: number;
  name: string;
  email: string;
  phone: string;
  branch_id: number;
  branch_name: string;
  active_jobs: number;
  completed_jobs: number;
  rating: number;
}

export interface DashboardStats {
  kpis: {
    total_sales: number;
    active_repairs: number;
    pending_sell_requests: number;
    inventory_in_stock: number;
  };
  sales_by_city: { city: string; sales: number }[];
  inventory_by_grade: { grade: string; count: number }[];
  recent_orders: Order[];
}

export interface BranchStats extends Branch {
  inventory_count: number;
  total_sales: number;
  active_repairs: number;
  staff_count: number;
  staff_list: { id: number; name: string }[];
}

export interface TechPerformance {
  monthly: { month: string; total: number; completed: number }[];
  weekly: { week: string; jobs: number }[];
  feedback: { id: number; rating: number; message: string; customer_name: string; created_at: string }[];
  stats: { active_jobs: number; monthly_completed: number; avg_rating: number; avg_turnover_days: number };
}

// --- Auth ---
export const authApi = {
  login: (email: string, password: string) =>
    request<{ token: string; user: any }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  register: (data: { name: string; email: string; phone: string; password: string }) =>
    request<{ token: string; user: any }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// --- Devices ---
export const devicesApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<Device[]>(`/devices${qs}`);
  },
  listPaginated: (page: number, limit: number = 20, filters?: Record<string, string>) => {
    const params = { ...filters, page: String(page), limit: String(limit) };
    const qs = "?" + new URLSearchParams(params).toString();
    return request<PaginatedResult<Device>>(`/devices${qs}`);
  },
  featured: () => request<Device[]>("/devices/featured"),
  get: (id: number) => request<Device>(`/devices/${id}`),
  create: (data: Record<string, unknown>) =>
    request<Device>("/devices", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Record<string, unknown>) =>
    request<Device>(`/devices/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) =>
    request<{ message: string }>(`/devices/${id}`, { method: "DELETE" }),
};

// --- Orders ---
export const ordersApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<Order[]>(`/orders${qs}`);
  },
  listPaginated: (page: number, limit: number = 20, filters?: Record<string, string>) => {
    const params = { ...filters, page: String(page), limit: String(limit) };
    const qs = "?" + new URLSearchParams(params).toString();
    return request<PaginatedResult<Order>>(`/orders${qs}`);
  },
  get: (id: number) => request<Order>(`/orders/${id}`),
  create: (data: { device_id: number; payment_method: string; city: string; address: string }) =>
    request<Order>("/orders", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: number, status: string) =>
    request<Order>(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
};

// --- Sell Requests ---
export const sellRequestsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<SellRequest[]>(`/sell-requests${qs}`);
  },
  get: (id: number) => request<SellRequest>(`/sell-requests/${id}`),
  create: (data: { device_name: string; category: string; imei: string; condition?: string; description?: string; photo_urls?: string[]; id_doc_url?: string; branch_id?: number }) =>
    request<SellRequest>("/sell-requests", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Record<string, unknown>) =>
    request<SellRequest>(`/sell-requests/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

// --- Repair Jobs ---
export const repairsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<RepairJob[]>(`/repair-jobs${qs}`);
  },
  get: (id: number) => request<RepairJob>(`/repair-jobs/${id}`),
  create: (data: { device_name: string; category?: string; issue: string; branch_id: number; delivery_method?: string }) =>
    request<RepairJob>("/repair-jobs", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: Record<string, unknown>) =>
    request<RepairJob>(`/repair-jobs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
};

// --- Technicians ---
export const techniciansApi = {
  list: () => request<Technician[]>("/technicians"),
  get: (id: number) => request<any>(`/technicians/${id}`),
  performance: (id: number) => request<TechPerformance>(`/technicians/${id}/performance`),
  create: (data: { name: string; email: string; password: string; phone?: string; branch_id: number }) =>
    request<any>("/technicians", { method: "POST", body: JSON.stringify(data) }),
  update: (id: number, data: { name: string; email: string; phone?: string | null; branch_id: number }) =>
    request<any>(`/technicians/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: number) => request<{ message: string }>(`/technicians/${id}`, { method: "DELETE" }),
};

// --- Transactions ---
export const transactionsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<Transaction[]>(`/transactions${qs}`);
  },
  updateEscrow: (id: number, escrow: string) =>
    request<Transaction>(`/transactions/${id}/escrow`, { method: "PUT", body: JSON.stringify({ escrow }) }),
};

// --- Part Requests ---
export const partsApi = {
  list: (params?: Record<string, string>) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request<PartRequest[]>(`/part-requests${qs}`);
  },
  create: (data: { repair_job_id: number; part_name: string; quantity: number }) =>
    request<PartRequest>("/part-requests", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id: number, status: string) =>
    request<PartRequest>(`/part-requests/${id}`, { method: "PUT", body: JSON.stringify({ status }) }),
};

// --- Branches ---
export const branchesApi = {
  list: () => request<Branch[]>("/branches"),
  stats: () => request<BranchStats[]>("/branches/stats"),
};

// --- Dashboard ---
export const dashboardApi = {
  stats: () => request<DashboardStats>("/dashboard/stats"),
};

// --- Notifications ---
export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  type: "order" | "sell" | "repair" | "general";
  reference_id: number | null;
  reference_type: string | null;
  is_read: boolean;
  created_at: string;
}

export const notificationsApi = {
  list: () => request<Notification[]>("/notifications"),
  unreadCount: () => request<{ count: number }>("/notifications/unread-count"),
  markRead: (id: number) => request<{ success: boolean }>(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () => request<{ success: boolean }>("/notifications/read-all", { method: "PUT" }),
};

// --- Customers ---
export const customersApi = {
  orders: (id: number) => request<Order[]>(`/customers/${id}/orders`),
  sellRequests: (id: number) => request<SellRequest[]>(`/customers/${id}/sell-requests`),
  repairs: (id: number) => request<RepairJob[]>(`/customers/${id}/repairs`),
  devices: (id: number) =>
    request<(Device & { purchase_date: string; warranty_end: string })[]>(`/customers/${id}/devices`),
};
