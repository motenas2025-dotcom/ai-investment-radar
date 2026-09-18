import type { AssetRadar } from '../types';
import { QualityBadge } from './QualityBadge';

function scoreColor(v: number) {
  if (v >= 70) return 'var(--color-regime-on)';
  if (v >= 55) return 'var(--color-regime-neutral)';
  if (v >= 40) return 'var(--color-regime-caution)';
  return 'var(--color-regime-off)';
}

function Tag({ label, value }: { label: string; value: string }) {
  const tone =
    value === 'Positive' || value === 'Cheap' || value === 'Low' ? 'text-regime-on' :
    value === 'Negative' || value === 'Expensive' || value === 'High' ? 'text-regime-off' :
    'text-text-secondary';
  return (
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-text-tertiary">{label}</span>
      <span className={`font-medium ${tone}`}>{value}</span>
    </div>
  );
}

export function AssetRadarCard({ a }: { a: AssetRadar }) {
  const color = scoreColor(a.score);
  return (
    <div className="bg-base-800 border border-base-700 rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-display font-semibold text-sm text-text-primary">{a.label}</div>
          <div className="text-[10px] text-text-tertiary font-mono-num tracking-wide">{a.key}</div>
        </div>
        <QualityBadge quality={a.quality} />
      </div>

      <div className="flex items-end gap-2">
        <span className="font-mono-num text-3xl font-bold" style={{ color }}>{a.score}</span>
        <span className="text-text-tertiary text-xs mb-1">Environment Score</span>
      </div>
      <div className="w-full h-1.5 bg-base-700 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${a.score}%`, background: color }} />
      </div>

      <div className="flex flex-col gap-1.5 pt-1 border-t border-base-700">
        <Tag label="Momentum" value={a.momentum} />
        <Tag label="Valuation" value={a.valuation} />
        <Tag label="Macro Sensitivity" value={a.macroSensitivity} />
        <Tag label="Risk" value={a.risk} />
      </div>

      <div className="bg-base-900 rounded p-2.5 mt-1">
        <div className="text-[9px] text-text-tertiary tracking-wide mb-1">AI COMMENT</div>
        <p className="text-[11px] text-text-secondary leading-relaxed">{a.aiComment}</p>
      </div>
    </div>
  );
}

export function AssetRadarGrid({ assets }: { assets: AssetRadar[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {assets.map((a) => <AssetRadarCard key={a.key} a={a} />)}
    </div>
  );
}
