import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useRouterState, d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Logo, N as NotificationBell } from "./NotificationBell-D0D7moRf.mjs";
import { l as logout } from "./router-C1fwZHmB.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { e as LogOut, f as ListChecks, g as ClipboardList, h as ScanLine, P as PackageSearch, T as TrendingUp, i as LayoutDashboard, j as Package, k as ShoppingCart, l as ClipboardCheck, W as Wrench, m as Users, n as CreditCard, B as Building2 } from "../_libs/lucide-react.mjs";
function InternalLayout({ nav, title, children }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-muted/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-sidebar-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, { className: "[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs uppercase tracking-wider text-white/60", children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 p-3 space-y-1", children: nav.map((n) => {
        const active = path === n.to;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: n.to, className: `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`, children: [
          n.icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: n.label })
        ] }, n.to);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
        logout();
        window.location.href = "/";
      }, className: "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Sign Out" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Logo, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "hidden md:block font-semibold text-foreground", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: () => {
          logout();
          window.location.href = "/";
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 p-4 md:p-6 overflow-x-auto", children })
    ] })
  ] });
}
const ADMIN_NAV = [
  { to: "/admin", label: "Overview", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "h-4 w-4" }) },
  { to: "/admin/inventory", label: "Inventory", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "h-4 w-4" }) },
  { to: "/admin/orders", label: "Orders", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "h-4 w-4" }) },
  { to: "/admin/sell-requests", label: "Sell-Requests", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardCheck, { className: "h-4 w-4" }) },
  { to: "/admin/repairs", label: "Repair Jobs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-4 w-4" }) },
  { to: "/admin/technicians", label: "Technicians", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4" }) },
  { to: "/admin/payments", label: "Payments", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "h-4 w-4" }) },
  { to: "/admin/branches", label: "Branches", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }) }
];
const STAFF_NAV = [
  { to: "/staff", label: "My Job Queue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ListChecks, { className: "h-4 w-4" }) },
  { to: "/staff/jobs", label: "Repair Jobs", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ClipboardList, { className: "h-4 w-4" }) },
  { to: "/staff/grading", label: "Device Grading", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4" }) },
  { to: "/staff/parts", label: "Parts Request", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageSearch, { className: "h-4 w-4" }) },
  { to: "/staff/performance", label: "My Performance", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "h-4 w-4" }) }
];
export {
  ADMIN_NAV as A,
  InternalLayout as I,
  STAFF_NAV as S
};
