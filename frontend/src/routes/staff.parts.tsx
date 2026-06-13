import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusBadge } from "@/components/StatusBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { partsApi, repairsApi, type PartRequest, type RepairJob } from "@/lib/api";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/staff/parts")({
  head: () => ({ meta: [{ title: "Parts Request — Revive Market Staff" }] }),
  component: () => {
    const [parts, setParts] = useState<PartRequest[]>([]);
    const [repairs, setRepairs] = useState<RepairJob[]>([]);
    const [partName, setPartName] = useState("");
    const [qty, setQty] = useState(1);
    const [jobId, setJobId] = useState("");

    useEffect(() => {
      partsApi.list().then(setParts).catch(() => {});
      repairsApi.list().then(setRepairs).catch(() => {});
    }, []);

    const submit = async () => {
      if (!partName || !jobId) { toast.error("Fill in all fields"); return; }
      try {
        await partsApi.create({ repair_job_id: Number(jobId), part_name: partName, quantity: qty });
        toast.success("Part request submitted");
        setPartName(""); setQty(1); setJobId("");
        partsApi.list().then(setParts).catch(() => {});
      } catch (e: any) { toast.error(e.message); }
    };

    return (
      <div className="grid md:grid-cols-[1fr_360px] gap-4">
        <Card><CardHeader><CardTitle>My requests</CardTitle></CardHeader><CardContent className="p-0">
          {parts.length === 0 ? <div className="p-6 text-center text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mx-auto mb-2" />Loading...</div> :
          <Table><TableHeader><TableRow><TableHead>ID</TableHead><TableHead>Part</TableHead><TableHead>Qty</TableHead><TableHead>For job</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
            <TableBody>{parts.map((p) => (
              <TableRow key={p.id}><TableCell className="font-mono text-xs">{p.id}</TableCell><TableCell>{p.part_name}</TableCell><TableCell>{p.quantity}</TableCell><TableCell>{p.device_name}</TableCell><TableCell><StatusBadge status={p.status === "Fulfilled" ? "Accepted" : p.status === "Released" ? "Released" : "Pending"} /></TableCell></TableRow>
            ))}</TableBody>
          </Table>}
        </CardContent></Card>
        <Card><CardHeader><CardTitle>New request</CardTitle></CardHeader><CardContent className="space-y-3">
          <div><Label>Part name</Label><Input className="mt-1" placeholder="e.g. iPhone 12 battery" value={partName} onChange={(e) => setPartName(e.target.value)} /></div>
          <div><Label>Quantity</Label><Input type="number" className="mt-1" value={qty} onChange={(e) => setQty(Number(e.target.value))} /></div>
          <div><Label>For repair job</Label>
            <Select value={jobId} onValueChange={setJobId}>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select job" /></SelectTrigger>
              <SelectContent>{repairs.map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.id} — {r.device_name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <Button onClick={submit} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">Submit request</Button>
        </CardContent></Card>
      </div>
    );
  },
});
