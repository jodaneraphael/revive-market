import { ShoppingCart, Leaf } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-sm">
        <span className="absolute text-lg font-black tracking-tight">R</span>
        <Leaf className="absolute -right-1 -top-1 h-3.5 w-3.5 text-accent-foreground bg-accent rounded-full p-0.5" />
        <ShoppingCart className="absolute -bottom-1 -right-1 h-3.5 w-3.5 text-primary bg-white rounded-full p-0.5" />
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-bold text-foreground">Revive Market</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Smart. Second Life.</span>
      </div>
    </div>
  );
}