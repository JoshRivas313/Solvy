"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/cn";

interface TopBarProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  backHref?: string;
  action?: React.ReactNode;
  className?: string;
}

export function TopBar({ title, subtitle, showBack, backHref, action, className }: TopBarProps) {
  const router = useRouter();

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-20 bg-surface/95 backdrop-blur-sm border-b border-neutral-100",
        "px-5 py-4 flex items-center gap-3",
        className
      )}
    >
      {showBack && (
        <button
          onClick={handleBack}
          className="p-1.5 -ml-1.5 rounded-xl hover:bg-neutral-100 transition-colors"
          aria-label="Volver"
        >
          <ArrowLeft size={20} className="text-neutral-700" />
        </button>
      )}

      <div className="flex-1 min-w-0">
        <h1 className="font-bold text-neutral-900 truncate">{title}</h1>
        {subtitle && <p className="text-xs text-neutral-500 mt-0.5">{subtitle}</p>}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
