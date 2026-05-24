"use client";

import { ArrowLeft, Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TopBarProps {
  title?: string;
  showBack?: boolean;
  showLogo?: boolean;
  showNotification?: boolean;
}

export default function TopBar({
  title,
  showBack = false,
  showLogo = false,
  showNotification = false,
}: TopBarProps) {
  const router = useRouter();

  return (
    <header className="top-bar">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full hover:bg-[var(--solvy-primary-container)] transition-colors active:scale-95"
            aria-label="Volver"
          >
            <ArrowLeft size={22} color="var(--solvy-text)" />
          </button>
        )}
        {showLogo && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--solvy-primary)] flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[var(--solvy-text)]">
              Solvy
            </span>
          </div>
        )}
        {title && (
          <h1 className="text-lg font-bold tracking-tight text-[var(--solvy-text)] uppercase">
            {title}
          </h1>
        )}
      </div>
      <div className="w-10 flex items-center justify-center">
        {showNotification && (
          <button
            className="p-2 rounded-full hover:bg-[var(--solvy-primary-container)] transition-colors active:scale-95 relative"
            aria-label="Notificaciones"
          >
            <Bell size={22} color="var(--solvy-primary)" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--solvy-error)] rounded-full" />
          </button>
        )}
      </div>
    </header>
  );
}
