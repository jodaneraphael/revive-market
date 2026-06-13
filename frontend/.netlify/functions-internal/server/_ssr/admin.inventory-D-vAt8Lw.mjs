import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-RrXKMtST.mjs";
import { G as GradeBadge } from "./GradeBadge-nHLpevpX.mjs";
import { S as StatusBadge } from "./StatusBadge-CPrROBjh.mjs";
import { C as CATEGORIES, G as GRADES, B as BRANCH_NAMES, d as devicesApi } from "./router-C1fwZHmB.mjs";
import { f as fcfa } from "./mock-data-DOSqPQ5A.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-BeZcHgog.mjs";
import { A as AlertDialog, a as AlertDialogContent, b as AlertDialogHeader, c as AlertDialogTitle, d as AlertDialogDescription, e as AlertDialogFooter, f as AlertDialogCancel, g as AlertDialogAction } from "./alert-dialog-DdaAQQFU.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { I as ImageUpload } from "./ImageUpload-DwXDKegU.mjs";
import { H as Plus, c as LoaderCircle, a as Eye, I as Pencil, J as Trash2, N as ChevronLeft, z as ChevronRight } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "./badge-DyfXZgLs.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/zod.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const SplitComponent = () => {
  const [devices, setDevices] = reactExports.useState([]);
  const [page, setPage] = reactExports.useState(1);
  const [totalPages, setTotalPages] = reactExports.useState(1);
  const [total, setTotal] = reactExports.useState(0);
  const [loading, setLoading] = reactExports.useState(true);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editOpen, setEditOpen] = reactExports.useState(false);
  const [viewOpen, setViewOpen] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [selected, setSelected] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [brand, setBrand] = reactExports.useState("");
  const [category, setCategory] = reactExports.useState("");
  const [grade, setGrade] = reactExports.useState("");
  const [price, setPrice] = reactExports.useState("");
  const [branchId, setBranchId] = reactExports.useState("");
  const [imei, setImei] = reactExports.useState("");
  const [specsText, setSpecsText] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [condition, setCondition] = reactExports.useState("");
  const [imageUrl, setImageUrl] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("In Stock");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const load = (p) => {
    setLoading(true);
    devicesApi.listPaginated(p).then((r) => {
      setDevices(r.data);
      setPage(r.page);
      setTotalPages(r.totalPages);
      setTotal(r.total);
    }).catch(() => {
    }).finally(() => setLoading(false));
  };
  reactExports.useEffect(() => {
    load(1);
  }, []);
  const resetForm = () => {
    setName("");
    setBrand("");
    setCategory("");
    setGrade("");
    setPrice("");
    setBranchId("");
    setImei("");
    setSpecsText("");
    setDescription("");
    setCondition("");
    setImageUrl("");
    setStatus("In Stock");
  };
  const addDevice = async () => {
    if (!name || !category || !grade || !price || !branchId) {
      toast.error("Fill required fields");
      return;
    }
    setSubmitting(true);
    try {
      const specs = specsText ? specsText.split("\n").filter(Boolean) : void 0;
      await devicesApi.create({
        name,
        brand: brand || void 0,
        category,
        grade,
        price: Number(price),
        branch_id: Number(branchId),
        imei: imei || void 0,
        specs,
        description: description || void 0,
        condition: condition || void 0,
        image_url: imageUrl || void 0
      });
      toast.success("Device added");
      setAddOpen(false);
      resetForm();
      load(page);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  const editDevice = async () => {
    if (!selected || !name || !category || !grade || !price || !branchId) {
      toast.error("Fill required fields");
      return;
    }
    setSubmitting(true);
    try {
      const specs = specsText ? specsText.split("\n").filter(Boolean) : null;
      await devicesApi.update(selected.id, {
        name,
        brand: brand || null,
        category,
        grade,
        price: Number(price),
        branch_id: Number(branchId),
        imei: imei || null,
        specs,
        description: description || null,
        condition: condition || null,
        image_url: imageUrl || null,
        status
      });
      toast.success("Device updated");
      setEditOpen(false);
      load(page);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setSubmitting(false);
    }
  };
  const deleteDevice = async () => {
    if (!deleteTarget) return;
    try {
      await devicesApi.delete(deleteTarget.id);
      toast.success("Device deleted");
      setDeleteTarget(null);
      load(page);
    } catch (e) {
      toast.error(e.message);
    }
  };
  const openEdit = (d) => {
    setSelected(d);
    setName(d.name);
    setBrand(d.brand || "");
    setCategory(d.category);
    setGrade(d.grade);
    setPrice(String(d.price));
    setBranchId(String(d.branch_id));
    setImei(d.imei || "");
    setSpecsText(d.specs ? JSON.parse(d.specs).join("\n") : "");
    setDescription(d.description || "");
    setCondition(d.condition || "");
    setImageUrl(d.image_url || "");
    setStatus(d.status);
    setEditOpen(true);
  };
  const openView = (d) => {
    setSelected(d);
    setViewOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-bold", children: [
        "Devices (",
        total,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: addOpen, onOpenChange: setAddOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-1" }),
          "Add device"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Add device" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brand" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: brand, onChange: (e) => setBrand(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Grade *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: grade, onValueChange: setGrade, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price (FCFA) *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: price, onChange: (e) => setPrice(e.target.value) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Branch *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branchId, onValueChange: setBranchId, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCH_NAMES.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i + 1), children: b }, b)) })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "IMEI" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: imei, onChange: (e) => setImei(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Specs (one per line)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: specsText, onChange: (e) => setSpecsText(e.target.value), placeholder: '6.1" Liquid Retina\nA13 Bionic\n64GB / 4GB RAM', className: "h-20" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Condition" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: condition, onChange: (e) => setCondition(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: imageUrl, onChange: setImageUrl })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: addDevice, disabled: submitting, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: submitting ? "Adding..." : "Add device" })
          ] })
        ] })
      ] })
    ] }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center py-12 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-5 w-5 animate-spin mr-2" }),
      "Loading..."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Image" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Tracking ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Grade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Branch" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Status" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: devices.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.image_url, alt: d.name, className: "h-10 w-10 rounded object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs", children: d.tracking_id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: d.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: d.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: d.grade }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-semibold", children: fcfa(d.price) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: d.branch_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: d.status }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openView(d), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => openEdit(d), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", className: "text-destructive", onClick: () => setDeleteTarget(d), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }) })
        ] }) })
      ] }, d.id)) })
    ] }) }) }),
    totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        total,
        " total devices"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: page <= 1, onClick: () => load(page - 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "h-4 w-4" }) }),
        Array.from({
          length: totalPages
        }, (_, i) => i + 1).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: p === page ? "default" : "outline", onClick: () => load(p), className: p === page ? "bg-accent text-accent-foreground hover:bg-accent/90" : "", children: p }, p)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", disabled: page >= totalPages, onClick: () => load(page + 1), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: viewOpen, onOpenChange: setViewOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: selected?.name }) }),
      selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: selected.image_url, alt: selected.name, className: "w-full h-48 object-cover rounded-lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tracking ID:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: selected.tracking_id })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Brand:" }),
            " ",
            selected.brand
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Category:" }),
            " ",
            selected.category
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Grade:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(GradeBadge, { grade: selected.grade })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Price:" }),
            " ",
            fcfa(selected.price)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Branch:" }),
            " ",
            selected.branch_name
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Status:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: selected.status })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "IMEI:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: selected.imei || "—" })
          ] })
        ] }),
        selected.condition && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Condition:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: selected.condition })
        ] }),
        selected.specs && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Specs:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "list-disc list-inside mt-1", children: JSON.parse(selected.specs).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: s }, i)) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editOpen, onOpenChange: setEditOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit device" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Name *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: name, onChange: (e) => setName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brand" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: brand, onChange: (e) => setBrand(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: setCategory, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Grade *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: grade, onValueChange: setGrade, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: GRADES.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: g, children: g }, g)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Price *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "number", value: price, onChange: (e) => setPrice(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Branch *" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branchId, onValueChange: setBranchId, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCH_NAMES.map((b, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: String(i + 1), children: b }, b)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "IMEI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { value: imei, onChange: (e) => setImei(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: status, onValueChange: setStatus, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "In Stock", children: "In Stock" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Sold", children: "Sold" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "In Repair", children: "In Repair" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Reserved", children: "Reserved" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Specs (one per line)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: specsText, onChange: (e) => setSpecsText(e.target.value), className: "h-20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: description, onChange: (e) => setDescription(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Condition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { value: condition, onChange: (e) => setCondition(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: imageUrl, onChange: setImageUrl })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: editDevice, disabled: submitting, className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground", children: submitting ? "Saving..." : "Save changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { open: !!deleteTarget, onOpenChange: (o) => {
      if (!o) setDeleteTarget(null);
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete device?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
          "This will permanently delete ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: deleteTarget?.name }),
          " (tracking: ",
          deleteTarget?.tracking_id,
          "). This action cannot be undone."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: deleteDevice, className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
      ] })
    ] }) })
  ] });
};
export {
  SplitComponent as component
};
