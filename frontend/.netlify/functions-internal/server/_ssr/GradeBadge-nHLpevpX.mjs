import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Badge } from "./badge-DyfXZgLs.mjs";
function GradeBadge({ grade }) {
  const map = {
    A: "bg-accent text-accent-foreground hover:bg-accent",
    B: "bg-primary text-primary-foreground hover:bg-primary",
    C: "bg-warning text-warning-foreground hover:bg-warning"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: `${map[grade]} font-bold`, children: [
    "Grade ",
    grade
  ] });
}
export {
  GradeBadge as G
};
