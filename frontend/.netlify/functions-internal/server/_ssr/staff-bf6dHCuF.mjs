import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { I as InternalLayout, S as STAFF_NAV } from "./admin-nav-BqOKdITv.mjs";
import { i as isAuthenticated, h as hasRole } from "./router-C1fwZHmB.mjs";
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
import "./NotificationBell-D0D7moRf.mjs";
import "./button-DA2gxxPy.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
const SplitComponent = () => {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated() || !hasRole("staff", "admin")) {
      navigate({
        to: "/login",
        search: {
          redirect: "/staff"
        }
      });
    }
  }, []);
  if (!isAuthenticated() || !hasRole("staff", "admin")) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InternalLayout, { nav: STAFF_NAV, title: "Staff / Technician Portal", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) });
};
export {
  SplitComponent as component
};
