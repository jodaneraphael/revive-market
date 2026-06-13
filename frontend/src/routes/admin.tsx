import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { InternalLayout } from "@/components/InternalLayout";
import { ADMIN_NAV } from "@/components/admin-nav";
import { isAuthenticated, hasRole } from "@/lib/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Revive Market" }] }),
  component: () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated() || !hasRole("admin")) {
        navigate({ to: "/login", search: { redirect: "/admin" } });
      }
    }, []);
    if (!isAuthenticated() || !hasRole("admin")) return null;
    return (
      <InternalLayout nav={ADMIN_NAV} title="Admin Dashboard">
        <Outlet />
      </InternalLayout>
    );
  },
});