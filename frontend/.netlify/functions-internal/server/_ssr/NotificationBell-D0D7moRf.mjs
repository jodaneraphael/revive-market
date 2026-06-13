import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { i as isAuthenticated, n as notificationsApi } from "./router-C1fwZHmB.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { D as Leaf, k as ShoppingCart, F as Bell } from "../_libs/lucide-react.mjs";
function Logo({ className = "" }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 ${className}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute text-lg font-black tracking-tight", children: "R" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "absolute -right-1 -top-1 h-3.5 w-3.5 text-accent-foreground bg-accent rounded-full p-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "absolute -bottom-1 -right-1 h-3.5 w-3.5 text-primary bg-white rounded-full p-0.5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col leading-tight", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Revive Market" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-wider text-muted-foreground", children: "Smart. Second Life." })
    ] })
  ] });
}
const typeIcons = {
  order: "🛒",
  sell: "💰",
  repair: "🔧",
  general: "📢"
};
function NotificationBell() {
  const [notifications, setNotifications] = reactExports.useState([]);
  const [unread, setUnread] = reactExports.useState(0);
  const [open, setOpen] = reactExports.useState(false);
  const dropdownRef = reactExports.useRef(null);
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated()) return;
    load();
    const interval = setInterval(load, 3e4);
    return () => clearInterval(interval);
  }, []);
  reactExports.useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const load = async () => {
    try {
      const [list, { count }] = await Promise.all([
        notificationsApi.list(),
        notificationsApi.unreadCount()
      ]);
      setNotifications(list.slice(0, 10));
      setUnread(count);
    } catch {
    }
  };
  const markRead = async (id) => {
    try {
      await notificationsApi.markRead(id);
      load();
    } catch {
    }
  };
  const markAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      load();
    } catch {
    }
  };
  const handleClick = (n) => {
    markRead(n.id);
    setOpen(false);
    if (n.reference_type === "order") navigate({ to: "/account" });
    else if (n.reference_type === "repair_job") navigate({ to: "/account" });
    else if (n.reference_type === "sell_request") navigate({ to: "/account" });
  };
  if (!isAuthenticated()) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: dropdownRef, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "relative", onClick: () => setOpen(!open), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
      unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground", children: unread > 9 ? "9+" : unread })
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute right-0 mt-2 w-80 rounded-lg border bg-card shadow-lg z-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-2 border-b", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold", children: "Notifications" }),
        unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: markAllRead, className: "text-xs text-accent hover:underline", children: "Mark all read" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-80 overflow-y-auto", children: notifications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-3 py-6 text-center text-xs text-muted-foreground", children: "No notifications yet" }) : notifications.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => handleClick(n),
          className: `w-full text-left px-3 py-2.5 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${!n.is_read ? "bg-accent/5" : ""}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg mt-0.5", children: typeIcons[n.type] || "📢" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-medium", children: n.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground truncate", children: n.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground/60 mt-0.5", children: [
                new Date(n.created_at).toLocaleDateString(),
                " ",
                new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
              ] })
            ] }),
            !n.is_read && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" })
          ] })
        },
        n.id
      )) })
    ] })
  ] });
}
export {
  Logo as L,
  NotificationBell as N
};
