import type { BubbleRiskState } from '../types';

function riskColor(v: number) {
  if (v >= 70) return 'var(--color-regime-off)';
  if (v >= 50) return 'var(--color-regime-caution)';
  if (v >= 30) return 'var(--color-regime-neutral)';
  return 'var(--color-regime-on)';
}

export function BubbleRiskPanel({ data }: { data: BubbleRiskState }) {
  const color = riskColor(data.score);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-end gap-1">
          <span className="font-mono-num text-4xl font-bold" style={{ color }}>{data.score}</span>
          <span className="text-text-tertiary text-sm mb-1">/ 100</span>
        </div>
        <span
          className="px-2.5 py-1 rounded text-xs font-semibold"
          style={{ color, background: 'var(--color-base-900)' }}
        >
          {data.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {data.components.map((c) => (
          <div key={c.key} className="flex items-center gap-2">
            <span className="text-[11px] text-text-tertiary flex-1 truncate">{c.label}</span>
            <div className="w-16 h-1.5 bg-base-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${c.value}%`, background: riskColor(c.value) }} />
            </div>
            <span className="font-mono-num text-[11px] text-text-secondary w-6 text-right">{c.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-base-900 border border-base-700 rounded p-3">
        <p className="text-[11px] text-text-tertiary leading-relaxed">{data.disclaimer}</p>
      </div>
    </div>
  );
}
