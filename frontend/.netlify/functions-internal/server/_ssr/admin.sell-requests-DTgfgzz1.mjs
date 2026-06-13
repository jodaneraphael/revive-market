import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { G as GRADES, a as sellRequestsApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DdaAQQFU.mjs";
import { c as LoaderCircle, K as FileText } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
const SplitComponent = () => {
  const [requests, setRequests] = reactExports.useState([]);
  const [offers, setOffers] = reactExports.useState({});
  const [grades, setGrades] = reactExports.useState({});
  const [acceptTarget, setAcceptTarget] = reactExports.useState(null);
  const [rejectTarget, setRejectTarget] = reactExports.useState(null);
  const load = () => sellRequestsApi.list().then(setRequests).catch(() => {
  });
  reactExports.useEffect(() => {
    load();
  }, []);
  const accept = async () => {
    if (!acceptTarget) return;
    const grade = grades[acceptTarget.id];
    if (!grade) {
      toast.error("Select a grade");
      setAcceptTarget(null);
      return;
    }
    try {
      const offer = offers[acceptTarget.id] ? Number(offers[acceptTarget.id]) : void 0;
      await sellRequestsApi.update(acceptTarget.id, {
        status: "Accepted",
        grade,
        offer
      });
      toast.success(`${acceptTarget.device_name} accepted, added to inventory`);
      setAcceptTarget(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };
  const reject = async () => {
    if (!rejectTarget) return;
    try {
      await sellRequestsApi.update(rejectTarget.id, {
        status: "Declined"
      });
      toast.success(`${rejectTarget.device_name} declined`);
      setRejectTarget(null);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold mb-4", children: [
      "Queue (",
      requests.length,
      ")"
    ] }),
    requests.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
      "Loading..."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Customer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI Check" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Offer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Docs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: requests.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: s.imei_status === "Flagged" ? "bg-destructive/5" : "", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.customer_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.device_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: s.imei }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.imei_status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: s.offer ? fcfa(s.offer) : /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "h-7 w-28", placeholder: "Amount", value: offers[s.id] || "", onChange: (e) => setOffers({
          ...offers,
          [s.id]: e.target.value
        }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 mr-1" }),
          "View"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "flex gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: grades[s.id] || "", onValueChange: (v) => setGrades({
            ...grades,
            [s.id]: v
          }), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "h-7 w-20 text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Grade" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", onClick: () => setAcceptTarget(s), className: "bg-accent hover:bg-accent/90 text-accent-foreground h-7 px-2 text-xs", children: "Accept" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setRejectTarget(s), className: "h-7 px-2 text-xs", children: "Reject" })
        ] })
      ] }, s.id)) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!acceptTarget, onOpenChange: (o) => {
      if (!o) setAcceptTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Accept device?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Accept ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: acceptTarget?.device_name }),
          " from ",
          acceptTarget?.customer_name,
          "? Grade: ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: grades[acceptTarget?.id || 0] || "not set" }),
          offers[acceptTarget?.id || 0] ? `, Offer: ${fcfa(Number(offers[acceptTarget?.id || 0]))}` : "",
          ". A new inventory device will be created."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: accept, className: "bg-accent text-accent-foreground hover:bg-accent/90", children: "Confirm accept" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!rejectTarget, onOpenChange: (o) => {
      if (!o) setRejectTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Reject device?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "Decline ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: rejectTarget?.device_name }),
          " from ",
          rejectTarget?.customer_name,
          "? This will mark the request as Declined."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: reject, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Reject" })
      ] })
    ] }) })
  ] });
};
export {
  SplitComponent as component
};
