interface ProgressBarProps {
  step: number;
  total: number;
}

export default function OnboardingProgress({ step, total }: ProgressBarProps) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="w-full pt-12 px-6 animate-fade-in">
      <div className="flex justify-between items-end mb-3">
        <span className="text-xs uppercase tracking-wider font-bold text-[var(--solvy-primary)]">
          PASO {step} DE {total}
        </span>
        <span className="text-xs font-bold text-[var(--solvy-text-secondary)]">{percent}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
