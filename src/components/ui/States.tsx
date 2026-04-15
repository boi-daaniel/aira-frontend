type LoadingStateProps = {
  title: string;
  description: string;
};

type EmptyStateProps = {
  title: string;
  description: string;
};

type ErrorStateProps = {
  title: string;
  description: string;
};

export function LoadingState({ title, description }: LoadingStateProps) {
  return (
    <section className="status-panel">
      <p className="eyebrow">Loading</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="status-panel">
      <p className="eyebrow">No data</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <section className="status-panel status-panel--error">
      <p className="eyebrow">Error</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </section>
  );
}
