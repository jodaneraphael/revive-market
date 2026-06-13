import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { repairsApi, type RepairJob } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const REPAIR_STATUSES = ["Received", "Diagnosing", "Awaiting Parts", "In Repair", "Ready", "Completed"];

export const Route = createFileRoute("/admin/repairs")({
  head: () => ({ meta: [{ title: "Repair Jobs — Revive Market Admin" }] }),
  component: () => {
    const [repairs, setRepairs] = useState<RepairJob[]>([]);
    const [statusTarget, setStatusTarget] = useState<{ job: RepairJob; status: string } | null>(null);
    const load = () => repairsApi.list().then(setRepairs).catch(() => {});
    useEffect(() => { load(); }, []);

    const updateStatus = async () => {
      if (!statusTarget) return;
      try {
        await repairsApi.update(statusTarget.job.id, { status: statusTarget.status });
        toast.success(`Repair #${statusTarget.job.id} → ${statusTarget.status}`);
        setStatusTarget(null); load();
      } catch (e: any) { toast.error(e.message); }
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Repair queue ({repairs.length})</h2>
        {repairs.length === 0 ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Device</TableHead><TableHead>Issue</TableHead><TableHead>Branch</TableHead><TableHead>Technician</TableHead><TableHead>Quote</TableHead><TableHead>Approval</TableHead><TableHead>Status</TableHead><TableHead>Update</TableHead></TableRow></TableHeader>
          <TableBody>{repairs.map((r) => (
            <TableRow key={r.id}>
              <TableCell className="font-medium">{r.customer_name}</TableCell>
              <TableCell>{r.device_name}</TableCell>
              <TableCell className="text-muted-foreground">{r.issue}</TableCell>
              <TableCell>{r.branch_name}</TableCell>
              <TableCell>{r.technician_name || "—"}</TableCell>
              <TableCell>{r.quote ? fcfa(r.quote) : "—"}</TableCell>
              <TableCell>{r.quote ? <StatusBadge status={r.quote_approved ? "Accepted" : "Pending"} /> : "—"}</TableCell>
              <TableCell><StatusBadge status={r.status} /></TableCell>
              <TableCell>
                <Select onValueChange={(v) => setStatusTarget({ job: r, status: v })}>
                  <SelectTrigger className="h-8 w-32 text-xs"><SelectValue placeholder="Change" /></SelectTrigger>
                  <SelectContent>{REPAIR_STATUSES.filter((s) => s !== r.status).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        <AlertDialog open={!!statusTarget} onOpenChange={(o) => { if (!o) setStatusTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Update repair status</AlertDialogTitle>
              <AlertDialogDescription>
                Change <strong>{statusTarget?.job.device_name}</strong> from <strong>{statusTarget?.job.status}</strong> to <strong>{statusTarget?.status}</strong>?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={updateStatus} className="bg-accent text-accent-foreground hover:bg-accent/90">Confirm</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
});
