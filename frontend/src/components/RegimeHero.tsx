import type { MarketRegimeState, Regime } from '../types';

const REGIME_CONFIG: Record<Regime, { emoji: string; label: string; color: string; dim: string }> = {
  RISK_ON: { emoji: '🟢', label: 'RISK ON', color: 'var(--color-regime-on)', dim: 'var(--color-regime-on-dim)' },
  NEUTRAL: { emoji: '🟡', label: 'NEUTRAL', color: 'var(--color-regime-neutral)', dim: 'var(--color-regime-neutral-dim)' },
  CAUTION: { emoji: '🟠', label: 'CAUTION', color: 'var(--color-regime-caution)', dim: 'var(--color-regime-caution-dim)' },
  RISK_OFF: { emoji: '🔴', label: 'RISK OFF', color: 'var(--color-regime-off)', dim: 'var(--color-regime-off-dim)' },
};

// 0-100 半円ゲージ。4ゾーンをそのまま色分けして「攻め/守り」を視覚化する。
function GaugeArc({ score, color }: { score: number; color: string }) {
  const size = 260;
  const stroke = 16;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const polarToCartesian = (angleDeg: number) => {
    const a = ((angleDeg - 180) * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const arcPath = (startAngle: number, endAngle: number) => {
    const s = polarToCartesian(startAngle);
    const e = polarToCartesian(endAngle);
    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const zones: [number, number, string][] = [
    [0, 45, 'var(--color-regime-off)'],
    [45, 90, 'var(--color-regime-caution)'],
    [90, 135, 'var(--color-regime-neutral)'],
    [135, 180, 'var(--color-regime-on)'],
  ];

  const needleAngle = (score / 100) * 180;
  const needleTip = polarToCartesian(needleAngle);

  return (
    <svg width={size} height={size / 2 + 30} viewBox={`0 0 ${size} ${size / 2 + 30}`}>
      {zones.map(([s, e, c]) => (
        <path key={s} d={arcPath(s, e)} stroke={c} strokeWidth={stroke} fill="none" strokeLinecap="butt" opacity={0.85} />
      ))}
      <line x1={cx} y1={cy} x2={needleTip.x} y2={needleTip.y} stroke={color} strokeWidth={3} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={6} fill={color} />
      <text x={cx} y={cy - 34} textAnchor="middle" className="font-mono-num" fontSize="40" fontWeight={700} fill="var(--color-text-primary)">
        {score}
      </text>
      <text x={cx} y={cy - 12} textAnchor="middle" fontSize="11" fill="var(--color-text-tertiary)" letterSpacing="1">
        MARKET SCORE / 100
      </text>
    </svg>
  );
}

export function RegimeHero({ data }: { data: MarketRegimeState }) {
  const cfg = REGIME_CONFIG[data.regime];
  return (
    <section
      className="rounded-lg border border-base-700 overflow-hidden relative"
      style={{ background: `linear-gradient(135deg, ${cfg.dim} 0%, var(--color-base-900) 55%)` }}
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 px-6 py-8">
        <GaugeArc score={data.marketScore} color={cfg.color} />
        <div className="flex-1 text-center lg:text-left">
          <div className="text-[11px] tracking-[0.2em] text-text-tertiary font-mono-num uppercase mb-2">
            MARKET REGIME · {data.asOf}
          </div>
          <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
            <span className="text-4xl leading-none">{cfg.emoji}</span>
            <h1 className="font-display font-bold text-4xl md:text-5xl" style={{ color: cfg.color }}>
              {cfg.label}
            </h1>
          </div>
          <p className="text-text-secondary text-base max-w-xl leading-relaxed">{data.summary}</p>
          <p className="text-text-tertiary text-xs mt-4 max-w-xl leading-relaxed">
            ※ このスコアは「今すぐ買うべき」を意味しません。市場環境を理解するための情報整理指標です。
          </p>
        </div>
      </div>
    </section>
  );
}
