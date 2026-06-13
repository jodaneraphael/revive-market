import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { devicesApi, ordersApi } from "@/lib/api";
import { isAuthenticated, getUser } from "@/lib/auth";
import { fcfa } from "@/lib/mock-data";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const checkoutSearchSchema = z.object({ device_id: z.coerce.number().optional() });

export const Route = createFileRoute("/checkout")({
  validateSearch: checkoutSearchSchema,
  head: () => ({ meta: [{ title: "Checkout — Revive Market" }] }),
  component: Checkout,
});

function Checkout() {
  const navigate = useNavigate();
  const { device_id } = Route.useSearch();
  const user = getUser();
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState("Yaoundé");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("momo");
  const delivery = 2000;

  useEffect(() => {
    if (!isAuthenticated()) { navigate({ to: "/login", search: { redirect: `/checkout?device_id=${device_id}` } }); return; }
    if (!device_id) { toast.error("No device selected"); navigate({ to: "/catalog" }); return; }
    devicesApi.get(device_id).then(setDevice).catch(() => { toast.error("Device not found"); navigate({ to: "/catalog" }); }).finally(() => setLoading(false));
  }, [device_id]);

  const handleSubmit = async () => {
    if (!city || !address || !name || !phone) { toast.error("Please fill in all fields"); return; }
    setSubmitting(true);
    try {
      const paymentMethod = payment === "momo" ? "MTN MoMo" : payment === "orange" ? "Orange Money" : "Pay on Delivery";
      const order = await ordersApi.create({ device_id: device_id!, payment_method: paymentMethod, city, address });
      toast.success(`Order placed! Tracking ID: ${order.tracking_id}`);
      navigate({ to: "/account" });
    } catch (e: any) {
      toast.error(e.message || "Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <CustomerLayout><div className="flex items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading...</div></CustomerLayout>;

  const total = device ? device.price + delivery : 0;

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-5xl px-4 py-10 grid md:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Checkout</h1>
          <Card><CardHeader><CardTitle>Delivery address</CardTitle></CardHeader><CardContent className="grid gap-3 md:grid-cols-2">
            <div className="md:col-span-2"><Label>Full name</Label><Input className="mt-1" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div><Label>Phone</Label><Input className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
            <div><Label>City</Label><Select value={city} onValueChange={setCity}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Yaoundé">Yaoundé</SelectItem><SelectItem value="Douala">Douala</SelectItem><SelectItem value="Bafoussam">Bafoussam</SelectItem></SelectContent></Select></div>
            <div className="md:col-span-2"><Label>Street address / neighborhood</Label><Input className="mt-1" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Bastos, Rue 1.234" /></div>
          </CardContent></Card>
          <Card><CardHeader><CardTitle>Payment</CardTitle></CardHeader><CardContent>
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-2">
              <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30"><RadioGroupItem value="momo" /> <div className="flex-1"><div className="font-medium text-sm">MTN Mobile Money</div><div className="text-xs text-muted-foreground">Escrow protected</div></div><span className="text-xs font-bold text-warning-foreground bg-warning/30 rounded px-2 py-0.5">MoMo</span></label>
              <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30"><RadioGroupItem value="orange" /> <div className="flex-1"><div className="font-medium text-sm">Orange Money</div><div className="text-xs text-muted-foreground">Escrow protected</div></div><span className="text-xs font-bold text-white bg-[#ff7900] rounded px-2 py-0.5">OM</span></label>
              <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30"><RadioGroupItem value="cod" /> <div className="flex-1"><div className="font-medium text-sm">Pay on Delivery</div><div className="text-xs text-muted-foreground">Cash to courier</div></div></label>
            </RadioGroup>
          </CardContent></Card>
        </div>
        <Card className="h-fit sticky top-20"><CardHeader><CardTitle>Order summary</CardTitle></CardHeader><CardContent className="space-y-3">
          <div className="flex gap-3"><img src={device?.image_url} className="h-16 w-16 rounded-lg object-cover bg-muted" alt={device?.name} /><div><div className="font-medium text-sm">{device?.name}</div><div className="text-xs text-muted-foreground">Grade {device?.grade} · {device?.branch_name}</div><div className="text-sm font-bold text-primary mt-1">{fcfa(device?.price || 0)}</div></div></div>
          <div className="border-t pt-3 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{fcfa(device?.price || 0)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span>{fcfa(delivery)}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>Total</span><span className="text-primary">{fcfa(total)}</span></div>
          </div>
          <div className="rounded-lg bg-accent-soft p-3 text-xs text-accent flex gap-2"><ShieldCheck className="h-4 w-4 mt-0.5 shrink-0" /><span>Funds held in escrow until you confirm delivery.</span></div>
          <Button onClick={handleSubmit} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Placing order..." : "Place order"}</Button>
        </CardContent></Card>
      </div>
    </CustomerLayout>
  );
}
