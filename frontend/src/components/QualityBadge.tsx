import type { DataQuality } from '../types';

const CONFIG: Record<DataQuality, { label: string; className: string }> = {
  LIVE: { label: 'LIVE', className: 'text-regime-on bg-regime-on-dim' },
  DELAYED: { label: 'DELAYED', className: 'text-regime-neutral bg-regime-neutral-dim' },
  ESTIMATED: { label: 'ESTIMATED', className: 'text-text-secondary bg-base-700' },
  UNAVAILABLE: { label: 'UNAVAILABLE', className: 'text-regime-off bg-regime-off-dim' },
};

export function QualityBadge({ quality }: { quality: DataQuality }) {
  const c = CONFIG[quality];
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono-num tracking-wide ${c.className}`}>
      <span className="w-1 h-1 rounded-full bg-current" />
      {c.label}
    </span>
  );
}
