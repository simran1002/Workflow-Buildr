import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          default: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
          success: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
          warning: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
          destructive: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
          outline: "border border-slate-300 dark:border-slate-600 bg-transparent",
        }[variant],
        className
      )}
      {...props}
    />
  );
}

export { Badge };
