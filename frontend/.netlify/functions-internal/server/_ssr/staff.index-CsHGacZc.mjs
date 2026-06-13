import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { g as getUser, i as isAuthenticated, r as repairsApi, a as sellRequestsApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import "../_libs/sonner.mjs";
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
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const SplitComponent = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [repairs, setRepairs] = reactExports.useState([]);
  const [intake, setIntake] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (!isAuthenticated()) {
      navigate({
        to: "/login",
        search: {
          redirect: "/staff"
        }
      });
      return;
    }
    repairsApi.list().then(setRepairs).catch(() => {
    });
    sellRequestsApi.list().then(setIntake).catch(() => {
    });
  }, []);
  if (!user) return null;
  const myJobs = user.role === "technician" ? repairs.filter((r) => r.technician_id === user.id) : repairs;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-2xl font-bold", children: [
        "Welcome, ",
        user.name.split(" ")[0]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        myJobs.length,
        " active jobs"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase", children: "Today's repairs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: myJobs.length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase", children: "Pending intake" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: intake.filter((s) => s.status === "Submitted" || s.status === "Under Review").length })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground uppercase", children: "Avg. turnaround" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold", children: "~2 days" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-3", children: "Assigned repair jobs" }),
      myJobs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center py-8 text-muted-foreground", children: "No assigned jobs" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Customer" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Issue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Priority" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Quote" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: myJobs.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.customer_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: r.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: r.issue }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: r.priority === "High" ? "bg-destructive text-destructive-foreground" : r.priority === "Normal" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground", children: r.priority }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: r.quote ? fcfa(r.quote) : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: r.status }) })
        ] }, r.id)) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold mb-3", children: "Device intake & grading tasks" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Device" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "IMEI Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: intake.filter((s) => s.status === "Submitted" || s.status === "Under Review").map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: s.device_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: s.imei }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.imei_status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: s.status }) })
        ] }, s.id)) })
      ] })
    ] }) })
  ] });
};
export {
  SplitComponent as component
};
