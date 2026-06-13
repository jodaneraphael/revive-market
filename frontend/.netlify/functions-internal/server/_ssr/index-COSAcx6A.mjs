import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as CustomerLayout } from "./CustomerLayout-Ceu3AUAt.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { G as GradeBadge } from "./GradeBadge-nHLpevpX.mjs";
import { d as devicesApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import "../_libs/sonner.mjs";
import { R as Recycle, A as ArrowRight, M as MapPin, o as Smartphone, W as Wrench, p as Award, S as ShieldCheck, h as ScanLine, q as Wallet, r as Laptop, s as Tablet, G as Gamepad2 } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function Index() {
  const [featured, setFeatured] = reactExports.useState([]);
  reactExports.useEffect(() => {
    devicesApi.featured().then(setFeatured).catch(() => {
    });
  }, []);
  const quickActions = [{
    to: "/catalog",
    label: "Buy",
    desc: "Certified devices",
    icon: Smartphone,
    tint: "bg-primary text-primary-foreground"
  }, {
    to: "/sell",
    label: "Sell",
    desc: "Get a fair offer",
    icon: Recycle,
    tint: "bg-accent text-accent-foreground"
  }, {
    to: "/repair",
    label: "Repair",
    desc: "Book a technician",
    icon: Wrench,
    tint: "bg-primary text-primary-foreground"
  }, {
    to: "/catalog",
    label: "Certify",
    desc: "A / B / C grading",
    icon: Award,
    tint: "bg-accent text-accent-foreground"
  }];
  const trust = [{
    icon: ShieldCheck,
    title: "Escrow Protected",
    desc: "Funds held until delivery confirmed"
  }, {
    icon: ScanLine,
    title: "IMEI Verified",
    desc: "Every device cross-checked"
  }, {
    icon: Award,
    title: "Graded A / B / C",
    desc: "Transparent condition + warranty"
  }, {
    icon: Wallet,
    title: "MTN MoMo & Orange Money",
    desc: "Mobile payments accepted"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CustomerLayout, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden", style: {
      background: "var(--gradient-hero)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[size:24px_24px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Recycle, { className: "h-3.5 w-3.5" }),
            " Certified refurbished electronics"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 text-4xl md:text-6xl font-bold tracking-tight", children: [
            "Smart Choice. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            "Second Life. ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent-soft", children: "Better Tomorrow." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-white/85 max-w-xl", children: "Cameroon's trusted marketplace for second-hand phones, laptops, tablets and consoles — graded, warrantied, and escrow-protected." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-7 flex flex-wrap gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalog", children: [
              "Browse Devices ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "bg-white/10 border-white/30 text-white hover:bg-white/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sell", children: "Sell Yours" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              " Yaoundé"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              " Douala"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
              " Bafoussam"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden md:grid grid-cols-2 gap-4", children: featured.slice(0, 4).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-white/95 backdrop-blur p-3 shadow-xl hover:scale-[1.02] transition-transform", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: d.name, className: "aspect-square w-full rounded-xl object-cover", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground truncate", children: d.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: d.grade })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-primary", children: fcfa(d.price) })
        ] }, d.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 -mt-10 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-3", children: quickActions.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: a.to, className: "group", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-10 w-10 rounded-lg grid place-items-center ${a.tint}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(a.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-semibold text-foreground", children: a.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: a.desc })
    ] }) }) }, a.label)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-4 gap-4", children: trust.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 rounded-xl border bg-card p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-10 rounded-lg bg-accent-soft text-accent grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm text-foreground", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: t.desc })
      ] })
    ] }, t.title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl md:text-3xl font-bold text-foreground", children: "Featured Certified Devices" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Hand-inspected, graded and warrantied by Revive Market." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalog", children: [
          "See all ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: featured.slice(0, 8).map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/product/$id", params: {
        id: String(d.id)
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "overflow-hidden h-full hover:shadow-lg transition-shadow group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square overflow-hidden bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: d.name, className: "h-full w-full object-cover group-hover:scale-105 transition-transform", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: d.brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: d.grade })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-sm mt-1 line-clamp-1", children: d.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-bold text-primary", children: fcfa(d.price) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground mt-1", children: [
            "📍 ",
            d.branch_name
          ] })
        ] })
      ] }) }, d.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-primary-soft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-14", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground text-center", children: "Shop by category" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-4 gap-4", children: [{
        label: "Phones",
        icon: Smartphone
      }, {
        label: "Laptops",
        icon: Laptop
      }, {
        label: "Tablets",
        icon: Tablet
      }, {
        label: "Consoles",
        icon: Gamepad2
      }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/catalog", className: "rounded-xl bg-card border p-6 text-center hover:border-accent hover:shadow-md transition-all", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(c.icon, { className: "h-8 w-8 mx-auto text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 font-medium text-foreground", children: c.label })
      ] }, c.label)) })
    ] }) })
  ] });
}
export {
  Index as component
};
