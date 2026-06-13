import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GradeBadge } from "@/components/GradeBadge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { devicesApi, type Device } from "@/lib/api";
import { GRADE_INFO } from "@/lib/mock-data";
import { fcfa } from "@/lib/mock-data";
import { ShieldCheck, ScanLine, Truck, ArrowLeft, Check, Loader2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => ({ meta: [{ title: `Device — Revive Market` }] }),
  loader: async ({ params }) => {
    const d = await devicesApi.get(Number(params.id));
    if (!d) throw notFound();
    return d;
  },
  notFoundComponent: () => <CustomerLayout><div className="p-12 text-center text-muted-foreground">Device not found. <Link to="/catalog" className="text-primary underline">Back to catalog</Link></div></CustomerLayout>,
  errorComponent: ({ error }) => <CustomerLayout><div className="p-12 text-center text-destructive">{error.message}</div></CustomerLayout>,
  component: ProductPage,
});

function ProductPage() {
  const d = Route.useLoaderData() as Device;
  const [pay, setPay] = useState("momo");
  let specs: string[] = [];
  try { specs = d.specs ? JSON.parse(d.specs) : []; } catch { specs = []; }
  const gi = d.grade === "A" ? GRADE_INFO.A : d.grade === "B" ? GRADE_INFO.B : GRADE_INFO.C;

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Link to="/catalog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"><ArrowLeft className="h-4 w-4 mr-1" /> Back to catalog</Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="aspect-square rounded-2xl overflow-hidden bg-muted border"><img src={d.image_url} alt={d.name} className="h-full w-full object-cover" /></div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 1, 2, 3].map((i) => <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted border opacity-60 hover:opacity-100 cursor-pointer"><img src={d.image_url} alt="" className="h-full w-full object-cover" /></div>)}
            </div>
          </div>

          <div>
            <div className="text-xs text-muted-foreground">{d.brand} · {d.category} · Tracking {d.tracking_id}</div>
            <h1 className="mt-1 text-3xl font-bold text-foreground">{d.name}</h1>
            <div className="mt-2 flex items-center gap-2"><GradeBadge grade={d.grade as any} /><span className="text-xs text-muted-foreground">{gi.label} · {gi.warrantyDays}-day warranty</span></div>

            <div className="mt-5 text-4xl font-bold text-primary">{fcfa(d.price)}</div>

            <Card className="mt-5"><CardContent className="p-4 space-y-2">
              <div className="text-sm font-semibold text-foreground">Condition</div>
              <p className="text-sm text-muted-foreground">{d.condition || d.description}</p>
              <div className="text-xs text-muted-foreground italic">{gi.desc}</div>
            </CardContent></Card>

            <Card className="mt-3"><CardContent className="p-4">
              <div className="text-sm font-semibold text-foreground mb-2">Specifications</div>
              <ul className="space-y-1">{specs.map((s: string) => <li key={s} className="text-sm text-muted-foreground flex gap-2"><Check className="h-4 w-4 text-accent mt-0.5" />{s}</li>)}</ul>
            </CardContent></Card>

            <div className="mt-5">
              <div className="text-sm font-semibold text-foreground mb-2">Payment method</div>
              <RadioGroup value={pay} onValueChange={setPay} className="space-y-2">
                <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30">
                  <RadioGroupItem value="momo" id="momo" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Pay online — MTN MoMo / Orange Money <span className="ml-2 text-xs text-accent">Escrow protected</span></div>
                    <div className="text-xs text-muted-foreground">Funds held until you confirm delivery.</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:border-accent has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30">
                  <RadioGroupItem value="cod" id="cod" />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Pay on Delivery</div>
                    <div className="text-xs text-muted-foreground">Cash payment to our courier at handover.</div>
                  </div>
                </label>
              </RadioGroup>
              <Label htmlFor="momo" className="sr-only">Payment</Label>
            </div>

            <Button asChild size="lg" className="mt-5 w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link to="/checkout" search={{ device_id: d.id }}>Buy Now</Link>
            </Button>

            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground"><ShieldCheck className="h-4 w-4 text-accent" /> {gi.warrantyDays}-day warranty</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><ScanLine className="h-4 w-4 text-accent" /> IMEI verified</div>
              <div className="flex items-center gap-1.5 text-muted-foreground"><Truck className="h-4 w-4 text-accent" /> Delivery in {d.branch_name}</div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
