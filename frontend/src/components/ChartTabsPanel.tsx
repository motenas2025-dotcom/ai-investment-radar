import { useMemo, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { ChartSeries } from '../types';
import { QualityBadge } from './QualityBadge';

const PERIODS = ['1D', '1W', '1M', '3M', '1Y', '5Y', 'MAX'] as const;
type Period = typeof PERIODS[number];

const PERIOD_DAYS: Record<Period, number> = {
  '1D': 1, '1W': 7, '1M': 30, '3M': 60, '1Y': 60, '5Y': 60, 'MAX': 60,
  // モックデータは60日分のみのため、STEP4で実データ接続時に真の期間フィルタへ差し替える
};

export function ChartTabsPanel({ series }: { series: ChartSeries[] }) {
  const [activeKey, setActiveKey] = useState(series[0].key);
  const [period, setPeriod] = useState<Period>('3M');
  const active = series.find((s) => s.key === activeKey)!;

  const data = useMemo(() => {
    const n = PERIOD_DAYS[period];
    return active.points.slice(-n);
  }, [active, period]);

  const first = data[0]?.value ?? 0;
  const last = data[data.length - 1]?.value ?? 0;
  const pct = first ? (((last - first) / first) * 100).toFixed(2) : '0.00';
  const isUp = last >= first;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-1.5">
        {series.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveKey(s.key)}
            className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
              activeKey === s.key
                ? 'bg-base-700 text-text-primary'
                : 'text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono-num text-2xl font-bold text-text-primary">
            {last.toLocaleString()} {active.unit ?? ''}
          </span>
          <span className={`font-mono-num text-sm font-medium ${isUp ? 'text-regime-on' : 'text-regime-off'}`}>
            {isUp ? '+' : ''}{pct}%
          </span>
          <QualityBadge quality={active.quality} />
        </div>
        <div className="flex gap-1">
          {PERIODS.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-2 py-1 rounded text-[10px] font-mono-num transition-colors ${
                period === p ? 'bg-base-700 text-text-primary' : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={isUp ? '#33d691' : '#e6567a'} stopOpacity={0.35} />
                <stop offset="100%" stopColor={isUp ? '#33d691' : '#e6567a'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" hide />
            <YAxis domain={['auto', 'auto']} hide />
            <Tooltip
              contentStyle={{ background: '#10141d', border: '1px solid #1c2231', borderRadius: 6, fontSize: 11 }}
              labelStyle={{ color: '#949eb5' }}
              itemStyle={{ color: '#e9ecf3' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={isUp ? '#33d691' : '#e6567a'}
              strokeWidth={1.75}
              fill="url(#chartFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
