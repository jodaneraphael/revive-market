import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ordersApi, type Order } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const ORDER_STATUSES = ["Processing", "Out for Delivery", "Delivered", "Cancelled"];

export const Route = createFileRoute("/admin/orders")({
  head: () => ({ meta: [{ title: "Orders — Revive Market Admin" }] }),
  component: () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [statusTarget, setStatusTarget] = useState<{ order: Order; status: string } | null>(null);
    const load = (p: number) => {
      setLoading(true);
      ordersApi.listPaginated(p).then((r) => { setOrders(r.data); setPage(r.page); setTotalPages(r.totalPages); setTotal(r.total); }).catch(() => {}).finally(() => setLoading(false));
    };
    useEffect(() => { load(1); }, []);

    const updateStatus = async () => {
      if (!statusTarget) return;
      try {
        await ordersApi.updateStatus(statusTarget.order.id, statusTarget.status);
        toast.success(`Order ${statusTarget.order.tracking_id} → ${statusTarget.status}`);
        setStatusTarget(null); load(page);
      } catch (e: any) { toast.error(e.message); }
    };

    return (
      <>
        <h2 className="text-xl font-bold mb-4">All orders ({total})</h2>
        {loading ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Tracking</TableHead><TableHead>Customer</TableHead><TableHead>Device</TableHead><TableHead>City</TableHead><TableHead>Payment</TableHead><TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead>Status</TableHead><TableHead>Update</TableHead></TableRow></TableHeader>
          <TableBody>{orders.map((o) => (
            <TableRow key={o.id}>
              <TableCell className="font-mono text-xs">{o.tracking_id}</TableCell>
              <TableCell className="font-medium">{o.customer_name}</TableCell>
              <TableCell>{o.device_name}</TableCell>
              <TableCell>{o.city}</TableCell>
              <TableCell>{o.payment_method}</TableCell>
              <TableCell className="font-semibold">{fcfa(o.price)}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</TableCell>
              <TableCell><StatusBadge status={o.status} /></TableCell>
              <TableCell>
                <Select onValueChange={(v) => setStatusTarget({ order: o, status: v })}>
                  <SelectTrigger className="h-8 w-36 text-xs"><SelectValue placeholder="Change" /></SelectTrigger>
                  <SelectContent>{ORDER_STATUSES.filter((s) => s !== o.status).map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>{total} total orders</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => load(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button key={p} size="sm" variant={p === page ? "default" : "outline"} onClick={() => load(p)} className={p === page ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}>{p}</Button>
              ))}
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => load(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        <AlertDialog open={!!statusTarget} onOpenChange={(o) => { if (!o) setStatusTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Update order status</AlertDialogTitle>
              <AlertDialogDescription>
                Change <strong>{statusTarget?.order.tracking_id}</strong> ({statusTarget?.order.device_name}) from <strong>{statusTarget?.order.status}</strong> to <strong>{statusTarget?.status}</strong>?
                {statusTarget?.status === "Delivered" && " Escrow will be released to the seller."}
                {statusTarget?.status === "Cancelled" && " This will revert the device to In Stock."}
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
