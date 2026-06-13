import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Star, Loader2 } from "lucide-react";
import { techniciansApi, type TechPerformance } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/staff/performance")({
  head: () => ({ meta: [{ title: "My Performance — Revive Market Staff" }] }),
  component: () => {
    const user = getUser();
    const [perf, setPerf] = useState<TechPerformance | null>(null);

    useEffect(() => {
      if (user?.id) { techniciansApi.performance(user.id).then(setPerf).catch(() => {}); }
    }, []);

    if (!perf) return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading...</div>;

    const weeklyData = perf.weekly.map((w) => ({ week: w.week, jobs: w.jobs }));
    const stats = perf.stats;

    return (
      <>
        <div className="grid gap-4 md:grid-cols-4 mb-4">
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Jobs this month</div><div className="text-2xl font-bold">{stats.monthly_completed}</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Avg. turnaround</div><div className="text-2xl font-bold">{Number(stats.avg_turnover_days).toFixed(1)} days</div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Customer rating</div><div className="text-2xl font-bold flex items-center gap-1">{Number(stats.avg_rating).toFixed(1)} <Star className="h-5 w-5 text-warning fill-warning" /></div></CardContent></Card>
          <Card><CardContent className="p-4"><div className="text-xs text-muted-foreground uppercase">Active jobs</div><div className="text-2xl font-bold">{stats.active_jobs}</div></CardContent></Card>
        </div>
        <Card><CardHeader><CardTitle>Jobs completed (weekly)</CardTitle></CardHeader><CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="week" /><YAxis /><Tooltip /><Line type="monotone" dataKey="jobs" stroke="#2E7D32" strokeWidth={3} /></LineChart>
          </ResponsiveContainer>
        </CardContent></Card>
        <Card className="mt-4"><CardHeader><CardTitle>Recent customer feedback</CardTitle></CardHeader><CardContent className="space-y-3">
          {perf.feedback.length === 0 ? <div className="text-sm text-muted-foreground">No feedback yet.</div> :
          perf.feedback.map((f, i) => <div key={i} className="border-b last:border-0 pb-2"><div className="flex justify-between text-sm"><span className="font-medium">{f.customer_name}</span><span className="text-warning">{"★".repeat(f.rating)}{"☆".repeat(5-f.rating)}</span></div><div className="text-sm text-muted-foreground">"{f.message}"</div></div>)}
        </CardContent></Card>
      </>
    );
  },
});
