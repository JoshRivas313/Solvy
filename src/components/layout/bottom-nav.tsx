"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, BookOpen, Target, User } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { href: "/dashboard",  icon: Home,       label: "Inicio"    },
  { href: "/simulator",  icon: TrendingUp, label: "Simular"   },
  { href: "/education",  icon: BookOpen,   label: "Aprender"  },
  { href: "/goals",      icon: Target,     label: "Metas"     },
  { href: "/profile",    icon: User,       label: "Perfil"    },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-surface border-t border-neutral-100 safe-bottom">
      <div className="max-w-sm mx-auto flex">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center gap-1 py-3 px-2 transition-colors",
                active ? "text-primary-600" : "text-neutral-400 hover:text-neutral-600"
              )}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.5 : 1.8}
                className={cn(active && "drop-shadow-sm")}
              />
              <span className={cn("text-[10px] font-medium", active && "font-semibold")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
