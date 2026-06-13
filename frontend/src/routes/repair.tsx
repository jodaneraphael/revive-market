import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { repairsApi } from "@/lib/api";
import { isAuthenticated } from "@/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Clock, MapPin, Wrench } from "lucide-react";

export const Route = createFileRoute("/repair")({
  head: () => ({ meta: [{ title: "Book a Repair — Revive Market" }, { name: "description", content: "Book a repair for your phone, laptop, tablet or console. Drop-off or pickup in Yaoundé." }] }),
  component: RepairPage,
});

function RepairPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login", search: { redirect: "/repair" } });
    }
  }, []);

  const [deviceType, setDeviceType] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [issue, setIssue] = useState("");
  const [delivery, setDelivery] = useState("dropoff");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!deviceType || !deviceModel || !issue) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await repairsApi.create({
        device_name: deviceModel,
        category: deviceType,
        issue,
        branch_id: 1,
        delivery_method: delivery,
      });
      toast.success("Repair request submitted! We'll call you within 1h.");
      setDeviceType(""); setDeviceModel(""); setIssue(""); setDelivery("dropoff");
    } catch {
      toast.error("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated()) return null;

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-bold text-foreground">Book a repair</h1>
        <p className="text-muted-foreground mt-1">Certified technicians. Genuine parts. Transparent quotes.</p>

        <div className="mt-6 grid md:grid-cols-3 gap-3">
          <div className="rounded-lg bg-card border p-4"><Clock className="h-5 w-5 text-accent" /><div className="mt-2 font-semibold text-sm">Avg. turnaround</div><div className="text-xs text-muted-foreground">2–3 business days</div></div>
          <div className="rounded-lg bg-card border p-4"><Wrench className="h-5 w-5 text-accent" /><div className="mt-2 font-semibold text-sm">No fix, no fee</div><div className="text-xs text-muted-foreground">Diagnostic is free</div></div>
          <div className="rounded-lg bg-card border p-4"><MapPin className="h-5 w-5 text-accent" /><div className="mt-2 font-semibold text-sm">Yaoundé</div><div className="text-xs text-muted-foreground">Bastos branch</div></div>
        </div>

        <Card className="mt-6"><CardHeader><CardTitle>Tell us about your device</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Device type</Label><Select value={deviceType} onValueChange={setDeviceType}><SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent><SelectItem value="Phones">Phone</SelectItem><SelectItem value="Laptops">Laptop</SelectItem><SelectItem value="Tablets">Tablet</SelectItem><SelectItem value="Consoles">Console</SelectItem></SelectContent></Select></div>
            <div><Label>Brand & model</Label><Input className="mt-1" placeholder="e.g. iPhone 11, HP EliteBook 840" value={deviceModel} onChange={(e) => setDeviceModel(e.target.value)} /></div>
            <div><Label>Describe the issue</Label><Textarea className="mt-1" rows={4} placeholder="Cracked screen, won't charge, slow performance..." value={issue} onChange={(e) => setIssue(e.target.value)} /></div>
            <div>
              <Label>Drop-off or pickup?</Label>
              <RadioGroup value={delivery} onValueChange={setDelivery} className="mt-2 grid grid-cols-2 gap-2">
                <label className="rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30"><RadioGroupItem value="dropoff" className="mr-2" />Drop-off at branch</label>
                <label className="rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30"><RadioGroupItem value="pickup" className="mr-2" />Pickup (2,000 FCFA)</label>
              </RadioGroup>
            </div>
            <div className="rounded-lg bg-primary-soft p-3 text-sm text-primary"><strong>Estimated turnaround:</strong> 2–3 business days after diagnosis. You'll receive a free quote within 24h.</div>
            <Button onClick={submit} disabled={loading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{loading ? "Submitting..." : "Submit repair request"}</Button>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
