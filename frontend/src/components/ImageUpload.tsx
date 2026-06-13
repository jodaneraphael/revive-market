import { useRef, useState } from "react";
import { Upload, Link, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { API_BASE } from "@/lib/config";
import { getToken } from "@/lib/auth";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState<"url" | "file">(value ? "url" : "file");

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${API_BASE}/uploads/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onChange(`${API_BASE.replace("/api", "")}${data.url}`);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-1 text-xs text-muted-foreground">
        <button type="button" onClick={() => setMode("file")} className={`px-2 py-1 rounded ${mode === "file" ? "bg-primary-soft font-semibold" : ""}`}><Upload className="h-3 w-3 inline mr-1" />Upload</button>
        <button type="button" onClick={() => setMode("url")} className={`px-2 py-1 rounded ${mode === "url" ? "bg-primary-soft font-semibold" : ""}`}><Link className="h-3 w-3 inline mr-1" />URL</button>
      </div>
      {mode === "file" ? (
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" disabled={uploading} onClick={() => fileRef.current?.click()}>
            {uploading ? "Uploading..." : "Choose file"}
          </Button>
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
          {value && <span className="text-xs text-muted-foreground truncate max-w-[200px]">{value.split("/").pop()}</span>}
        </div>
      ) : (
        <div className="flex gap-2">
          <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." className="flex-1" />
          {value && <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")}><X className="h-4 w-4" /></Button>}
        </div>
      )}
      {value && <img src={value} alt="Preview" className="w-full h-32 object-cover rounded-lg border" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
    </div>
  );
}
