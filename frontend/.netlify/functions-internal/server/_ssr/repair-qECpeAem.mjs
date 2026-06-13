import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as CustomerLayout } from "./CustomerLayout-Ceu3AUAt.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { R as RadioGroup, a as RadioGroupItem } from "./radio-group-CxFG_eHv.mjs";
import { i as isAuthenticated, r as repairsApi } from "./router-C1fwZHmB.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { b as Clock, W as Wrench, M as MapPin } from "../_libs/lucide-react.mjs";
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
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-radio-group.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function RepairPage() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated()) {
      navigate({
        to: "/login",
        search: {
          redirect: "/repair"
        }
      });
    }
  }, []);
  const [deviceType, setDeviceType] = reactExports.useState("");
  const [deviceModel, setDeviceModel] = reactExports.useState("");
  const [issue, setIssue] = reactExports.useState("");
  const [delivery, setDelivery] = reactExports.useState("dropoff");
  const [loading, setLoading] = reactExports.useState(false);
  const submit = async () => {
    if (!deviceType || !deviceModel || !issue) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await repairsApi.create({
        device_name: deviceModel,
        category: deviceType,
        issue,
        branch_id: 1,
        delivery_method: delivery
      });
      toast.success("Repair request submitted! We'll call you within 1h.");
      setDeviceType("");
      setDeviceModel("");
      setIssue("");
      setDelivery("dropoff");
    } catch {
      toast.error("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };
  if (!isAuthenticated()) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Book a repair" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Certified technicians. Genuine parts. Transparent quotes." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid md:grid-cols-3 gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-5 w-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-semibold text-sm", children: "Avg. turnaround" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "2–3 business days" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Wrench, { className: "h-5 w-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-semibold text-sm", children: "No fix, no fee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Diagnostic is free" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card border p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5 text-accent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 font-semibold text-sm", children: "Yaoundé" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground", children: "Bastos branch" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Tell us about your device" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Device type" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: deviceType, onValueChange: setDeviceType, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Phones", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Laptops", children: "Laptop" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Tablets", children: "Tablet" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Consoles", children: "Console" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brand & model" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", placeholder: "e.g. iPhone 11, HP EliteBook 840", value: deviceModel, onChange: (e) => setDeviceModel(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Describe the issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "mt-1", rows: 4, placeholder: "Cracked screen, won't charge, slow performance...", value: issue, onChange: (e) => setIssue(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Drop-off or pickup?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { value: delivery, onValueChange: setDelivery, className: "mt-2 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "dropoff", className: "mr-2" }),
              "Drop-off at branch"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "pickup", className: "mr-2" }),
              "Pickup (2,000 FCFA)"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-primary-soft p-3 text-sm text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Estimated turnaround:" }),
          " 2–3 business days after diagnosis. You'll receive a free quote within 24h."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: loading, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: loading ? "Submitting..." : "Submit repair request" })
      ] })
    ] })
  ] }) });
}
export {
  RepairPage as component
};
