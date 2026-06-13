import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { transactionsApi, type Transaction } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/payments")({
  head: () => ({ meta: [{ title: "Payments — Revive Market Admin" }] }),
  component: () => {
    const [txs, setTxs] = useState<Transaction[]>([]);
    const [releaseTarget, setReleaseTarget] = useState<Transaction | null>(null);
    const load = () => transactionsApi.list().then(setTxs).catch(() => {});
    useEffect(() => { load(); }, []);

    const release = async () => {
      if (!releaseTarget) return;
      try {
        await transactionsApi.updateEscrow(releaseTarget.id, "Released");
        toast.success("Escrow released"); setReleaseTarget(null); load();
      } catch (e: any) { toast.error(e.message); }
    };

    const totals = txs.reduce((acc, t) => { acc[t.method] = (acc[t.method] || 0) + t.amount; return acc; }, {} as Record<string, number>);

    return (
      <>
        <div className="grid gap-4 md:grid-cols-3 mb-4">
          {(["MTN MoMo", "Orange Money", "Pay on Delivery"] as const).map((m) => (
            <Card key={m}><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">{m}</div><div className="text-xl font-bold mt-1">{fcfa(totals[m] || 0)}</div></CardContent></Card>
          ))}
        </div>
        {txs.length === 0 ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Tx ID</TableHead><TableHead>Order</TableHead><TableHead>Customer</TableHead><TableHead>Amount</TableHead><TableHead>Method</TableHead><TableHead>Escrow</TableHead><TableHead>Date</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>{txs.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-mono text-xs">{t.id}</TableCell>
              <TableCell className="font-mono text-xs">{t.order_tracking}</TableCell>
              <TableCell>{t.customer_name}</TableCell>
              <TableCell className="font-semibold">{fcfa(t.amount)}</TableCell>
              <TableCell>{t.method}</TableCell>
              <TableCell><StatusBadge status={t.escrow} /></TableCell>
              <TableCell className="text-xs text-muted-foreground">{new Date(t.created_at).toLocaleDateString()}</TableCell>
              <TableCell>{t.escrow === "Held" && <Button size="sm" onClick={() => setReleaseTarget(t)} className="bg-accent hover:bg-accent/90 text-accent-foreground h-7 px-2 text-xs">Release</Button>}</TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        <AlertDialog open={!!releaseTarget} onOpenChange={(o) => { if (!o) setReleaseTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Release escrow?</AlertDialogTitle>
              <AlertDialogDescription>
                Release <strong>{fcfa(releaseTarget?.amount || 0)}</strong> for order <strong>{releaseTarget?.order_tracking}</strong> ({releaseTarget?.customer_name})? Funds will be sent to the seller.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={release} className="bg-accent text-accent-foreground hover:bg-accent/90">Confirm release</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
});
