import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { GradeBadge } from "@/components/GradeBadge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { sellRequestsApi, type SellRequest } from "@/lib/api";
import { GRADE_INFO } from "@/lib/mock-data";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/staff/grading")({
  head: () => ({ meta: [{ title: "Device Grading — Revive Market Staff" }] }),
  component: () => {
    const [requests, setRequests] = useState<SellRequest[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [grade, setGrade] = useState("A");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { sellRequestsApi.list().then(setRequests).catch(() => {}); }, []);

    const sr = requests.find((r) => r.id === selectedId);

    const save = async () => {
      if (!selectedId) { toast.error("Select a request first"); return; }
      setSubmitting(true);
      try {
        await sellRequestsApi.update(selectedId, { status: "Accepted", grade, offer: sr?.offer || undefined });
        toast.success("Device graded and added to inventory");
        sellRequestsApi.list().then(setRequests).catch(() => {});
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    return (
      <div className="max-w-3xl">
        <Card><CardHeader><CardTitle>Grade incoming device</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div><Label>Select sell request</Label>
              <Select value={selectedId ? String(selectedId) : ""} onValueChange={(v) => setSelectedId(Number(v))}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Choose a request" /></SelectTrigger>
                <SelectContent>{requests.filter((r) => r.status === "Under Review" || r.status === "Submitted").map((r) => <SelectItem key={r.id} value={String(r.id)}>{r.device_name} — {r.customer_name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {sr && <>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Device</Label><Input className="mt-1" value={sr.device_name} disabled /></div>
                <div><Label>IMEI</Label><Input className="mt-1" value={sr.imei} disabled /></div>
              </div>
              <div><Label>IMEI verification result</Label><Input className="mt-1" value={sr.imei_status === "Verified" ? "Clean — not reported lost/stolen" : "Pending"} /></div>
            </>}
            <div>
              <Label>Assign grade</Label>
              <RadioGroup value={grade} onValueChange={setGrade} className="mt-2 grid grid-cols-3 gap-2">
                {(["A","B","C"] as const).map((g) => (
                  <label key={g} className="rounded-lg border p-3 cursor-pointer has-[:checked]:border-accent has-[:checked]:bg-accent-soft/30">
                    <div className="flex items-center gap-2"><RadioGroupItem value={g} /><GradeBadge grade={g} /></div>
                    <div className="text-xs text-muted-foreground mt-2">{GRADE_INFO[g].desc}</div>
                  </label>
                ))}
              </RadioGroup>
            </div>
            <div className="rounded-lg border p-3 space-y-2">
              <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Factory reset performed</label>
              <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> iCloud / Google account de-linked</label>
              <label className="flex items-center gap-2 text-sm"><Checkbox /> Battery health logged (≥ minimum for grade)</label>
            </div>
            <Button onClick={save} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Saving..." : "Save grading"}</Button>
          </CardContent>
        </Card>
      </div>
    );
  },
});
