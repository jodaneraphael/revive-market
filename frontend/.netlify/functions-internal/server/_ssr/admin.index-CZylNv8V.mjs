import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DQ5v2DYb.mjs";
import { e as dashboardApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import "../_libs/sonner.mjs";
import { c as LoaderCircle, k as ShoppingCart, W as Wrench, l as ClipboardCheck, j as Package } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, X as XAxis, Y as YAxis, T as Tooltip, a as Bar, P as PieChart, b as Pie, C as Cell, L as Legend } from "../_libs/recharts.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
function AdminOverview() {
  const [data, setData] = reactExports.useState(null);
  reactExports.useEffect(() => {
    dashboardApi.stats().then(setData).catch(() => {
    });
  }, []);
  if (!data) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin mr-2" }),
    "Loading dashboard..."
  ] });
  const {
    kpis,
    sales_by_city,
    inventory_by_grade,
    recent_orders
  } = data;
  const kpiCards = [{
    label: "Total sales",
    value: fcfa(kpis.total_sales),
    icon: ShoppingCart,
    tint: "bg-accent-soft text-accent"
  }, {
    label: "Active repairs",
    value: kpis.active_repairs,
    icon: Wrench,
    tint: "bg-primary-soft text-primary"
  }, {
    label: "Pending sell-requests",
    value: kpis.pending_sell_requests,
    icon: ClipboardCheck,
    tint: "bg-warning/20 text-warning-foreground"
  }, {
    label: "Inventory in stock",
    value: kpis.inventory_in_stock,
    icon: Package,
    tint: "bg-accent-soft text-accent"
  }];
  const COLORS = ["#2E7D32", "#1F3864", "#E0A82E"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-4", children: kpiCards.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-12 w-12 rounded-xl grid place-items-center ${k.tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(k.icon, { className: "h-6 w-6" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase", children: k.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: k.value })
      ] })
    ] }) }, k.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-2 mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Sales by city (FCFA)" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: sales_by_city, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { dataKey: "city" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(YAxis, { tickFormatter: (v) => `${v / 1e3}k` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { formatter: (v) => fcfa(v) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "sales", fill: "#1F3864", radius: [6, 6, 0, 0] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Inventory by grade" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "h-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: inventory_by_grade, dataKey: "count", nameKey: "grade", innerRadius: 50, outerRadius: 90, children: inventory_by_grade.map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: COLORS[i] }, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, {})
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Recent orders" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recent_orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm border-b last:border-0 py-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: o.tracking_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: o.customer }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: o.device_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fcfa(o.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: o.status })
      ] }, o.id)) }) })
    ] })
  ] });
}
export {
  AdminOverview as component
};
