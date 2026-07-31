import type { ReactNode } from 'react';

export function Row({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export function Stack({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {label ? (
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
      ) : null}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

export function Guidelines({
  items,
}: {
  items: Array<{ kind: 'do' | 'dont'; text: string }>;
}) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((item) => (
        <li key={`${item.kind}-${item.text}`} className="flex gap-3">
          <span
            className={`shrink-0 font-medium ${
              item.kind === 'do' ? 'text-primary' : 'text-destructive'
            }`}
          >
            {item.kind === 'do' ? 'Do' : "Don't"}
          </span>
          <span className="text-muted-foreground">{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Structured AI-oriented documentation block for KitchenKin semantic
 * components. Covers purpose, usage rules, composition guidance,
 * accessibility notes, and a copy-pasteable JSX example.
 */
export function DocBlock({
  purpose,
  whenToUse,
  whenNotToUse,
  composition,
  accessibility,
  example,
}: {
  purpose: string;
  whenToUse: string[];
  whenNotToUse: string[];
  composition: string;
  accessibility: string;
  example?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-5 text-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Purpose
        </p>
        <p className="text-foreground leading-relaxed">{purpose}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            When to use
          </p>
          <ul className="space-y-1.5">
            {whenToUse.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0 text-primary font-semibold leading-snug mt-px">✓</span>
                <span className="text-muted-foreground leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            When not to use
          </p>
          <ul className="space-y-1.5">
            {whenNotToUse.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="shrink-0 text-destructive font-semibold leading-snug mt-px">✗</span>
                <span className="text-muted-foreground leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Composition guidance
        </p>
        <p className="text-muted-foreground leading-relaxed">{composition}</p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
          Accessibility
        </p>
        <p className="text-muted-foreground leading-relaxed">{accessibility}</p>
      </div>

      {example != null && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Example
          </p>
          <pre className="rounded-lg bg-muted px-4 py-3 text-xs leading-relaxed font-mono overflow-x-auto whitespace-pre">
            {example}
          </pre>
        </div>
      )}
    </div>
  );
}
