interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon = "📭", title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
      <span className="text-4xl">{icon}</span>
      <p className="font-semibold text-neutral-700">{title}</p>
      {description && <p className="text-sm text-neutral-500 max-w-xs">{description}</p>}
    </div>
  );
}
