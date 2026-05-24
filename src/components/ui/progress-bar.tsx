import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, max = 100, color, className, showLabel }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-2 bg-neutral-100 rounded-pill overflow-hidden">
        <div
          className="h-full rounded-pill transition-all duration-500"
          style={{
            width: `${pct}%`,
            backgroundColor: color ?? "rgb(var(--color-primary-500))",
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-neutral-500 w-8 text-right">{pct}%</span>
      )}
    </div>
  );
}
