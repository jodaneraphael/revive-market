import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { techniciansApi, type Technician } from "@/lib/api";
import { BRANCH_NAMES } from "@/lib/config";
import { Star, Plus, Loader2, Pencil, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogAction, AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/admin/technicians")({
  head: () => ({ meta: [{ title: "Technicians — Revive Market Admin" }] }),
  component: () => {
    const [techs, setTechs] = useState<Technician[]>([]);
    const [loading, setLoading] = useState(true);
    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<Technician | null>(null);
    const [editTarget, setEditTarget] = useState<Technician | null>(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [branchId, setBranchId] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const load = () => {
      setLoading(true);
      techniciansApi.list().then(setTechs).catch(() => {}).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    const resetForm = () => { setName(""); setEmail(""); setPhone(""); setPassword(""); setBranchId(""); };

    const addTech = async () => {
      if (!name || !email || !password || !branchId) { toast.error("Fill required fields"); return; }
      setSubmitting(true);
      try {
        await techniciansApi.create({ name, email, password, phone: phone || undefined, branch_id: Number(branchId) });
        toast.success(`${name} added as technician`);
        setAddOpen(false); resetForm(); load();
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    const openEdit = (t: Technician) => {
      setEditTarget(t); setName(t.name); setEmail(t.email); setPhone(t.phone || ""); setPassword(""); setBranchId(String(t.branch_id || "")); setEditOpen(true);
    };

    const editTech = async () => {
      if (!editTarget || !name || !email || !branchId) { toast.error("Fill required fields"); return; }
      setSubmitting(true);
      try {
        await techniciansApi.update(editTarget.id, { name, email, phone: phone || null, branch_id: Number(branchId) });
        toast.success("Technician updated"); setEditOpen(false); load();
      } catch (e: any) { toast.error(e.message); } finally { setSubmitting(false); }
    };

    const deleteTech = async () => {
      if (!deleteTarget) return;
      try {
        await techniciansApi.delete(deleteTarget.id);
        toast.success("Technician removed"); setDeleteTarget(null); load();
      } catch (e: any) { toast.error(e.message); }
    };

    return (
      <>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Team ({techs.length})</h2>
          <Dialog open={addOpen} onOpenChange={setAddOpen}>
            <DialogTrigger asChild><Button className="bg-accent hover:bg-accent/90 text-accent-foreground"><Plus className="h-4 w-4 mr-1" />Add technician</Button></DialogTrigger>
            <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Add technician</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><Label>Email *</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
                <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
                <div><Label>Password *</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                <div><Label>Branch *</Label><Select value={branchId} onValueChange={setBranchId}><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger><SelectContent>{BRANCH_NAMES.map((b, i) => <SelectItem key={b} value={String(i + 1)}>{b}</SelectItem>)}</SelectContent></Select></div>
                <Button onClick={addTech} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Adding..." : "Add technician"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? <div className="flex items-center justify-center py-12 text-muted-foreground"><Loader2 className="h-5 w-5 animate-spin mr-2" />Loading...</div> :
        <Card><CardContent className="p-0"><Table><TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Email</TableHead><TableHead>Branch</TableHead><TableHead>Active jobs</TableHead><TableHead>Completed</TableHead><TableHead>Rating</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>{techs.map((t) => (
            <TableRow key={t.id}>
              <TableCell className="font-medium">{t.name}</TableCell>
              <TableCell className="text-xs text-muted-foreground">{t.email}</TableCell>
              <TableCell>{t.branch_name}</TableCell>
              <TableCell>{t.active_jobs}</TableCell>
              <TableCell>{t.completed_jobs}</TableCell>
              <TableCell><span className="inline-flex items-center gap-1 font-semibold"><Star className="h-3.5 w-3.5 text-warning fill-warning" />{Number(t.rating).toFixed(1)}</span></TableCell>
              <TableCell className="text-right"><div className="flex items-center justify-end gap-1">
                <Button size="icon" variant="ghost" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                <Button size="icon" variant="ghost" className="text-destructive" onClick={() => setDeleteTarget(t)}><Trash2 className="h-4 w-4" /></Button>
              </div></TableCell>
            </TableRow>
          ))}</TableBody>
        </Table></CardContent></Card>}

        {/* Edit dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="max-w-md"><DialogHeader><DialogTitle>Edit technician</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name *</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div><Label>Email *</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
              <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} /></div>
              <div><Label>Branch *</Label><Select value={branchId} onValueChange={setBranchId}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{BRANCH_NAMES.map((b, i) => <SelectItem key={b} value={String(i + 1)}>{b}</SelectItem>)}</SelectContent></Select></div>
              <Button onClick={editTech} disabled={submitting} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{submitting ? "Saving..." : "Save changes"}</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={!!deleteTarget} onOpenChange={(o) => { if (!o) setDeleteTarget(null); }}>
          <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Remove technician?</AlertDialogTitle>
              <AlertDialogDescription>
                Permanently remove <strong>{deleteTarget?.name}</strong> from the team? They will lose access to the staff dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteTech} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Remove</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  },
});
