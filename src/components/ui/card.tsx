import { cn } from "@/lib/utils/cn";
import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ padding = "md", className, children, ...props }: CardProps) {
  const paddings = {
    none: "",
    sm:   "p-3",
    md:   "p-4",
    lg:   "p-5",
  };

  return (
    <div
      className={cn(
        "bg-surface rounded-card shadow-card border border-neutral-100",
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
