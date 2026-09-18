import type { EconomicIndicator } from '../types';
import { QualityBadge } from './QualityBadge';

export function EconomicIndicatorTable({ items }: { items: EconomicIndicator[] }) {
  return (
    <div className="overflow-x-auto -mx-5">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[10px] text-text-tertiary tracking-wide uppercase border-b border-base-700">
            <th className="px-5 py-2 font-medium">指標</th>
            <th className="px-3 py-2 font-medium text-right">値</th>
            <th className="px-3 py-2 font-medium text-right">前回比</th>
            <th className="px-3 py-2 font-medium">更新</th>
            <th className="px-5 py-2 font-medium">品質</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it) => (
            <tr key={it.key} className="border-b border-base-800 hover:bg-base-800/50 transition-colors">
              <td className="px-5 py-2.5 text-sm text-text-primary">{it.label}</td>
              <td className="px-3 py-2.5 text-sm font-mono-num text-right text-text-primary">
                {it.value}{it.unit ? ` ${it.unit}` : ''}
              </td>
              <td className={`px-3 py-2.5 text-xs font-mono-num text-right ${
                it.change?.startsWith('+') ? 'text-regime-on' :
                it.change?.startsWith('-') ? 'text-regime-off' : 'text-text-tertiary'
              }`}>
                {it.change ?? '—'}
              </td>
              <td className="px-3 py-2.5 text-[11px] text-text-tertiary font-mono-num">{it.updatedAt}</td>
              <td className="px-5 py-2.5"><QualityBadge quality={it.quality} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
