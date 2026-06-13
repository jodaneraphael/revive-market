import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/StatusBadge";
import { GradeBadge } from "@/components/GradeBadge";
import { customersApi } from "@/lib/api";
import { isAuthenticated, getUser } from "@/lib/auth";
import { fcfa } from "@/lib/mock-data";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/account")({
  head: () => ({ meta: [{ title: "My Account — Revive Market" }] }),
  component: Account,
});

function Account() {
  const navigate = useNavigate();
  const user = getUser();
  const [orders, setOrders] = useState<any[]>([]);
  const [sellRequests, setSellRequests] = useState<any[]>([]);
  const [repairs, setRepairs] = useState<any[]>([]);
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated() || !user) { navigate({ to: "/login", search: { redirect: "/account" } }); return; }
    Promise.all([
      customersApi.orders(user.id).catch(() => []),
      customersApi.sellRequests(user.id).catch(() => []),
      customersApi.repairs(user.id).catch(() => []),
      customersApi.devices(user.id).catch(() => []),
    ]).then(([o, s, r, d]) => { setOrders(o); setSellRequests(s); setRepairs(r); setDevices(d); }).finally(() => setLoading(false));
  }, []);

  if (!isAuthenticated() || !user) return null;
  const initials = user.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();

  if (loading) return <CustomerLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading...</div></CustomerLayout>;

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent grid place-items-center text-white text-xl font-bold">{initials}</div>
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email} · <Badge className="bg-accent text-accent-foreground"><ShieldCheck className="h-3 w-3 mr-1" />ID Verified</Badge></p>
          </div>
        </div>
        <Tabs defaultValue="orders">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="sells">Sell Requests</TabsTrigger>
            <TabsTrigger value="repairs">Repairs</TabsTrigger>
            <TabsTrigger value="warranty">Warranty</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="orders"><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Order</TableHead><TableHead>Device</TableHead><TableHead>City</TableHead><TableHead>Payment</TableHead><TableHead>Amount</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{orders.map((o) => <TableRow key={o.id}><TableCell className="font-mono text-xs">{o.tracking_id}</TableCell><TableCell>{o.device_name}</TableCell><TableCell>{o.city}</TableCell><TableCell>{o.payment_method}</TableCell><TableCell className="font-semibold">{fcfa(o.price)}</TableCell><TableCell><StatusBadge status={o.status} /></TableCell></TableRow>)}</TableBody>
          </Table></CardContent></Card></TabsContent>

          <TabsContent value="sells"><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Device</TableHead><TableHead>IMEI</TableHead><TableHead>IMEI Check</TableHead><TableHead>Offer</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{sellRequests.map((s) => <TableRow key={s.id}><TableCell>{s.device_name}</TableCell><TableCell className="font-mono text-xs">{s.imei}</TableCell><TableCell><StatusBadge status={s.imei_status} /></TableCell><TableCell>{s.offer ? <span className="font-semibold">{fcfa(s.offer)}</span> : "—"}</TableCell><TableCell><StatusBadge status={s.status} /></TableCell><TableCell>{s.status === "Offer Made" && <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">Accept</Button>}</TableCell></TableRow>)}</TableBody>
          </Table></CardContent></Card></TabsContent>

          <TabsContent value="repairs"><Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Device</TableHead><TableHead>Issue</TableHead><TableHead>Branch</TableHead><TableHead>Quote</TableHead><TableHead>Status</TableHead><TableHead></TableHead></TableRow></TableHeader>
            <TableBody>{repairs.map((r) => <TableRow key={r.id}><TableCell>{r.device_name}</TableCell><TableCell className="text-muted-foreground">{r.issue}</TableCell><TableCell>{r.branch_name}</TableCell><TableCell>{r.quote ? <span className="font-semibold">{fcfa(r.quote)}</span> : "—"}</TableCell><TableCell><StatusBadge status={r.status} /></TableCell><TableCell>{r.quote && !r.quote_approved && <Button size="sm" variant="outline">Approve quote</Button>}</TableCell></TableRow>)}</TableBody>
          </Table></CardContent></Card></TabsContent>

          <TabsContent value="warranty"><div className="grid md:grid-cols-2 gap-4">{devices.map((d) => <Card key={d.id}><CardContent className="p-4 flex items-center justify-between"><div><div className="font-semibold">{d.name}</div><div className="text-xs text-muted-foreground font-mono">{d.tracking_id}</div><div className="text-xs text-muted-foreground mt-1">Purchased {new Date(d.purchase_date).toLocaleDateString()}</div></div><div className="text-right"><GradeBadge grade={d.grade as any} /><div className="text-xs mt-2"><span className="text-muted-foreground">Warranty until</span><br/><span className="font-semibold text-accent">{new Date(d.warranty_end).toLocaleDateString()}</span></div></div></CardContent></Card>)}</div></TabsContent>

          <TabsContent value="profile"><Card><CardContent className="p-6 space-y-4 max-w-lg">
            <div><div className="text-xs font-semibold text-muted-foreground uppercase">Full name</div><div>{user.name}</div></div>
            <div><div className="text-xs font-semibold text-muted-foreground uppercase">Email</div><div>{user.email}</div></div>
            <div><div className="text-xs font-semibold text-muted-foreground uppercase">Phone</div><div>{user.phone}</div></div>
          </CardContent></Card></TabsContent>
        </Tabs>
      </div>
    </CustomerLayout>
  );
}
