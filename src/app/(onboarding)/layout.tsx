export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="max-w-sm mx-auto">{children}</div>
    </div>
  );
}
