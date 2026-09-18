import type { DailyBriefing } from '../types';

const CONF_COLOR: Record<DailyBriefing['confidence'], string> = {
  HIGH: 'text-regime-on bg-regime-on-dim',
  MEDIUM: 'text-regime-neutral bg-regime-neutral-dim',
  LOW: 'text-regime-off bg-regime-off-dim',
};

function ListBlock({ title, items, tone }: { title: string; items: string[]; tone: 'up' | 'down' | 'neutral' }) {
  const dot = tone === 'up' ? 'bg-regime-off' : tone === 'down' ? 'bg-regime-on' : 'bg-text-tertiary';
  return (
    <div>
      <div className="text-[10px] text-text-tertiary tracking-wide uppercase mb-2">{title}</div>
      <ul className="flex flex-col gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-text-secondary leading-relaxed">
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dot}`} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DailyBriefingPanel({ data }: { data: DailyBriefing }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="font-mono-num text-xs text-text-tertiary">{data.date}</span>
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono-num font-semibold ${CONF_COLOR[data.confidence]}`}>
          AI CONFIDENCE: {data.confidence}
        </span>
      </div>

      <p className="text-sm text-text-primary leading-relaxed">{data.todayEnvironment}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ListBlock title="昨日から変化した項目" items={data.changesFromYesterday} tone="neutral" />
        <ListBlock title="注目すべき経済イベント" items={data.watchEvents} tone="neutral" />
        <ListBlock title="リスク上昇要因" items={data.riskIncreasing} tone="up" />
        <ListBlock title="リスク低下要因" items={data.riskDecreasing} tone="down" />
      </div>

      <div>
        <div className="text-[10px] text-text-tertiary tracking-wide uppercase mb-2">資産クラス別コメント</div>
        <div className="flex flex-col gap-2">
          {data.assetComments.map((c) => (
            <div key={c.asset} className="flex gap-3 bg-base-800 rounded p-2.5">
              <span className="text-xs font-semibold text-text-primary w-16 shrink-0">{c.asset}</span>
              <p className="text-[12px] text-text-secondary leading-relaxed">{c.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] text-text-tertiary tracking-wide uppercase mb-2">今後注意すべきシナリオ</div>
        <ul className="flex flex-col gap-1.5">
          {data.scenariosToWatch.map((s, i) => (
            <li key={i} className="text-[12px] text-text-secondary leading-relaxed">「{s}」というシナリオではリスクが顕在化する可能性があります。</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
