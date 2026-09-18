import { useState } from 'react';
import type { Scenario } from '../types';

const SCENARIO_COLOR: Record<Scenario['key'], string> = {
  BASE: 'var(--color-regime-neutral)',
  BULL: 'var(--color-regime-on)',
  BEAR: 'var(--color-regime-off)',
};

export function ScenarioPanel({ scenarios }: { scenarios: Scenario[] }) {
  const [active, setActive] = useState<Scenario['key']>('BASE');
  const current = scenarios.find((s) => s.key === active)!;
  const color = SCENARIO_COLOR[active];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {scenarios.map((s) => (
          <button
            key={s.key}
            onClick={() => setActive(s.key)}
            className={`flex-1 px-3 py-2 rounded-md text-xs font-semibold font-display transition-all border ${
              active === s.key ? 'border-current' : 'border-base-700 text-text-tertiary hover:text-text-secondary'
            }`}
            style={active === s.key ? { color: SCENARIO_COLOR[s.key], background: 'var(--color-base-900)' } : {}}
          >
            {s.label.split(' — ')[0]}
          </button>
        ))}
      </div>

      <div>
        <h3 className="font-display font-semibold text-sm mb-1" style={{ color }}>{current.label}</h3>
        <p className="text-xs text-text-secondary leading-relaxed mb-4">{current.description}</p>

        <div className="flex flex-col divide-y divide-base-800">
          {current.impacts.map((im) => (
            <div key={im.asset} className="flex gap-4 py-2.5">
              <span className="text-xs font-semibold text-text-primary w-16 shrink-0 pt-0.5">{im.asset}</span>
              <p className="text-[12px] text-text-secondary leading-relaxed">{im.impact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
