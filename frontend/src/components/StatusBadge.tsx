import { Badge } from "@/components/ui/badge";

const palette: Record<string, string> = {
  Delivered: "bg-accent text-accent-foreground",
  Completed: "bg-accent text-accent-foreground",
  Ready: "bg-accent text-accent-foreground",
  Paid: "bg-accent text-accent-foreground",
  Accepted: "bg-accent text-accent-foreground",
  Verified: "bg-accent text-accent-foreground",
  Released: "bg-accent text-accent-foreground",
  "In Stock": "bg-accent/15 text-accent border border-accent/30",
  Processing: "bg-warning/20 text-warning-foreground border border-warning/30",
  "Under Review": "bg-warning/20 text-warning-foreground border border-warning/30",
  Diagnosing: "bg-warning/20 text-warning-foreground border border-warning/30",
  "Awaiting Parts": "bg-warning/20 text-warning-foreground border border-warning/30",
  "In Repair": "bg-primary/15 text-primary border border-primary/30",
  "Out for Delivery": "bg-primary/15 text-primary border border-primary/30",
  "Offer Made": "bg-primary/15 text-primary border border-primary/30",
  Submitted: "bg-muted text-muted-foreground border",
  Received: "bg-muted text-muted-foreground border",
  Pending: "bg-muted text-muted-foreground border",
  Held: "bg-warning/20 text-warning-foreground border border-warning/30",
  Flagged: "bg-destructive text-destructive-foreground",
  Declined: "bg-destructive text-destructive-foreground",
  Cancelled: "bg-destructive text-destructive-foreground",
  Sold: "bg-muted text-muted-foreground border",
  Reserved: "bg-primary/15 text-primary border border-primary/30",
  "N/A": "bg-muted text-muted-foreground border",
};

export function StatusBadge({ status }: { status: string }) {
  return <Badge className={`${palette[status] ?? "bg-muted text-muted-foreground"} font-medium`}>{status}</Badge>;
}