import { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notificationsApi, type Notification } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { isAuthenticated } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";

const typeIcons: Record<string, string> = {
  order: "🛒",
  sell: "💰",
  repair: "🔧",
  general: "📢",
};

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) return;
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
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
        notificationsApi.unreadCount(),
      ]);
      setNotifications(list.slice(0, 10));
      setUnread(count);
    } catch {}
  };

  const markRead = async (id: number) => {
    try {
      await notificationsApi.markRead(id);
      load();
    } catch {}
  };

  const markAllRead = async () => {
    try {
      await notificationsApi.markAllRead();
      load();
    } catch {}
  };

  const handleClick = (n: Notification) => {
    markRead(n.id);
    setOpen(false);
    if (n.reference_type === "order") navigate({ to: "/account" });
    else if (n.reference_type === "repair_job") navigate({ to: "/account" });
    else if (n.reference_type === "sell_request") navigate({ to: "/account" });
  };

  if (!isAuthenticated()) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <Button variant="ghost" size="sm" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="h-4 w-4" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border bg-card shadow-lg z-50">
          <div className="flex items-center justify-between px-3 py-2 border-b">
            <span className="text-sm font-semibold">Notifications</span>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-accent hover:underline">
                Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-3 py-6 text-center text-xs text-muted-foreground">No notifications yet</div>
            ) : (
              notifications.map((n) => (
                <button
                  key={n.id}
                  onClick={() => handleClick(n)}
                  className={`w-full text-left px-3 py-2.5 border-b last:border-b-0 hover:bg-muted/50 transition-colors ${!n.is_read ? "bg-accent/5" : ""}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg mt-0.5">{typeIcons[n.type] || "📢"}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{n.title}</div>
                      <div className="text-xs text-muted-foreground truncate">{n.message}</div>
                      <div className="text-[10px] text-muted-foreground/60 mt-0.5">
                        {new Date(n.created_at).toLocaleDateString()} {new Date(n.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>
                    {!n.is_read && <span className="h-2 w-2 rounded-full bg-accent shrink-0 mt-1.5" />}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
