import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { ShoppingBag, User, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ReactNode } from "react";
import { isAuthenticated, getUser, logout } from "@/lib/auth";
import { NotificationBell } from "./NotificationBell";

const nav = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Buy" },
  { to: "/sell", label: "Sell" },
  { to: "/repair", label: "Repair" },
];

export function CustomerLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const loggedIn = isAuthenticated();
  const user = getUser();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <Link to="/"><Logo /></Link>
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${path === n.to ? "text-primary bg-primary-soft" : "text-muted-foreground hover:text-foreground"}`}>{n.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <NotificationBell />
            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm"><User className="h-4 w-4" /><span className="hidden sm:inline text-xs ml-1">{user?.name?.split(" ")[0]}</span></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate({ to: "/account" })}><User className="mr-2 h-4 w-4" />Account</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { logout(); window.location.href = "/"; }}><LogOut className="mr-2 h-4 w-4" />Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="outline" size="sm"><Link to="/login"><LogIn className="h-4 w-4 mr-1" />Sign In</Link></Button>
            )}
            <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to="/checkout"><ShoppingBag className="h-4 w-4 mr-1" />Cart</Link></Button>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-primary text-primary-foreground/90 mt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 grid gap-8 md:grid-cols-4">
          <div>
            <Logo className="[&_span]:!text-white [&_.text-muted-foreground]:!text-white/60" />
            <p className="mt-3 text-sm text-white/70">Smart Choice. Second Life. Better Tomorrow.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Shop</h4>
            <ul className="space-y-1 text-sm text-white/70">
              <li><Link to="/catalog">Phones</Link></li>
              <li><Link to="/catalog">Laptops</Link></li>
              <li><Link to="/catalog">Tablets</Link></li>
              <li><Link to="/catalog">Consoles</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Services</h4>
            <ul className="space-y-1 text-sm text-white/70">
              <li><Link to="/sell">Sell your device</Link></li>
              <li><Link to="/repair">Book a repair</Link></li>
              <li>IMEI Verification</li>
              <li>Certification A/B/C</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Branches</h4>
          <ul className="space-y-1 text-sm text-white/70">
              <li>Yaoundé — Bastos</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">© 2026 Revive Market Cameroon. All rights reserved.</div>
      </footer>
    </div>
  );
}