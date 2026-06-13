import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as CustomerLayout } from "./CustomerLayout-Ceu3AUAt.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-D_u1EXWn.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { G as GradeBadge } from "./GradeBadge-nHLpevpX.mjs";
import { g as getUser, i as isAuthenticated, c as customersApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import "../_libs/sonner.mjs";
import { c as LoaderCircle, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
import "./NotificationBell-D0D7moRf.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function Account() {
  const navigate = useNavigate();
  const user = getUser();
  const [orders, setOrders] = reactExports.useState([]);
  const [sellRequests, setSellRequests] = reactExports.useState([]);
  const [repairs, setRepairs] = reactExports.useState([]);
  const [devices, setDevices] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (!isAuthenticated() || !user) {
      navigate({
        to: "/login",
        search: {
          redirect: "/account"
        }
      });
      return;
    }
    Promise.all([customersApi.orders(user.id).catch(() => []), customersApi.sellRequests(user.id).catch(() => []), customersApi.repairs(user.id).catch(() => []), customersApi.devices(user.id).catch(() => [])]).then(([o, s, r, d]) => {
      setOrders(o);
      setSellRequests(s);
      setRepairs(r);
      setDevices(d);
    }).finally(() => setLoading(false));
  }, []);
  if (!isAuthenticated() || !user) return null;
  const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin mr-2" }),
    "Loading..."
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-white text-xl font-bold", children: initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: user.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          user.email,
          " · ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-accent text-accent-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-3 w-3 mr-1" }),
            "ID Verified"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "orders", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid w-full grid-cols-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "orders", children: "Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "sells", children: "Sell Requests" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "repairs", children: "Repairs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "warranty", children: "Warranty" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "profile", children: "Profile" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "orders", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Order" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Payment" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: o.tracking_id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: o.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: o.city }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: o.payment_method }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: fcfa(o.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: o.status }) })
        ] }, o.id)) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "sells", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI Check" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Offer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: sellRequests.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: s.imei }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.imei_status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.offer ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fcfa(s.offer) }) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.status === "Offer Made" && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: "Accept" }) })
        ] }, s.id)) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "repairs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Branch" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Quote" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, {})
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: repairs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: r.issue }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.branch_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.quote ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fcfa(r.quote) }) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.quote && !r.quote_approved && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "Approve quote" }) })
        ] }, r.id)) })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "warranty", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 gap-4", children: devices.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground font-mono", children: d.tracking_id }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground mt-1", children: [
            "Purchased ",
            new Date(d.purchase_date).toLocaleDateString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: d.grade }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Warranty until" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-accent", children: new Date(d.warranty_end).toLocaleDateString() })
          ] })
        ] })
      ] }) }, d.id)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-6 space-y-4 max-w-lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Full name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: user.name })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-muted-foreground uppercase", children: "Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: user.phone })
        ] })
      ] }) }) })
    ] })
  ] }) });
}
export {
  Account as component
};
