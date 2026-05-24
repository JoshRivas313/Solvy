"use client";

import { cn } from "@/lib/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Btn = forwardRef<HTMLButtonElement, BtnProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-semibold rounded-pill transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:   "bg-primary-500 hover:bg-primary-600 text-white shadow-card",
      secondary: "bg-primary-100 hover:bg-primary-200 text-primary-700",
      ghost:     "bg-transparent hover:bg-neutral-100 text-neutral-700",
      danger:    "bg-red-50 hover:bg-red-100 text-red-600",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm gap-1.5",
      md: "px-5 py-3 text-sm gap-2",
      lg: "px-6 py-4 text-base gap-2",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
        ) : children}
      </button>
    );
  }
);
Btn.displayName = "Btn";
