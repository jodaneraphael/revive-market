import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent } from "@/components/ui/card";
import { GradeBadge } from "@/components/GradeBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { devicesApi, type Device } from "@/lib/api";
import { CATEGORIES, GRADES, BRANCH_NAMES } from "@/lib/config";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";

export const Route = createFileRoute("/catalog")({
  head: () => ({ meta: [{ title: "Browse Certified Devices — Revive Market" }, { name: "description", content: "Browse phones, laptops, tablets and consoles. Filter by grade, brand, city and price." }] }),
  component: Catalog,
});

function Catalog() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [grade, setGrade] = useState("all");
  const [branch, setBranch] = useState("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = { status: "In Stock" };
    if (cat !== "all") params.category = cat;
    if (grade !== "all") params.grade = grade;
    if (branch !== "all") params.branch = branch;
    if (q) params.q = q;
    if (sort !== "featured") params.sort = sort;
    devicesApi.list(params).then(setDevices).catch(() => {}).finally(() => setLoading(false));
  }, [q, cat, grade, branch, sort]);

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground">Browse Devices</h1>
          <p className="text-muted-foreground mt-1">All devices are inspected, graded and come with a warranty.</p>
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-6">
          <aside className="space-y-4">
            <Card><CardContent className="p-4 space-y-4">
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Search</label>
                <div className="relative mt-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="iPhone, ThinkPad..." className="pl-8" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Category</label>
                <Select value={cat} onValueChange={setCat}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All categories</SelectItem>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Grade</label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All grades</SelectItem>{GRADES.map((g) => <SelectItem key={g} value={g}>Grade {g}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase">Branch</label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="all">All branches</SelectItem>{BRANCH_NAMES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="rounded-lg bg-primary-soft p-3 text-xs space-y-2">
                <div className="font-semibold text-primary">Grade legend</div>
                <div><GradeBadge grade="A" /> Like new, 90-day warranty</div>
                <div><GradeBadge grade="B" /> Very good, 60-day warranty</div>
                <div><GradeBadge grade="C" /> Good, 30-day warranty</div>
              </div>
            </CardContent></Card>
          </aside>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">{loading ? "Loading..." : `${devices.length} device(s)`}</div>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {loading ? (
              <div className="flex items-center justify-center py-16 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading devices...</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {devices.map((d) => (
                  <Link key={d.id} to="/product/$id" params={{ id: String(d.id) }}>
                    <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow group">
                      <div className="aspect-square overflow-hidden bg-muted relative">
                        <img src={d.image_url} alt={d.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                        <div className="absolute top-2 right-2"><GradeBadge grade={d.grade as any} /></div>
                      </div>
                      <CardContent className="p-3 space-y-1">
                        <div className="text-xs text-muted-foreground">{d.brand} · {d.category}</div>
                        <div className="font-semibold text-sm line-clamp-1">{d.name}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">{d.condition}</div>
                        <div className="flex items-center justify-between pt-1">
                          <div className="font-bold text-primary">{fcfa(d.price)}</div>
                          <StatusBadge status={d.branch_name} />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
            {!loading && devices.length === 0 && <div className="text-center py-16 text-muted-foreground">No devices match your filters.</div>}
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
