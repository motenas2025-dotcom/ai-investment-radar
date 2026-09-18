import type { NewsItem } from '../types';

const IMPACT_COLOR: Record<NewsItem['impact'], string> = {
  LOW: 'text-text-tertiary bg-base-700',
  MEDIUM: 'text-regime-neutral bg-regime-neutral-dim',
  HIGH: 'text-regime-off bg-regime-off-dim',
};

const DIRECTION_ICON: Record<NewsItem['direction'], string> = {
  POSITIVE: '▲',
  NEUTRAL: '■',
  NEGATIVE: '▼',
};
const DIRECTION_COLOR: Record<NewsItem['direction'], string> = {
  POSITIVE: 'text-regime-on',
  NEUTRAL: 'text-text-tertiary',
  NEGATIVE: 'text-regime-off',
};

export function NewsFeed({ items }: { items: NewsItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-base-800">
      {items.map((n) => (
        <div key={n.id} className="py-3 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[10px]">
            <span className="px-1.5 py-0.5 rounded bg-base-700 text-text-tertiary font-medium">{n.category}</span>
            <span className={`px-1.5 py-0.5 rounded font-mono-num ${IMPACT_COLOR[n.impact]}`}>{n.impact}</span>
            <span className={`font-mono-num ${DIRECTION_COLOR[n.direction]}`}>
              {DIRECTION_ICON[n.direction]} {n.direction}
            </span>
          </div>
          <p className="text-[13px] text-text-primary leading-snug">{n.title}</p>
          <div className="text-[10px] text-text-tertiary font-mono-num">{n.source} · {n.publishedAt}</div>
        </div>
      ))}
    </div>
  );
}
