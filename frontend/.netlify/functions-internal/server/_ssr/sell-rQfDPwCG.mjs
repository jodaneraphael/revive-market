import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { C as CustomerLayout } from "./CustomerLayout-Ceu3AUAt.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-DQ5v2DYb.mjs";
import { B as Button } from "./button-DA2gxxPy.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { L as Label } from "./label-JU3yqRBo.mjs";
import { T as Textarea } from "./textarea-DSyJ1nlY.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-CZRUt5a6.mjs";
import { I as ImageUpload } from "./ImageUpload-DwXDKegU.mjs";
import { i as isAuthenticated, C as CATEGORIES, g as getUser, B as BRANCH_NAMES, a as sellRequestsApi } from "./router-C1fwZHmB.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { C as Check } from "../_libs/lucide-react.mjs";
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
import "./NotificationBell-D0D7moRf.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/zod.mjs";
function SellPage() {
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!isAuthenticated()) {
      navigate({
        to: "/login",
        search: {
          redirect: "/sell"
        }
      });
    }
  }, []);
  const [step, setStep] = reactExports.useState(1);
  const [cat, setCat] = reactExports.useState("");
  const [brand, setBrand] = reactExports.useState("");
  const [model, setModel] = reactExports.useState("");
  const [imei, setImei] = reactExports.useState("");
  const [condition, setCondition] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [photos, setPhotos] = reactExports.useState(["", "", "", ""]);
  const [idDoc, setIdDoc] = reactExports.useState("");
  const [branch, setBranch] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
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
        id_doc_url: idDoc || void 0,
        branch_id: BRANCH_NAMES.indexOf(branch) + 1
      });
      toast.success("Sell request submitted! Our team will review within 24h.");
      setStep(1);
      setCat("");
      setBrand("");
      setModel("");
      setImei("");
      setCondition("");
      setDescription("");
      setPhotos(["", "", "", ""]);
      setIdDoc("");
      setBranch("");
    } catch {
      toast.error("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };
  if (!isAuthenticated()) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomerLayout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-bold text-foreground", children: "Sell your device" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1", children: "Quick inspection, fair offer, payment via MoMo/Orange Money." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex items-center gap-2", children: [1, 2, 3, 4].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `h-8 w-8 rounded-full grid place-items-center text-xs font-bold ${s <= step ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`, children: s < step ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) : s }),
      s < 4 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex-1 h-1 rounded ${s < step ? "bg-accent" : "bg-muted"}` })
    ] }, s)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Device" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Condition" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Photos" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Contact" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: ["Device info", "Condition", "Photos & proof", "Your details"][step - 1] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: cat, onValueChange: setCat, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select category" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Brand" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", placeholder: "e.g. Samsung, Apple, HP", value: brand, onChange: (e) => setBrand(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Model" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", placeholder: "e.g. Galaxy A14", value: model, onChange: (e) => setModel(e.target.value) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "IMEI / Serial number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", placeholder: "15-digit IMEI", value: imei, onChange: (e) => setImei(e.target.value) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Required for theft check." })
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Overall condition" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: condition, onValueChange: setCondition, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select condition" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "excellent", children: "Excellent — like new" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "good", children: "Good — light wear" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "fair", children: "Fair — visible wear" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "broken", children: "Issues / needs repair" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { className: "mt-1", rows: 4, placeholder: "Battery health, scratches, anything we should know...", value: description, onChange: (e) => setDescription(e.target.value) })
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Device photos (up to 4)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-3", children: photos.map((url, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: url, onChange: (v) => {
              const n = [...photos];
              n[i] = v;
              setPhotos(n);
            } }, i)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Proof of ownership (ID or receipt)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: "Upload your national ID or purchase receipt." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ImageUpload, { value: idDoc, onChange: setIdDoc })
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Full name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", value: getUser()?.name || "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Phone number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "mt-1", value: getUser()?.phone || "", disabled: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Preferred branch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: branch, onValueChange: setBranch, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: BRANCH_NAMES.map((b) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: b, children: b }, b)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", onClick: prev, disabled: step === 1, children: "Back" }),
          step < 4 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: next, className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: "Continue" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: submit, disabled: loading, className: "bg-accent hover:bg-accent/90 text-accent-foreground", children: loading ? "Submitting..." : "Submit for inspection" })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  SellPage as component
};
