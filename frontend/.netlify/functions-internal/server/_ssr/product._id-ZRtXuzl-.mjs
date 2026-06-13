import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CustomerLayout } from "./CustomerLayout-Ceu3AUAt.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { G as GradeBadge } from "./GradeBadge-nHLpevpX.mjs";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-CxFG_eHv.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { G as GRADE_INFO, f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import { f as Route$7 } from "./router-C1fwZHmB.mjs";
import "../_libs/sonner.mjs";
import { u as ArrowLeft, C as Check, S as ShieldCheck, h as ScanLine, v as Truck } from "../_libs/lucide-react.mjs";
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
import "../_libs/class-variance-authority.mjs";
import "./badge-DyfXZgLs.mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function ProductPage() {
  const d = Route$7.useLoaderData();
  const [pay, setPay] = reactExports.useState("momo");
  let specs = [];
  try {
    specs = d.specs ? JSON.parse(d.specs) : [];
  } catch {
    specs = [];
  }
  const gi = d.grade === "A" ? GRADE_INFO.A : d.grade === "B" ? GRADE_INFO.B : GRADE_INFO.C;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalog", className: "inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4 mr-1" }),
      " Back to catalog"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-2xl overflow-hidden bg-muted border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: d.name, className: "h-full w-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-2", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square rounded-lg overflow-hidden bg-muted border opacity-60 hover:opacity-100 cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: "", className: "h-full w-full object-cover" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
          d.brand,
          " · ",
          d.category,
          " · Tracking ",
          d.tracking_id
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-1 text-3xl font-bold text-foreground", children: d.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: d.grade }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            gi.label,
            " · ",
            gi.warrantyDays,
            "-day warranty"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 text-4xl font-bold text-primary", children: fcfa(d.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground", children: "Condition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: d.condition || d.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground italic", children: gi.desc })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground mb-2", children: "Specifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: specs.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "text-sm text-muted-foreground flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4 text-accent mt-0.5" }),
            s
          ] }, s)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold text-foreground mb-2", children: "Payment method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { value: pay, onValueChange: setPay, className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "momo", id: "momo" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-medium text-sm", children: [
                  "Pay online — MTN MoMo / Orange Money ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs text-accent", children: "Escrow protected" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Funds held until you confirm delivery." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "cod", id: "cod" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium text-sm", children: "Pay on Delivery" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Cash payment to our courier at handover." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "momo", className: "sr-only", children: "Payment" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "mt-5 w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", search: {
          device_id: d.id
        }, children: "Buy Now" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-accent" }),
            " ",
            gi.warrantyDays,
            "-day warranty"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanLine, { className: "h-4 w-4 text-accent" }),
            " IMEI verified"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "h-4 w-4 text-accent" }),
            " Delivery in ",
            d.branch_name
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  ProductPage as component
};
