import { Badge } from "@/components/ui/badge";
import type { Grade } from "@/lib/config";

export function GradeBadge({ grade }: { grade: Grade }) {
  const map: Record<Grade, string> = {
    A: "bg-accent text-accent-foreground hover:bg-accent",
    B: "bg-primary text-primary-foreground hover:bg-primary",
    C: "bg-warning text-warning-foreground hover:bg-warning",
  };
  return <Badge className={`${map[grade]} font-bold`}>Grade {grade}</Badge>;
}