import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { p as partsApi, r as repairsApi } from "./router-C1fwZHmB.mjs";
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
import "./badge-DyfXZgLs.mjs";
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
  const [parts, setParts] = reactExports.useState([]);
  const [repairs, setRepairs] = reactExports.useState([]);
  const [partName, setPartName] = reactExports.useState("");
  const [qty, setQty] = reactExports.useState(1);
  const [jobId, setJobId] = reactExports.useState("");
  reactExports.useEffect(() => {
    partsApi.list().then(setParts).catch(() => {
    });
    repairsApi.list().then(setRepairs).catch(() => {
    });
  }, []);
  const submit = async () => {
    if (!partName || !jobId) {
      toast.error("Fill in all fields");
      return;
    }
    try {
      await partsApi.create({
        repair_job_id: Number(jobId),
        part_name: partName,
        quantity: qty
      });
      toast.success("Part request submitted");
      setPartName("");
      setQty(1);
      setJobId("");
      partsApi.list().then(setParts).catch(() => {
      });
    } catch (e) {
      toast.error(e.message);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-[1fr_360px] gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "My requests" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: parts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mx-auto mb-2" }),
        "Loading..."
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Part" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Qty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "For job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: parts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: p.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.part_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.quantity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: p.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: p.status === "Fulfilled" ? "Accepted" : p.status === "Released" ? "Released" : "Pending" }) })
        ] }, p.id)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "New request" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Part name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", placeholder: "e.g. iPhone 12 battery", value: partName, onChange: (e) => setPartName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Quantity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", className: "mt-1", value: qty, onChange: (e) => setQty(Number(e.target.value)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "For repair job" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: jobId, onValueChange: setJobId, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select job" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: repairs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: String(r.id), children: [
              r.id,
              " — ",
              r.device_name
            ] }, r.id)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: "Submit request" })
      ] })
    ] })
  ] });
};
export {
  SplitComponent as component
};
