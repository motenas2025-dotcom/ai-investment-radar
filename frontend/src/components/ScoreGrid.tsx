import type { ScoreBlock } from '../types';
import { QualityBadge } from './QualityBadge';

function scoreColor(v: number) {
  if (v >= 70) return 'var(--color-regime-on)';
  if (v >= 55) return 'var(--color-regime-neutral)';
  if (v >= 40) return 'var(--color-regime-caution)';
  return 'var(--color-regime-off)';
}

function ScoreCard({ s }: { s: ScoreBlock }) {
  const color = scoreColor(s.value);
  return (
    <div className="bg-base-800 border border-base-700 rounded-md p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-xs text-text-secondary font-medium leading-tight">{s.label}</span>
        <QualityBadge quality={s.quality} />
      </div>
      <div className="flex items-end gap-2">
        <span className="font-mono-num text-2xl font-bold" style={{ color }}>{s.value}</span>
        <span className="text-text-tertiary text-xs mb-0.5">/ 100</span>
      </div>
      <div className="w-full h-1.5 bg-base-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: color }} />
      </div>
      <p className="text-[11px] text-text-tertiary leading-relaxed">{s.description}</p>
    </div>
  );
}

export function ScoreGrid({ scores }: { scores: ScoreBlock[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
      {scores.map((s) => <ScoreCard key={s.key} s={s} />)}
    </div>
  );
}
