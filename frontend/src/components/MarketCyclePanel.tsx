import type { CyclePhaseSimilarity } from '../types';

const PHASE_COLOR: Record<string, string> = {
  ACCUMULATION: 'var(--color-regime-neutral)',
  EXPANSION: 'var(--color-regime-on)',
  EUPHORIA: 'var(--color-regime-off)',
  CONTRACTION: 'var(--color-regime-off)',
  RECOVERY: 'var(--color-regime-caution)',
};

export function MarketCyclePanel({ phases }: { phases: CyclePhaseSimilarity[] }) {
  const sorted = [...phases].sort((a, b) => b.similarity - a.similarity);
  return (
    <div className="flex flex-col gap-3">
      <p className="text-xs text-text-tertiary leading-relaxed">
        現在の市場が各サイクル局面にどの程度類似しているかを類似度として表示しています。「今は○○局面である」と断定するものではありません。
      </p>
      {sorted.map((p) => (
        <div key={p.phase} className="flex items-center gap-3">
          <span className="text-xs text-text-secondary w-28 shrink-0">{p.label}</span>
          <div className="flex-1 h-3 bg-base-800 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{ width: `${p.similarity}%`, background: PHASE_COLOR[p.phase] }}
            />
          </div>
          <span className="font-mono-num text-sm text-text-primary w-12 text-right">{p.similarity}%</span>
        </div>
      ))}
    </div>
  );
}
