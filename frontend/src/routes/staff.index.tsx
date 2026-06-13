import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { repairsApi, sellRequestsApi, type RepairJob, type SellRequest } from "@/lib/api";
import { getUser, isAuthenticated } from "@/lib/auth";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/staff/")({
  head: () => ({ meta: [{ title: "My Job Queue — Revive Market Staff" }] }),
  component: () => {
    const navigate = useNavigate();
    const user = getUser();
    const [repairs, setRepairs] = useState<RepairJob[]>([]);
    const [intake, setIntake] = useState<SellRequest[]>([]);

    useEffect(() => {
      if (!isAuthenticated()) { navigate({ to: "/login", search: { redirect: "/staff" } }); return; }
      repairsApi.list().then(setRepairs).catch(() => {});
      sellRequestsApi.list().then(setIntake).catch(() => {});
    }, []);

    if (!user) return null;
    const myJobs = user.role === "technician" ? repairs.filter((r) => r.technician_id === user.id) : repairs;

    return (
      <>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}</h2>
            <p className="text-sm text-muted-foreground">{myJobs.length} active jobs</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Today's repairs</div><div className="text-xl font-bold">{myJobs.length}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Pending intake</div><div className="text-xl font-bold">{intake.filter((s) => s.status === "Submitted" || s.status === "Under Review").length}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Avg. turnaround</div><div className="text-xl font-bold">~2 days</div></CardContent></Card>
        </div>
        <Card><CardContent className="p-4">
          <div className="font-semibold mb-3">Assigned repair jobs</div>
          {myJobs.length === 0 ? <div className="text-center py-8 text-muted-foreground">No assigned jobs</div> :
          <Table><TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Device</TableHead><TableHead>Issue</TableHead><TableHead>Priority</TableHead><TableHead>Quote</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{myJobs.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.customer_name}</TableCell>
                <TableCell className="font-medium">{r.device_name}</TableCell>
                <TableCell className="text-muted-foreground">{r.issue}</TableCell>
                <TableCell><Badge className={r.priority === "High" ? "bg-destructive text-destructive-foreground" : r.priority === "Normal" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}>{r.priority}</Badge></TableCell>
                <TableCell>{r.quote ? fcfa(r.quote) : "—"}</TableCell>
                <TableCell><StatusBadge status={r.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>}
        </CardContent></Card>

        <Card className="mt-4"><CardContent className="p-4">
          <div className="font-semibold mb-3">Device intake & grading tasks</div>
          <Table><TableHeader><TableRow><TableHead>Device</TableHead><TableHead>IMEI</TableHead><TableHead>IMEI Status</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{intake.filter((s) => s.status === "Submitted" || s.status === "Under Review").map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.device_name}</TableCell>
                <TableCell className="font-mono text-xs">{s.imei}</TableCell>
                <TableCell><StatusBadge status={s.imei_status} /></TableCell>
                <TableCell><StatusBadge status={s.status} /></TableCell>
              </TableRow>
            ))}</TableBody>
          </Table>
        </CardContent></Card>
      </>
    );
  },
});
