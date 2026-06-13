import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { branchesApi, type BranchStats } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/admin/branches")({
  head: () => ({ meta: [{ title: "Branches — Revive Market Admin" }] }),
  component: () => {
    const [branches, setBranches] = useState<BranchStats[]>([]);
    useEffect(() => { branchesApi.stats().then(setBranches).catch(() => {}); }, []);

    if (branches.length === 0) return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading branches...</div>;

    return (
      <Tabs defaultValue={branches[0].name}>
        <TabsList>{branches.map((b) => <TabsTrigger key={b.id} value={b.name}>{b.name}</TabsTrigger>)}</TabsList>
        {branches.map((b) => (
          <TabsContent key={b.id} value={b.name} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-4">
              <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Sales</div><div className="text-xl font-bold mt-1">{fcfa(b.total_sales)}</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Inventory</div><div className="text-xl font-bold mt-1">{b.inventory_count}</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Repairs in progress</div><div className="text-xl font-bold mt-1">{b.active_repairs}</div></CardContent></Card>
              <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Staff</div><div className="text-xl font-bold mt-1">{b.staff_count}</div></CardContent></Card>
            </div>
            <Card><CardHeader><CardTitle>Team in {b.name}</CardTitle></CardHeader><CardContent>
              <ul className="divide-y">{b.staff_list.map((t: any) => <li key={t.id} className="py-2 flex justify-between text-sm"><span className="font-medium">{t.name}</span></li>)}</ul>
            </CardContent></Card>
          </TabsContent>
        ))}
      </Tabs>
    );
  },
});
