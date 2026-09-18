import type { HistoricalComparisonItem } from '../types';

export function HistoricalComparisonPanel({ items }: { items: HistoricalComparisonItem[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => (
        <div key={item.year} className="bg-base-800 border border-base-700 rounded-md p-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-mono-num font-bold text-lg text-text-primary">{item.year}</span>
            <span className="text-xs text-text-tertiary">{item.label}</span>
          </div>
          <p className="text-[12px] text-text-secondary leading-relaxed mb-3">{item.similarityNote}</p>
          <div className="flex flex-wrap gap-2">
            {item.dimensions.map((d) => (
              <div key={d.key} className="flex items-center gap-1.5 bg-base-900 rounded px-2 py-1">
                <span className="text-[10px] text-text-tertiary">{d.label}</span>
                <span className="font-mono-num text-[11px] text-text-primary">{d.similarity}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
