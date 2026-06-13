import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { r as repairsApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as LoaderCircle } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./badge-DyfXZgLs.mjs";
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
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
const SplitComponent = () => {
  const [repairs, setRepairs] = reactExports.useState([]);
  const [selected, setSelected] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("");
  const [quote, setQuote] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    repairsApi.list().then((data) => {
      setRepairs(data);
      if (data.length) setSelected(data[0].id);
    }).catch(() => {
    });
  }, []);
  const job = repairs.find((r) => r.id === selected);
  reactExports.useEffect(() => {
    if (job) setStatus(job.status);
    if (job?.quote) setQuote(String(job.quote));
  }, [job?.id]);
  const update = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      const body = {
        status
      };
      if (quote) body.quote = Number(quote);
      await repairsApi.update(selected, body);
      toast.success("Job updated");
      repairsApi.list().then(setRepairs).catch(() => {
      });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (repairs.length === 0) return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-20 text-muted-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-6 w-6 animate-spin mr-2" }),
    "Loading jobs..."
  ] });
  if (!job) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[300px_1fr] gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-2 space-y-1", children: repairs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
      setSelected(r.id);
      setStatus(r.status);
      setQuote(r.quote ? String(r.quote) : "");
    }, className: `w-full text-left px-3 py-2 rounded-md text-sm transition ${selected === r.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: r.device_name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `text-xs ${selected === r.id ? "text-primary-foreground/70" : "text-muted-foreground"}`, children: [
        r.customer_name,
        " · ",
        r.status
      ] })
    ] }, r.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: job.device_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: job.status })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Customer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: job.customer_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Branch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: job.branch_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase text-muted-foreground", children: "Customer-reported issue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: job.issue })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Diagnosis notes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 3, placeholder: "What did you find?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Parts needed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. LCD screen, battery..." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quote amount (FCFA)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: quote, onChange: (e) => setQuote(e.target.value), placeholder: "0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Update status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: ["Received", "Diagnosing", "Awaiting Parts", "In Repair", "Ready", "Completed"].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
          ] })
        ] }),
        job.quote && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
          "Current quote: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: fcfa(job.quote) }),
          " · ",
          job.quote_approved ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Approved by customer" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-warning-foreground", children: "Awaiting approval" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: update, disabled: submitting, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: submitting ? "Saving..." : "Save updates" })
      ] })
    ] })
  ] });
};
export {
  SplitComponent as component
};
