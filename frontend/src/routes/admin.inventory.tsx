import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GradeBadge } from "@/components/GradeBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { devicesApi, type Device } from "@/lib/api";
import { fcfa } from "@/lib/mock-data";
import { useState, useEffect } from "react";
import { Plus, Loader2, Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { CATEGORIES, GRADES, BRANCH_NAMES } from "@/lib/config";

export const Route = createFileRoute("/admin/inventory")({
  head: () => ({ meta: [{ title: "Inventory — Revive Market Admin" }] }),
  component: () => {
    const [devices, setDevices] = useState<Device[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Device | null>(null);
    const [selected, setSelected] = useState<Device | null>(null);
    const [name, setName] = useState(""); const [brand, setBrand] = useState(""); const [category, setCategory] = useState("");
    const [grade, setGrade] = useState(""); const [price, setPrice] = useState(""); const [branchId, setBranchId] = useState("");
    const [imei, setImei] = useState(""); const [specsText, setSpecsText] = useState(""); const [description, setDescription] = useState("");
    const [condition, setCondition] = useState(""); const [imageUrl, setImageUrl] = useState(""); const [status, setStatus] = useState("In Stock");
    const [submitting, setSubmitting] = useState(false);

    const load = (p: number) => {
      setLoading(true);
      devicesApi.listPaginated(p).then((r) => { setDevices(r.data); setPage(r.page); setTotalPages(r.totalPages); setTotal(r.total); }).catch(() => {}).finally(() => setLoading(false));
    };
    useEffect(() => { load(1); }, []);

    const resetForm = () => { setName(""); setBrand(""); setCategory(""); setGrade(""); setPrice(""); setBranchId(""); setImei(""); setSpecsText(""); setDescription(""); setCondition(""); setImageUrl(""); setStatus("In Stock"); };

    const addDevice = async () => {
      if (!name || !category || !grade || !price || !branchId) { toast.error("Fill required fields"); return; }
      setSubmitting(true);
      try {
        const specs = specsText ? specsText.split("\n").filter(Boolean) : undefined;
        await devicesApi.create({ name, brand: brand || undefined, category, grade, price: Number(price), branch_id: Number(branchId), imei: imei || undefined, specs, description: description || undefined, condition: condition || undefined, image_url: imageUrl || undefined });
        toast.success("Device added"); setAddOpen(false); resetForm(); load(page);
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    const editDevice = async () => {
      if (!selected || !name || !category || !grade || !price || !branchId) { toast.error("Fill required fields"); return; }
      setSubmitting(true);
      try {
        const specs = specsText ? specsText.split("\n").filter(Boolean) : null;
        await devicesApi.update(selected.id, { name, brand: brand || null, category, grade, price: Number(price), branch_id: Number(branchId), imei: imei || null, specs, description: description || null, condition: condition || null, image_url: imageUrl || null, status });
        toast.success("Device updated"); setEditOpen(false); load(page);
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    const deleteDevice = async () => {
      if (!deleteTarget) return;
      try {
        await devicesApi.delete(deleteTarget.id);
        toast.success("Device deleted"); setDeleteTarget(null); load(page);
      } catch (e: any) { toast.error(e.message); }
    };

    const openEdit = (d: Device) => {
      setSelected(d); setName(d.name); setBrand(d.brand || ""); setCategory(d.category);
      setGrade(d.grade); setPrice(String(d.price)); setBranchId(String(d.branch_id));
      setImei(d.imei || ""); setSpecsText(d.specs ? JSON.parse(d.specs).join("\n") : ""); setDescription(d.description || "");
      setCondition(d.condition || ""); setImageUrl(d.image_url || ""); setStatus(d.status); setEditOpen(true);
    };

    const openView = (d: Device) => { setSelected(d); setViewOpen(true); };

    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Devices ({total})</h2>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Plus className="h-4 w-4 mr-1" />Add device</Button></DialogTrigger>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Add device</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><Label>Brand</Label><Input value={brand} onChange={(e) => setBrand(e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Category *</Label><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                  <div><Label>Grade *</Label><Select value={grade} onValueChange={setGrade}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{GRADES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Price (FCFA) *</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
                  <div><Label>Branch *</Label><Select value={branchId} onValueChange={setBranchId}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{BRANCH_NAMES.map((b, i) => <SelectItem key={b} value={String(i + 1)}>{b}</SelectItem>)}</SelectContent></Select></div>
                </div>
                <div><Label>IMEI</Label><Input value={imei} onChange={(e) => setImei(e.target.value)} /></div>
                <div><Label>Specs (one per line)</Label><Textarea value={specsText} onChange={(e) => setSpecsText(e.target.value)} placeholder='6.1" Liquid Retina&#10;A13 Bionic&#10;64GB / 4GB RAM' className="h-20" /></div>
                <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
                <div><Label>Condition</Label><Textarea value={condition} onChange={(e) => setCondition(e.target.value)} /></div>
                <div><Label>Image</Label><ImageUpload value={imageUrl} onChange={setImageUrl} /></div>
                <Button onClick={addDevice} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Adding..." : "Add device"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Image</TableHead><TableHead>Tracking ID</TableHead><TableHead>Name</TableHead><TableHead>Category</TableHead><TableHead>Grade</TableHead><TableHead>Price</TableHead><TableHead>Branch</TableHead><TableHead>Status</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>{devices.map((d) => (
            <TableRow key={d.id}>
              <TableCell><img src={d.image_url} alt={d.name} className="h-10 w-10 rounded object-cover" /></TableCell>
              <TableCell className="font-mono text-xs">{d.tracking_id}</TableCell>
              <TableCell className="font-medium">{d.name}</TableCell>
              <TableCell>{d.category}</TableCell>
              <TableCell><GradeBadge grade={d.grade as any} /></TableCell>
              <TableCell className="font-semibold">{fcfa(d.price)}</TableCell>
              <TableCell>{d.branch_name}</TableCell>
              <TableCell><StatusBadge status={d.status} /></TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openView(d)}><Eye className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => openEdit(d)}><Pencil className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(d)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <span>{total} total devices</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => load(page - 1)}><ChevronLeft className="h-4 w-4" /></Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button key={p} size="sm" variant={p === page ? "default" : "outline"} onClick={() => load(p)} className={p === page ? "bg-accent text-accent-foreground hover:bg-accent/90" : ""}>{p}</Button>
              ))}
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => load(page + 1)}><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        )}

        {/* View modal */}
        <Dialog open={viewOpen} onOpenChange={setViewOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>{selected?.name}</DialogTitle></DialogHeader>
            {selected && <div className="space-y-3 text-sm">
              <img src={selected.image_url} alt={selected.name} className="w-full h-48 object-cover rounded-lg" />
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-muted-foreground">Tracking ID:</span> <span className="font-mono">{selected.tracking_id}</span></div>
                <div><span className="text-muted-foreground">Brand:</span> {selected.brand}</div>
                <div><span className="text-muted-foreground">Category:</span> {selected.category}</div>
                <div><span className="text-muted-foreground">Grade:</span> <GradeBadge grade={selected.grade as any} /></div>
                <div><span className="text-muted-foreground">Price:</span> {fcfa(selected.price)}</div>
                <div><span className="text-muted-foreground">Branch:</span> {selected.branch_name}</div>
                <div><span className="text-muted-foreground">Status:</span> <StatusBadge status={selected.status} /></div>
                <div><span className="text-muted-foreground">IMEI:</span> <span className="font-mono">{selected.imei || "—"}</span></div>
              </div>
              {selected.condition && <div><span className="text-muted-foreground">Condition:</span><p className="mt-1">{selected.condition}</p></div>}
              {selected.specs && <div><span className="text-muted-foreground">Specs:</span><ul className="list-disc list-inside mt-1">{JSON.parse(selected.specs).map((s: string, i: number) => <li key={i}>{s}</li>)}</ul></div>}
            </div>}
          </DialogContent>
        </Dialog>

        {/* Edit modal */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Edit device</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>Brand</Label><Input value={brand} onChange={(e) => setBrand(e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Category *</Label><Select value={category} onValueChange={setCategory}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select></div>
                <div><Label>Grade *</Label><Select value={grade} onValueChange={setGrade}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{GRADES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>Price *</Label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></div>
                <div><Label>Branch *</Label><Select value={branchId} onValueChange={setBranchId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{BRANCH_NAMES.map((b, i) => <SelectItem key={b} value={String(i + 1)}>{b}</SelectItem>)}</SelectContent></Select></div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label>IMEI</Label><Input value={imei} onChange={(e) => setImei(e.target.value)} /></div>
                <div><Label>Status</Label><Select value={status} onValueChange={setStatus}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="In Stock">In Stock</SelectItem><SelectItem value="Sold">Sold</SelectItem><SelectItem value="In Repair">In Repair</SelectItem><SelectItem value="Reserved">Reserved</SelectItem></SelectContent></Select></div>
              </div>
              <div><Label>Specs (one per line)</Label><Textarea value={specsText} onChange={(e) => setSpecsText(e.target.value)} className="h-20" /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} /></div>
              <div><Label>Condition</Label><Textarea value={condition} onChange={(e) => setCondition(e.target.value)} /></div>
              <div><Label>Image</Label><ImageUpload value={imageUrl} onChange={setImageUrl} /></div>
              <Button onClick={editDevice} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Saving..." : "Save changes"}</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Delete device?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete <strong>{deleteTarget?.name}</strong> (tracking: {deleteTarget?.tracking_id}). This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteDevice} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
});
