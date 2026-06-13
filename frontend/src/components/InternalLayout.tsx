import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";
import { NotificationBell } from "./NotificationBell";
import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export interface NavItem { to: string; label: string; icon: ReactNode; }

export function InternalLayout({ nav, title, children }: { nav: NavItem[]; title: string; children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex bg-muted/40">
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground">
        <div className="p-4 border-b border-sidebar-border">
          <Logo className="[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" />
          <div className="mt-2 text-xs uppercase tracking-wider text-white/60">{title}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {nav.map((n) => {
            const active = path === n.to;
            return (
              <Link key={n.to} to={n.to} className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${active ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}>
                {n.icon}<span>{n.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-sidebar-border">
          <button onClick={() => { logout(); window.location.href = "/"; }} className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <LogOut className="h-4 w-4" /><span>Sign Out</span>
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-background px-4">
          <div className="md:hidden"><Logo /></div>
          <h1 className="hidden md:block font-semibold text-foreground">{title}</h1>
          <NotificationBell />
          <Button variant="ghost" size="sm" onClick={() => { logout(); window.location.href = "/"; }}>
            <LogOut className="h-4 w-4" />
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6 overflow-x-auto">{children}</main>
      </div>
    </div>
  );
}