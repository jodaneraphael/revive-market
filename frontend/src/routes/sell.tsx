import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CustomerLayout } from "@/components/CustomerLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { CATEGORIES, BRANCH_NAMES } from "@/lib/config";
import { sellRequestsApi } from "@/lib/api";
import { isAuthenticated, getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check } from "lucide-react";

export const Route = createFileRoute("/sell")({
  head: () => ({ meta: [{ title: "Sell Your Device — Revive Market" }, { name: "description", content: "Sell your phone, laptop, tablet or console to Revive Market. Free inspection and a fair offer." }] }),
  component: SellPage,
});

function SellPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/login", search: { redirect: "/sell" } });
    }
  }, []);

  const [step, setStep] = useState(1);
  const [cat, setCat] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>(["", "", "", ""]);
  const [idDoc, setIdDoc] = useState("");
  const [branch, setBranch] = useState("");
  const [loading, setLoading] = useState(false);

  const next = () => setStep((s) => Math.min(4, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    if (!cat || !brand || !model || !imei || !condition || !branch) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      await sellRequestsApi.create({
        device_name: `${brand} ${model}`,
        category: cat,
        imei,
        condition,
        description,
        photo_urls: photos.filter(Boolean),
        id_doc_url: idDoc || undefined,
        branch_id: BRANCH_NAMES.indexOf(branch as any) + 1,
      });
      toast.success("Sell request submitted! Our team will review within 24h.");
      setStep(1);
      setCat(""); setBrand(""); setModel(""); setImei("");
      setCondition(""); setDescription(""); setPhotos(["", "", "", ""]); setIdDoc(""); setBranch("");
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
        <h1 className="text-3xl font-bold text-foreground">Sell your device</h1>
        <p className="text-muted-foreground mt-1">Quick inspection, fair offer, payment via MoMo/Orange Money.</p>

        <div className="mt-6 flex items-center gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-8 w-8 rounded-full grid place-items-center text-xs font-bold ${s <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{s < step ? <Check className="h-4 w-4" /> : s}</div>
              {s < 4 && <div className={`flex-1 h-1 rounded ${s < step ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1"><span>Device</span><span>Condition</span><span>Photos</span><span>Contact</span></div>

        <Card className="mt-6"><CardHeader><CardTitle>{["Device info", "Condition", "Photos & proof", "Your details"][step - 1]}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && <>
              <div><Label>Category</Label><Select value={cat} onValueChange={setCat}><SelectTrigger className="mt-1"><SelectValue placeholder="Select category" /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><Label>Brand</Label><Input className="mt-1" placeholder="e.g. Samsung, Apple, HP" value={brand} onChange={(e) => setBrand(e.target.value)} /></div>
              <div><Label>Model</Label><Input className="mt-1" placeholder="e.g. Galaxy A14" value={model} onChange={(e) => setModel(e.target.value)} /></div>
              <div><Label>IMEI / Serial number</Label><Input className="mt-1" placeholder="15-digit IMEI" value={imei} onChange={(e) => setImei(e.target.value)} /><p className="text-xs text-muted-foreground mt-1">Required for theft check.</p></div>
            </>}
            {step === 2 && <>
              <div><Label>Overall condition</Label><Select value={condition} onValueChange={setCondition}><SelectTrigger className="mt-1"><SelectValue placeholder="Select condition" /></SelectTrigger><SelectContent><SelectItem value="excellent">Excellent — like new</SelectItem><SelectItem value="good">Good — light wear</SelectItem><SelectItem value="fair">Fair — visible wear</SelectItem><SelectItem value="broken">Issues / needs repair</SelectItem></SelectContent></Select></div>
              <div><Label>Description</Label><Textarea className="mt-1" rows={4} placeholder="Battery health, scratches, anything we should know..." value={description} onChange={(e) => setDescription(e.target.value)} /></div>
            </>}
            {step === 3 && <>
              <div>
                <Label>Device photos (up to 4)</Label>
                <div className="mt-2 space-y-3">
                  {photos.map((url, i) => (
                    <ImageUpload key={i} value={url} onChange={(v) => { const n = [...photos]; n[i] = v; setPhotos(n); }} />
                  ))}
                </div>
              </div>
              <div>
                <Label>Proof of ownership (ID or receipt)</Label>
                <p className="text-xs text-muted-foreground mb-2">Upload your national ID or purchase receipt.</p>
                <ImageUpload value={idDoc} onChange={setIdDoc} />
              </div>
            </>}
            {step === 4 && <>
              <div><Label>Full name</Label><Input className="mt-1" value={getUser()?.name || ""} disabled /></div>
              <div><Label>Phone number</Label><Input className="mt-1" value={getUser()?.phone || ""} disabled /></div>
              <div><Label>Preferred branch</Label><Select value={branch} onValueChange={setBranch}><SelectTrigger className="mt-1"><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{BRANCH_NAMES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
            </>}

            <div className="flex justify-between pt-2">
              <Button variant="outline" onClick={prev} disabled={step === 1}>Back</Button>
              {step < 4 ? <Button onClick={next} className="bg-accent hover:bg-accent/90 text-accent-foreground">Continue</Button>
                : <Button onClick={submit} disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground">{loading ? "Submitting..." : "Submit for inspection"}</Button>}
            </div>
          </CardContent>
        </Card>
      </div>
    </CustomerLayout>
  );
}
