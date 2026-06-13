import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StatusBadge } from "@/components/StatusBadge";
import { repairsApi, type RepairJob } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/staff/jobs")({
  head: () => ({ meta: [{ title: "Repair Jobs — Revive Market Staff" }] }),
  component: () => {
    const [repairs, setRepairs] = useState<RepairJob[]>([]);
    const [selected, setSelected] = useState<number | null>(null);
    const [status, setStatus] = useState("");
    const [quote, setQuote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { repairsApi.list().then((data) => { setRepairs(data); if (data.length) setSelected(data[0].id); }).catch(() => {}); }, []);

    const job = repairs.find((r) => r.id === selected);
    useEffect(() => { if (job) setStatus(job.status); if (job?.quote) setQuote(String(job.quote)); }, [job?.id]);

    const update = async () => {
      if (!selected) return;
      setSubmitting(true);
      try {
        const body: Record<string, unknown> = { status };
        if (quote) body.quote = Number(quote);
        await repairsApi.update(selected, body);
        toast.success("Job updated");
        repairsApi.list().then(setRepairs).catch(() => {});
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    if (repairs.length === 0) return <div className="flex items-center justify-center py-20 text-muted-foreground"><Loader2 className="h-6 w-6 animate-spin mr-2" />Loading jobs...</div>;
    if (!job) return null;

    return (
      <div className="grid md:grid-cols-[300px_1fr] gap-4">
        <Card><CardContent className="p-2 space-y-1">
          {repairs.map((r) => (
            <button key={r.id} onClick={() => { setSelected(r.id); setStatus(r.status); setQuote(r.quote ? String(r.quote) : ""); }} className={`w-full text-left px-3 py-2 rounded-md text-sm transition ${selected === r.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>
              <div className="font-semibold">{r.device_name}</div>
              <div className={`text-xs ${selected === r.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{r.customer_name} · {r.status}</div>
            </button>
          ))}
        </CardContent></Card>

        <Card><CardHeader><CardTitle className="flex justify-between items-center"><span>{job.device_name}</span><StatusBadge status={job.status} /></CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><div className="text-xs uppercase text-muted-foreground">Customer</div><div className="font-medium">{job.customer_name}</div></div>
              <div><div className="text-xs uppercase text-muted-foreground">Branch</div><div className="font-medium">{job.branch_name}</div></div>
              <div className="col-span-2"><div className="text-xs uppercase text-muted-foreground">Customer-reported issue</div><div>{job.issue}</div></div>
            </div>
            <div><Label>Diagnosis notes</Label><Textarea rows={3} placeholder="What did you find?" /></div>
            <div><Label>Parts needed</Label><Input placeholder="e.g. LCD screen, battery..." /></div>
            <div><Label>Quote amount (FCFA)</Label><Input type="number" value={quote} onChange={(e) => setQuote(e.target.value)} placeholder="0" /></div>
            <div><Label>Update status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Received", "Diagnosing", "Awaiting Parts", "In Repair", "Ready", "Completed"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {job.quote && <div className="text-sm">Current quote: <span className="font-semibold">{fcfa(job.quote)}</span> · {job.quote_approved ? <span className="text-accent">Approved by customer</span> : <span className="text-warning-foreground">Awaiting approval</span>}</div>}
            <Button onClick={update} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Saving..." : "Save updates"}</Button>
          </CardContent>
        </Card>
      </div>
    );
  },
});
