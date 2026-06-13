import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as notFound } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster } from "../_libs/sonner.mjs";
import { o as objectType, s as stringType, c as coerce } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
const appCss = "/assets/styles-Ci-8qhLY.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$o = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "This is a platform which will revolutionize the way devices are sold, repaired and bought." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "This is a platform which will revolutionize the way devices are sold, repaired and bought." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Lovable App" },
      { name: "twitter:description", content: "This is a platform which will revolutionize the way devices are sold, repaired and bought." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/lerp1pS3ihg4Wp5panzefKuP0l92/social-images/social-1781298084060-WhatsApp_Image_2026-06-12_at_5.32.32_PM.webp" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/lerp1pS3ihg4Wp5panzefKuP0l92/social-images/social-1781298084060-WhatsApp_Image_2026-06-12_at_5.32.32_PM.webp" }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$o.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
  ] });
}
const $$splitComponentImporter$n = () => import("./staff-bf6dHCuF.mjs");
const Route$n = createFileRoute("/staff")({
  head: () => ({
    meta: [{
      title: "Staff — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./signup-CiSN4kh1.mjs");
const signupSearchSchema = objectType({
  redirect: stringType().optional()
});
const Route$m = createFileRoute("/signup")({
  validateSearch: signupSearchSchema,
  head: () => ({
    meta: [{
      title: "Create Account — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./sell-rQfDPwCG.mjs");
const Route$l = createFileRoute("/sell")({
  head: () => ({
    meta: [{
      title: "Sell Your Device — Revive Market"
    }, {
      name: "description",
      content: "Sell your phone, laptop, tablet or console to Revive Market. Free inspection and a fair offer."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./repair-qECpeAem.mjs");
const Route$k = createFileRoute("/repair")({
  head: () => ({
    meta: [{
      title: "Book a Repair — Revive Market"
    }, {
      name: "description",
      content: "Book a repair for your phone, laptop, tablet or console. Drop-off or pickup in Yaoundé."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./login-viDa9BTt.mjs");
const loginSearchSchema = objectType({
  redirect: stringType().optional()
});
const Route$j = createFileRoute("/login")({
  validateSearch: loginSearchSchema,
  head: () => ({
    meta: [{
      title: "Sign In — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./checkout-qbsHgvbZ.mjs");
const checkoutSearchSchema = objectType({
  device_id: coerce.number().optional()
});
const Route$i = createFileRoute("/checkout")({
  validateSearch: checkoutSearchSchema,
  head: () => ({
    meta: [{
      title: "Checkout — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./catalog-Cbf-I6HM.mjs");
const Route$h = createFileRoute("/catalog")({
  head: () => ({
    meta: [{
      title: "Browse Certified Devices — Revive Market"
    }, {
      name: "description",
      content: "Browse phones, laptops, tablets and consoles. Filter by grade, brand, city and price."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./admin-cUK64yR1.mjs");
const Route$g = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./account-C5NIRpmG.mjs");
const Route$f = createFileRoute("/account")({
  head: () => ({
    meta: [{
      title: "My Account — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./index-COSAcx6A.mjs");
const Route$e = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Revive Market — Smart Choice. Second Life. Better Tomorrow."
    }, {
      name: "description",
      content: "Buy, sell, repair, and certify second-hand phones, laptops, tablets and consoles in Cameroon. Yaoundé, Douala, Bafoussam."
    }, {
      property: "og:title",
      content: "Revive Market — Certified Second-Hand Electronics in Cameroon"
    }, {
      property: "og:description",
      content: "Escrow-protected purchases, IMEI verification, A/B/C grading, MTN MoMo & Orange Money."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./staff.index-CsHGacZc.mjs");
const Route$d = createFileRoute("/staff/")({
  head: () => ({
    meta: [{
      title: "My Job Queue — Revive Market Staff"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./admin.index-CZylNv8V.mjs");
const Route$c = createFileRoute("/admin/")({
  head: () => ({
    meta: [{
      title: "Admin Overview — Revive Market"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./staff.performance-DzzWQB19.mjs");
const Route$b = createFileRoute("/staff/performance")({
  head: () => ({
    meta: [{
      title: "My Performance — Revive Market Staff"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./staff.parts-D7O37uvc.mjs");
const Route$a = createFileRoute("/staff/parts")({
  head: () => ({
    meta: [{
      title: "Parts Request — Revive Market Staff"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./staff.jobs-Cxzhh044.mjs");
const Route$9 = createFileRoute("/staff/jobs")({
  head: () => ({
    meta: [{
      title: "Repair Jobs — Revive Market Staff"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./staff.grading-CfNBjIQA.mjs");
const Route$8 = createFileRoute("/staff/grading")({
  head: () => ({
    meta: [{
      title: "Device Grading — Revive Market Staff"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const TOKEN_KEY = "rm_token";
const USER_KEY = "rm_user";
function storeAuth(token, user) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
function getUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function isAuthenticated() {
  return !!getToken();
}
function hasRole(...roles) {
  const user = getUser();
  return user ? roles.includes(user.role) : false;
}
function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
const API_BASE = "http://localhost:3001/api";
const BRANCH_NAMES = ["Yaoundé"];
const CATEGORIES = ["Phones", "Laptops", "Tablets", "Consoles"];
const GRADES = ["A", "B", "C"];
class ApiError extends Error {
  status;
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
async function request(path, options = {}) {
  const token = getToken();
  const headers = {
    "Content-Type": "application/json",
    ...options.headers
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
  return data;
}
const authApi = {
  login: (email, password) => request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password })
  }),
  register: (data) => request("/auth/register", {
    method: "POST",
    body: JSON.stringify(data)
  })
};
const devicesApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/devices${qs}`);
  },
  listPaginated: (page, limit = 20, filters) => {
    const params = { ...filters, page: String(page), limit: String(limit) };
    const qs = "?" + new URLSearchParams(params).toString();
    return request(`/devices${qs}`);
  },
  featured: () => request("/devices/featured"),
  get: (id) => request(`/devices/${id}`),
  create: (data) => request("/devices", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/devices/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => request(`/devices/${id}`, { method: "DELETE" })
};
const ordersApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/orders${qs}`);
  },
  listPaginated: (page, limit = 20, filters) => {
    const params = { ...filters, page: String(page), limit: String(limit) };
    const qs = "?" + new URLSearchParams(params).toString();
    return request(`/orders${qs}`);
  },
  get: (id) => request(`/orders/${id}`),
  create: (data) => request("/orders", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id, status) => request(`/orders/${id}`, { method: "PUT", body: JSON.stringify({ status }) })
};
const sellRequestsApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/sell-requests${qs}`);
  },
  get: (id) => request(`/sell-requests/${id}`),
  create: (data) => request("/sell-requests", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/sell-requests/${id}`, { method: "PUT", body: JSON.stringify(data) })
};
const repairsApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/repair-jobs${qs}`);
  },
  get: (id) => request(`/repair-jobs/${id}`),
  create: (data) => request("/repair-jobs", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/repair-jobs/${id}`, { method: "PUT", body: JSON.stringify(data) })
};
const techniciansApi = {
  list: () => request("/technicians"),
  get: (id) => request(`/technicians/${id}`),
  performance: (id) => request(`/technicians/${id}/performance`),
  create: (data) => request("/technicians", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => request(`/technicians/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id) => request(`/technicians/${id}`, { method: "DELETE" })
};
const transactionsApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/transactions${qs}`);
  },
  updateEscrow: (id, escrow) => request(`/transactions/${id}/escrow`, { method: "PUT", body: JSON.stringify({ escrow }) })
};
const partsApi = {
  list: (params) => {
    const qs = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/part-requests${qs}`);
  },
  create: (data) => request("/part-requests", { method: "POST", body: JSON.stringify(data) }),
  updateStatus: (id, status) => request(`/part-requests/${id}`, { method: "PUT", body: JSON.stringify({ status }) })
};
const branchesApi = {
  list: () => request("/branches"),
  stats: () => request("/branches/stats")
};
const dashboardApi = {
  stats: () => request("/dashboard/stats")
};
const notificationsApi = {
  list: () => request("/notifications"),
  unreadCount: () => request("/notifications/unread-count"),
  markRead: (id) => request(`/notifications/${id}/read`, { method: "PUT" }),
  markAllRead: () => request("/notifications/read-all", { method: "PUT" })
};
const customersApi = {
  orders: (id) => request(`/customers/${id}/orders`),
  sellRequests: (id) => request(`/customers/${id}/sell-requests`),
  repairs: (id) => request(`/customers/${id}/repairs`),
  devices: (id) => request(`/customers/${id}/devices`)
};
const $$splitComponentImporter$7 = () => import("./product._id-ZRtXuzl-.mjs");
const $$splitErrorComponentImporter = () => import("./product._id-BUfgBDyc.mjs");
const $$splitNotFoundComponentImporter = () => import("./product._id-4L-ylUq_.mjs");
const Route$7 = createFileRoute("/product/$id")({
  head: ({
    params
  }) => ({
    meta: [{
      title: `Device — Revive Market`
    }]
  }),
  loader: async ({
    params
  }) => {
    const d = await devicesApi.get(Number(params.id));
    if (!d) throw notFound();
    return d;
  },
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent"),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./admin.technicians-eMmYbvdM.mjs");
const Route$6 = createFileRoute("/admin/technicians")({
  head: () => ({
    meta: [{
      title: "Technicians — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./admin.sell-requests-DTgfgzz1.mjs");
const Route$5 = createFileRoute("/admin/sell-requests")({
  head: () => ({
    meta: [{
      title: "Sell Requests — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./admin.repairs-VL0w4Ah-.mjs");
const Route$4 = createFileRoute("/admin/repairs")({
  head: () => ({
    meta: [{
      title: "Repair Jobs — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./admin.payments-CFdRQFOp.mjs");
const Route$3 = createFileRoute("/admin/payments")({
  head: () => ({
    meta: [{
      title: "Payments — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin.orders-BWV79EIJ.mjs");
const Route$2 = createFileRoute("/admin/orders")({
  head: () => ({
    meta: [{
      title: "Orders — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin.inventory-D-vAt8Lw.mjs");
const Route$1 = createFileRoute("/admin/inventory")({
  head: () => ({
    meta: [{
      title: "Inventory — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.branches-DsiDuJrj.mjs");
const Route = createFileRoute("/admin/branches")({
  head: () => ({
    meta: [{
      title: "Branches — Revive Market Admin"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const StaffRoute = Route$n.update({
  id: "/staff",
  path: "/staff",
  getParentRoute: () => Route$o
});
const SignupRoute = Route$m.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => Route$o
});
const SellRoute = Route$l.update({
  id: "/sell",
  path: "/sell",
  getParentRoute: () => Route$o
});
const RepairRoute = Route$k.update({
  id: "/repair",
  path: "/repair",
  getParentRoute: () => Route$o
});
const LoginRoute = Route$j.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$o
});
const CheckoutRoute = Route$i.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$o
});
const CatalogRoute = Route$h.update({
  id: "/catalog",
  path: "/catalog",
  getParentRoute: () => Route$o
});
const AdminRoute = Route$g.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$o
});
const AccountRoute = Route$f.update({
  id: "/account",
  path: "/account",
  getParentRoute: () => Route$o
});
const IndexRoute = Route$e.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$o
});
const StaffIndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => StaffRoute
});
const AdminIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => AdminRoute
});
const StaffPerformanceRoute = Route$b.update({
  id: "/performance",
  path: "/performance",
  getParentRoute: () => StaffRoute
});
const StaffPartsRoute = Route$a.update({
  id: "/parts",
  path: "/parts",
  getParentRoute: () => StaffRoute
});
const StaffJobsRoute = Route$9.update({
  id: "/jobs",
  path: "/jobs",
  getParentRoute: () => StaffRoute
});
const StaffGradingRoute = Route$8.update({
  id: "/grading",
  path: "/grading",
  getParentRoute: () => StaffRoute
});
const ProductIdRoute = Route$7.update({
  id: "/product/$id",
  path: "/product/$id",
  getParentRoute: () => Route$o
});
const AdminTechniciansRoute = Route$6.update({
  id: "/technicians",
  path: "/technicians",
  getParentRoute: () => AdminRoute
});
const AdminSellRequestsRoute = Route$5.update({
  id: "/sell-requests",
  path: "/sell-requests",
  getParentRoute: () => AdminRoute
});
const AdminRepairsRoute = Route$4.update({
  id: "/repairs",
  path: "/repairs",
  getParentRoute: () => AdminRoute
});
const AdminPaymentsRoute = Route$3.update({
  id: "/payments",
  path: "/payments",
  getParentRoute: () => AdminRoute
});
const AdminOrdersRoute = Route$2.update({
  id: "/orders",
  path: "/orders",
  getParentRoute: () => AdminRoute
});
const AdminInventoryRoute = Route$1.update({
  id: "/inventory",
  path: "/inventory",
  getParentRoute: () => AdminRoute
});
const AdminBranchesRoute = Route.update({
  id: "/branches",
  path: "/branches",
  getParentRoute: () => AdminRoute
});
const AdminRouteChildren = {
  AdminBranchesRoute,
  AdminInventoryRoute,
  AdminOrdersRoute,
  AdminPaymentsRoute,
  AdminRepairsRoute,
  AdminSellRequestsRoute,
  AdminTechniciansRoute,
  AdminIndexRoute
};
const AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
const StaffRouteChildren = {
  StaffGradingRoute,
  StaffJobsRoute,
  StaffPartsRoute,
  StaffPerformanceRoute,
  StaffIndexRoute
};
const StaffRouteWithChildren = StaffRoute._addFileChildren(StaffRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  AccountRoute,
  AdminRoute: AdminRouteWithChildren,
  CatalogRoute,
  CheckoutRoute,
  LoginRoute,
  RepairRoute,
  SellRoute,
  SignupRoute,
  StaffRoute: StaffRouteWithChildren,
  ProductIdRoute
};
const routeTree = Route$o._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  API_BASE as A,
  BRANCH_NAMES as B,
  CATEGORIES as C,
  GRADES as G,
  Route$i as R,
  sellRequestsApi as a,
  authApi as b,
  customersApi as c,
  devicesApi as d,
  dashboardApi as e,
  Route$7 as f,
  getUser as g,
  hasRole as h,
  isAuthenticated as i,
  transactionsApi as j,
  getToken as k,
  logout as l,
  branchesApi as m,
  notificationsApi as n,
  ordersApi as o,
  partsApi as p,
  router as q,
  repairsApi as r,
  storeAuth as s,
  techniciansApi as t
};
