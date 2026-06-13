import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import { dashboardApi, type DashboardStats } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { ShoppingCart, Wrench, ClipboardCheck, Package, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Admin Overview — Revive Market" }] }),
  component: AdminOverview,
});

function AdminOverview() {
  const [data, setData] = useState<DashboardStats | null>(null);
  useEffect(() => { dashboardApi.stats().then(setData).catch(() => {}); }, []);

  if (!data) return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading dashboard...</div>;

  const { kpis, sales_by_city, inventory_by_grade, recent_orders } = data;
  const kpiCards = [
    { label: "Total sales", value: fcfa(kpis.total_sales), icon: ShoppingCart, tint: "bg-accent-soft text-accent" },
    { label: "Active repairs", value: kpis.active_repairs, icon: Wrench, tint: "bg-primary-soft text-primary" },
    { label: "Pending sell-requests", value: kpis.pending_sell_requests, icon: ClipboardCheck, tint: "bg-warning/20 text-warning-foreground" },
    { label: "Inventory in stock", value: kpis.inventory_in_stock, icon: Package, tint: "bg-accent-soft text-accent" },
  ];
  const COLORS = ["#2E7D32", "#1F3864", "#E0A82E"];

  return (
    <>
      <div className="grid gap-4 md:grid-cols-4">
        {kpiCards.map((k) => (
          <Card key={k.label}><CardContent className="p-4 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-xl grid place-items-center ${k.tint}`}><k.icon className="h-6 w-6" /></div>
            <div><div className="text-xs text-muted-foreground uppercase">{k.label}</div><div className="text-xl font-bold">{k.value}</div></div>
          </CardContent></Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card><CardHeader><CardTitle>Sales by city (FCFA)</CardTitle></CardHeader><CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sales_by_city}><XAxis dataKey="city" /><YAxis tickFormatter={(v) => `${v/1000}k`} /><Tooltip formatter={(v: number) => fcfa(v)} /><Bar dataKey="sales" fill="#1F3864" radius={[6,6,0,0]} /></BarChart>
          </ResponsiveContainer>
        </CardContent></Card>
        <Card><CardHeader><CardTitle>Inventory by grade</CardTitle></CardHeader><CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart><Pie data={inventory_by_grade} dataKey="count" nameKey="grade" innerRadius={50} outerRadius={90}>{inventory_by_grade.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}</Pie><Legend /><Tooltip /></PieChart>
          </ResponsiveContainer>
        </CardContent></Card>
      </div>

      <Card className="mt-4"><CardHeader><CardTitle>Recent orders</CardTitle></CardHeader><CardContent>
        <div className="space-y-2">{recent_orders.map((o: any) => (
          <div key={o.id} className="flex items-center justify-between text-sm border-b last:border-0 py-2">
            <span className="font-mono text-xs">{o.tracking_id}</span>
            <span className="font-medium">{o.customer}</span>
            <span className="text-muted-foreground">{o.device_name}</span>
            <span className="font-semibold">{fcfa(o.price)}</span>
            <span className="text-xs">{o.status}</span>
          </div>
        ))}</div>
      </CardContent></Card>
    </>
  );
}
