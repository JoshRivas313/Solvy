import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="max-w-sm mx-auto pb-24">{children}</div>
      <BottomNav />
    </div>
  );
}
