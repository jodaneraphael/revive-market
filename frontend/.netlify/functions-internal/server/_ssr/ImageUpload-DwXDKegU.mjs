import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { A as API_BASE, k as getToken } from "./router-C1fwZHmB.mjs";
import { V as Upload, X as Link, Y as X } from "../_libs/lucide-react.mjs";
function ImageUpload({ value, onChange }) {
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const [mode, setMode] = reactExports.useState(value ? "url" : "file");
  const uploadFile = async (file) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await fetch(`${API_BASE}/uploads/image`, {
        method: "POST",
        headers: { Authorization: `Bearer ${getToken()}` },
        body: fd
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onChange(`${API_BASE.replace("/api", "")}${data.url}`);
    } catch (e) {
      alert(e.message);
    } finally {
      setUploading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMode("file"), className: `px-2 py-1 rounded ${mode === "file" ? "bg-primary-soft font-semibold" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-3 w-3 inline mr-1" }),
        "Upload"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => setMode("url"), className: `px-2 py-1 rounded ${mode === "url" ? "bg-primary-soft font-semibold" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "h-3 w-3 inline mr-1" }),
        "URL"
      ] })
    ] }),
    mode === "file" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", size: "sm", disabled: uploading, onClick: () => fileRef.current?.click(), children: uploading ? "Uploading..." : "Choose file" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: fileRef, type: "file", accept: "image/*", hidden: true, onChange: (e) => {
        const f = e.target.files?.[0];
        if (f) uploadFile(f);
      } }),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground truncate max-w-[200px]", children: value.split("/").pop() })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value, onChange: (e) => onChange(e.target.value), placeholder: "https://...", className: "flex-1" }),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => onChange(""), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: value, alt: "Preview", className: "w-full h-32 object-cover rounded-lg border", onError: (e) => {
      e.target.style.display = "none";
    } })
  ] });
}
export {
  ImageUpload as I
};
