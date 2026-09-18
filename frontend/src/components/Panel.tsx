import type { ReactNode } from 'react';

export function Panel({
  title, eyebrow, right, children, className = '',
}: {
  title?: string;
  eyebrow?: string;
  right?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`bg-base-850 border border-base-700 rounded-lg ${className}`}>
      {(title || right) && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-base-700">
          <div>
            {eyebrow && (
              <div className="text-[10px] tracking-[0.15em] text-text-tertiary font-mono-num uppercase mb-0.5">
                {eyebrow}
              </div>
            )}
            {title && <h2 className="font-display font-semibold text-sm text-text-primary">{title}</h2>}
          </div>
          {right}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
