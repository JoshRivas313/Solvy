"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BarChart3, GraduationCap, Target, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Inicio", icon: Home },
  { href: "/simular", label: "Simular", icon: BarChart3 },
  { href: "/aprender", label: "Aprender", icon: GraduationCap },
  { href: "/metas", label: "Metas", icon: Target },
  { href: "/perfil", label: "Perfil", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={isActive ? "active" : ""}>
            <item.icon size={22} strokeWidth={isActive ? 2.5 : 1.5} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
