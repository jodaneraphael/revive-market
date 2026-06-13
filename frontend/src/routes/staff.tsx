import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { InternalLayout } from "@/components/InternalLayout";
import { STAFF_NAV } from "@/components/admin-nav";
import { isAuthenticated, hasRole } from "@/lib/auth";
import { useEffect } from "react";

export const Route = createFileRoute("/staff")({
  head: () => ({ meta: [{ title: "Staff — Revive Market" }] }),
  component: () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!isAuthenticated() || !hasRole("staff", "admin")) {
        navigate({ to: "/login", search: { redirect: "/staff" } });
      }
    }, []);
    if (!isAuthenticated() || !hasRole("staff", "admin")) return null;
    return (
      <InternalLayout nav={STAFF_NAV} title="Staff / Technician Portal">
        <Outlet />
      </InternalLayout>
    );
  },
});