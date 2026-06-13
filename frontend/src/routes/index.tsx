import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GradeBadge } from "@/components/GradeBadge";
import { devicesApi, type Device } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { Smartphone, Laptop, Tablet, Gamepad2, ShieldCheck, ScanLine, Award, Wallet, MapPin, ArrowRight, Recycle, Wrench } from "lucide-react";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revive Market — Smart Choice. Second Life. Better Tomorrow." },
      { name: "description", content: "Buy, sell, repair, and certify second-hand phones, laptops, tablets and consoles in Cameroon. Yaoundé, Douala, Bafoussam." },
      { property: "og:title", content: "Revive Market — Certified Second-Hand Electronics in Cameroon" },
      { property: "og:description", content: "Escrow-protected purchases, IMEI verification, A/B/C grading, MTN MoMo & Orange Money." },
    ],
  }),
  component: Index,
});

function Index() {
  const [featured, setFeatured] = useState<Device[]>([]);
  useEffect(() => { devicesApi.featured().then(setFeatured).catch(() => {}); }, []);
  const quickActions = [
    { to: "/catalog", label: "Buy", desc: "Certified devices", icon: Smartphone, tint: "bg-primary text-primary-foreground" },
    { to: "/sell", label: "Sell", desc: "Get a fair offer", icon: Recycle, tint: "bg-accent text-accent-foreground" },
    { to: "/repair", label: "Repair", desc: "Book a technician", icon: Wrench, tint: "bg-primary text-primary-foreground" },
    { to: "/catalog", label: "Certify", desc: "A / B / C grading", icon: Award, tint: "bg-accent text-accent-foreground" },
  ];
  const trust = [
    { icon: ShieldCheck, title: "Escrow Protected", desc: "Funds held until delivery confirmed" },
    { icon: ScanLine, title: "IMEI Verified", desc: "Every device cross-checked" },
    { icon: Award, title: "Graded A / B / C", desc: "Transparent condition + warranty" },
    { icon: Wallet, title: "MTN MoMo & Orange Money", desc: "Mobile payments accepted" },
  ];
  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,white_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-medium">
              <Recycle className="h-3.5 w-3.5" /> Certified refurbished electronics
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight">Smart Choice. <br/>Second Life. <span className="text-accent-soft">Better Tomorrow.</span></h1>
            <p className="mt-5 text-lg text-white/85 max-w-xl">Cameroon's trusted marketplace for second-hand phones, laptops, tablets and consoles — graded, warrantied, and escrow-protected.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground"><Link to="/catalog">Browse Devices <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20"><Link to="/sell">Sell Yours</Link></Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Yaoundé</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Douala</span>
              <span className="inline-flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Bafoussam</span>
            </div>
          </div>
          <div className="hidden md:grid grid-cols-2 gap-4">
            {featured.slice(0, 4).map((d) => (
              <div key={d.id} className="rounded-2xl bg-white/95 backdrop-blur p-3 shadow-xl hover:scale-[1.02] transition-transform">
                <img src={d.image_url} alt={d.name} className="aspect-square w-full rounded-xl object-cover" loading="lazy" />
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground truncate">{d.name}</span>
                  <GradeBadge grade={d.grade as any} />
                </div>
                <div className="text-sm font-bold text-primary">{fcfa(d.price)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-7xl px-4 -mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((a) => (
            <Link key={a.label} to={a.to} className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-0 shadow-md">
                <CardContent className="p-5">
                  <div className={`h-10 w-10 rounded-lg grid place-items-center ${a.tint}`}><a.icon className="h-5 w-5" /></div>
                  <div className="mt-3 font-semibold text-foreground">{a.label}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid md:grid-cols-4 gap-4">
          {trust.map((t) => (
            <div key={t.title} className="flex items-start gap-3 rounded-xl border bg-card p-4">
              <div className="h-10 w-10 rounded-lg bg-accent-soft text-accent grid place-items-center"><t.icon className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold text-sm text-foreground">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured catalog */}
      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">Featured Certified Devices</h2>
            <p className="text-muted-foreground text-sm mt-1">Hand-inspected, graded and warrantied by Revive Market.</p>
          </div>
          <Button asChild variant="outline"><Link to="/catalog">See all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.slice(0, 8).map((d) => (
            <Link key={d.id} to="/product/$id" params={{ id: String(d.id) }}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img src={d.image_url} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                </div>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs text-muted-foreground">{d.brand}</span>
                    <GradeBadge grade={d.grade as any} />
                  </div>
                  <div className="font-semibold text-sm mt-1 line-clamp-1">{d.name}</div>
                  <div className="mt-2 font-bold text-primary">{fcfa(d.price)}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">📍 {d.branch_name}</div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-primary-soft">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-2xl font-bold text-foreground text-center">Shop by category</h2>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Phones", icon: Smartphone }, { label: "Laptops", icon: Laptop },
              { label: "Tablets", icon: Tablet }, { label: "Consoles", icon: Gamepad2 },
            ].map((c) => (
              <Link key={c.label} to="/catalog" className="rounded-xl bg-card border p-6 text-center hover:border-accent hover:shadow-md transition-all">
                <c.icon className="h-8 w-8 mx-auto text-primary" />
                <div className="mt-3 font-medium text-foreground">{c.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
