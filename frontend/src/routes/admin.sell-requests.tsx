import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { sellRequestsApi, type SellRequest } from "@/lib/api";
import { GRADES } from "@/lib/config";
import { fcfa } from "@/lib/mock-data";
import { Eye, FileText, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/sell-requests")({
  head: () => ({ meta: [{ title: "Sell Requests — Revive Market Admin" }] }),
  component: () => {
    const [requests, setRequests] = useState<SellRequest[]>([]);
    const [offers, setOffers] = useState<Record<number, string>>({});
    const [grades, setGrades] = useState<Record<number, string>>({});
    const [acceptTarget, setAcceptTarget] = useState<SellRequest | null>(null);
    const [rejectTarget, setRejectTarget] = useState<SellRequest | null>(null);
    const load = () => sellRequestsApi.list().then(setRequests).catch(() => {});
    useEffect(() => { load(); }, []);

    const accept = async () => {
      if (!acceptTarget) return;
      const grade = grades[acceptTarget.id];
      if (!grade) { toast.error("Select a grade"); setAcceptTarget(null); return; }
      try {
        const offer = offers[acceptTarget.id] ? Number(offers[acceptTarget.id]) : undefined;
        await sellRequestsApi.update(acceptTarget.id, { status: "Accepted", grade, offer });
        toast.success(`${acceptTarget.device_name} accepted, added to inventory`);
        setAcceptTarget(null); load();
      } catch (e: any) { toast.error(e.message); }
    };

    const reject = async () => {
      if (!rejectTarget) return;
      try {
        await sellRequestsApi.update(rejectTarget.id, { status: "Declined" });
        toast.success(`${rejectTarget.device_name} declined`);
        setRejectTarget(null); load();
      } catch (e: any) { toast.error(e.message); }
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">Queue ({requests.length})</h2>
        {requests.length === 0 ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Customer</TableHead><TableHead>Device</TableHead><TableHead>IMEI</TableHead><TableHead>IMEI Check</TableHead><TableHead>Status</TableHead><TableHead>Offer</TableHead><TableHead>Docs</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
          <TableBody>{requests.map((s) => (
            <TableRow key={s.id} className={s.imei_status === "Flagged" ? "bg-destructive/5" : ""}>
              <TableCell className="font-medium">{s.customer_name}</TableCell>
              <TableCell>{s.device_name}</TableCell>
              <TableCell className="font-mono text-xs">{s.imei}</TableCell>
              <TableCell><StatusBadge status={s.imei_status} /></TableCell>
              <TableCell><StatusBadge status={s.status} /></TableCell>
              <TableCell>{s.offer ? fcfa(s.offer) : <Input className="h-7 w-28" placeholder="Amount" value={offers[s.id] || ""} onChange={(e) => setOffers({...offers, [s.id]: e.target.value})} />}</TableCell>
              <TableCell><Button size="sm" variant="ghost"><FileText className="h-4 w-4 mr-1" />View</Button></TableCell>
              <TableCell className="flex gap-1">
                <Select value={grades[s.id] || ""} onValueChange={(v) => setGrades({...grades, [s.id]: v})}>
                  <SelectTrigger className="h-7 w-20 text-xs"><SelectValue placeholder="Grade" /></SelectTrigger>
                  <SelectContent>{GRADES.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                </Select>
                <Button size="sm" onClick={() => setAcceptTarget(s)} className="bg-accent hover:bg-accent/90 text-accent-foreground h-7 px-2 text-xs">Accept</Button>
                <Button size="sm" variant="outline" onClick={() => setRejectTarget(s)} className="h-7 px-2 text-xs">Reject</Button>
              </TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        <AlertDialog open={!!acceptTarget} onOpenChange={(o) => { if (!o) setAcceptTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Accept device?</AlertDialogTitle>
              <AlertDialogDescription>
                Accept <strong>{acceptTarget?.device_name}</strong> from {acceptTarget?.customer_name}? Grade: <strong>{grades[acceptTarget?.id || 0] || "not set"}</strong>
                {offers[acceptTarget?.id || 0] ? `, Offer: ${fcfa(Number(offers[acceptTarget?.id || 0]))}` : ""}. A new inventory device will be created.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={accept} className="bg-accent text-accent-foreground hover:bg-accent/90">Confirm accept</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={!!rejectTarget} onOpenChange={(o) => { if (!o) setRejectTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Reject device?</AlertDialogTitle>
              <AlertDialogDescription>
                Decline <strong>{rejectTarget?.device_name}</strong> from {rejectTarget?.customer_name}? This will mark the request as Declined.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={reject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Reject</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
});
