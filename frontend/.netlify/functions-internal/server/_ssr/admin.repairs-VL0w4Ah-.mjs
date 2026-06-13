import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { r as repairsApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DdaAQQFU.mjs";
import { c as LoaderCircle } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "./badge-DyfXZgLs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "./button-DA2gxxPy.mjs";
const REPAIR_STATUSES = ["Received", "Diagnosing", "Awaiting Parts", "In Repair", "Ready", "Completed"];
const SplitComponent = () => {
  const [repairs, setRepairs] = reactExports.useState([]);
  const [statusTarget, setStatusTarget] = reactExports.useState(null);
  const load = () => repairsApi.list().then(setRepairs).catch(() => {
  });
  reactExports.useEffect(() => {
    load();
  }, []);
  const updateStatus = async () => {
    if (!statusTarget) return;
    try {
      await repairsApi.update(statusTarget.job.id, {
        status: statusTarget.status
      });
      toast.success(`Repair #${statusTarget.job.id} → ${statusTarget.status}`);
      setStatusTarget(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold mb-4", children: [
      "Repair queue (",
      repairs.length,
      ")"
    ] }),
    repairs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
      "Loading..."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Issue" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Branch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Technician" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Quote" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Approval" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Update" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: repairs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.customer_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.device_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: r.issue }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.branch_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.technician_name || "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.quote ? fcfa(r.quote) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.quote ? /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.quote_approved ? "Accepted" : "Pending" }) : "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: (v) => setStatusTarget({
          job: r,
          status: v
        }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-8 w-32 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Change" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REPAIR_STATUSES.filter((s) => s !== r.status).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: s, children: s }, s)) })
        ] }) })
      ] }, r.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!statusTarget, onOpenChange: (o) => {
      if (!o) setStatusTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Update repair status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Change ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: statusTarget?.job.device_name }),
          " from ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: statusTarget?.job.status }),
          " to ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: statusTarget?.status }),
          "?"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: updateStatus, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: "Confirm" })
      ] })
    ] }) })
  ] });
};
export {
  SplitComponent as component
};
