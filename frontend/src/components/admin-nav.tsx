import { LayoutDashboard, Package, ShoppingCart, ClipboardCheck, Wrench, Users, CreditCard, Building2 } from "lucide-react";
import type { NavItem } from "./InternalLayout";

export const ADMIN_NAV: NavItem[] = [
  { to: "/admin", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { to: "/admin/inventory", label: "Inventory", icon: <Package className="h-4 w-4" /> },
  { to: "/admin/orders", label: "Orders", icon: <ShoppingCart className="h-4 w-4" /> },
  { to: "/admin/sell-requests", label: "Sell-Requests", icon: <ClipboardCheck className="h-4 w-4" /> },
  { to: "/admin/repairs", label: "Repair Jobs", icon: <Wrench className="h-4 w-4" /> },
  { to: "/admin/technicians", label: "Technicians", icon: <Users className="h-4 w-4" /> },
  { to: "/admin/payments", label: "Payments", icon: <CreditCard className="h-4 w-4" /> },
  { to: "/admin/branches", label: "Branches", icon: <Building2 className="h-4 w-4" /> },
];

import { ListChecks, ClipboardList, ScanLine, PackageSearch, TrendingUp } from "lucide-react";

export const STAFF_NAV: NavItem[] = [
  { to: "/staff", label: "My Job Queue", icon: <ListChecks className="h-4 w-4" /> },
  { to: "/staff/jobs", label: "Repair Jobs", icon: <ClipboardList className="h-4 w-4" /> },
  { to: "/staff/grading", label: "Device Grading", icon: <ScanLine className="h-4 w-4" /> },
  { to: "/staff/parts", label: "Parts Request", icon: <PackageSearch className="h-4 w-4" /> },
  { to: "/staff/performance", label: "My Performance", icon: <TrendingUp className="h-4 w-4" /> },
];