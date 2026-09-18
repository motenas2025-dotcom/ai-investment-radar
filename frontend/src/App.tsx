import { useEffect, useState } from 'react';
import { RegimeHero } from './components/RegimeHero';
import { ScoreGrid } from './components/ScoreGrid';
import { AssetRadarGrid } from './components/AssetRadarGrid';
import { EconomicIndicatorTable } from './components/EconomicIndicatorTable';
import { MarketCyclePanel } from './components/MarketCyclePanel';
import { HistoricalComparisonPanel } from './components/HistoricalComparisonPanel';
import { BubbleRiskPanel } from './components/BubbleRiskPanel';
import { ScenarioPanel } from './components/ScenarioPanel';
import { DailyBriefingPanel } from './components/DailyBriefingPanel';
import { NewsFeed } from './components/NewsFeed';
import { ChartTabsPanel } from './components/ChartTabsPanel';
import { Panel } from './components/Panel';
import {
  assetRadars, bubbleRisk, chartSeries, cyclePhases, dailyBriefing,
  economicIndicators, historicalComparisons, marketRegime, newsItems, scenarios,
} from './mocks/data';
import { fetchBitcoinPrice, fetchUsdJpy, fetchQuote } from './lib/api';
import type { DataQuality } from './types';

// STEP4: Bitcoin・USD/JPYを実データ接続（CoinGecko / Frankfurter経由）。他はSTEP4以降で順次差し替える。
function useLiveMarketPoint(fetcher: () => Promise<{
  value: number | null; change24hPct: number | null; quality: DataQuality; updatedAt: string;
} | null>) {
  const [state, setState] = useState<{
    connected: boolean; value: number | null; changePct: number | null;
    quality: DataQuality; updatedAt: string | null;
  }>({ connected: false, value: null, changePct: null, quality: 'UNAVAILABLE', updatedAt: null });

  useEffect(() => {
    let cancelled = false;
    fetcher().then((data) => {
      if (cancelled) return;
      if (data && data.value !== null) {
        setState({
          connected: true, value: data.value, changePct: data.change24hPct,
          quality: data.quality, updatedAt: data.updatedAt,
        });
      } else {
        setState((s) => ({ ...s, connected: false }));
      }
    });
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return state;
}

function SectionLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 mb-4">
      <span className="font-mono-num text-xs text-text-tertiary">{n}</span>
      <h2 className="font-display font-semibold text-lg text-text-primary">{label}</h2>
      <div className="flex-1 h-px bg-base-700 ml-2" />
    </div>
  );
}

// stooq経由（/api/market/quote/{key}）と経済指標テーブルのkeyの対応表
const STOOQ_INDICATOR_KEYS: Record<string, string> = {
  gold: 'gold', oil: 'oil', vix: 'vix', sp500: 'sp500', nasdaq: 'nasdaq', nikkei: 'nikkei',
};

function App() {
  const liveBtc = useLiveMarketPoint(fetchBitcoinPrice);
  const liveUsdJpy = useLiveMarketPoint(fetchUsdJpy);
  const liveGold = useLiveMarketPoint(() => fetchQuote('gold'));
  const liveOil = useLiveMarketPoint(() => fetchQuote('oil'));
  const liveVix = useLiveMarketPoint(() => fetchQuote('vix'));
  const liveSp500 = useLiveMarketPoint(() => fetchQuote('sp500'));
  const liveNasdaq = useLiveMarketPoint(() => fetchQuote('nasdaq'));
  const liveNikkei = useLiveMarketPoint(() => fetchQuote('nikkei'));

  const liveByIndicatorKey: Record<string, ReturnType<typeof useLiveMarketPoint>> = {
    btc: liveBtc, usdjpy: liveUsdJpy,
    [STOOQ_INDICATOR_KEYS.gold]: liveGold,
    [STOOQ_INDICATOR_KEYS.oil]: liveOil,
    vix: liveVix,
    [STOOQ_INDICATOR_KEYS.sp500]: liveSp500,
    [STOOQ_INDICATOR_KEYS.nasdaq]: liveNasdaq,
    [STOOQ_INDICATOR_KEYS.nikkei]: liveNikkei,
  };

  const backendConnected = Object.values(liveByIndicatorKey).some((l) => l.connected);

  const overlayLive = (key: string, live: ReturnType<typeof useLiveMarketPoint>) =>
    (it: (typeof economicIndicators)[number]) =>
      it.key === key && live.connected && live.value !== null
        ? {
            ...it,
            value: live.value.toLocaleString(undefined, { maximumFractionDigits: key === 'usdjpy' ? 2 : 0 }),
            change: live.changePct !== null ? `${live.changePct >= 0 ? '+' : ''}${live.changePct.toFixed(2)}%` : it.change,
            quality: live.quality,
            updatedAt: live.updatedAt ? new Date(live.updatedAt).toISOString().slice(0, 16).replace('T', ' ') : it.updatedAt,
          }
        : it;

  const liveEconomicIndicators = Object.entries(liveByIndicatorKey).reduce(
    (acc, [key, live]) => acc.map(overlayLive(key, live)),
    economicIndicators
  );

  return (
    <div className="min-h-screen bg-base-950">
      <header className="sticky top-0 z-10 backdrop-blur bg-base-950/85 border-b border-base-800">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-gradient-to-br from-regime-on to-regime-off flex items-center justify-center font-display font-bold text-base-950 text-xs">
              AI
            </div>
            <span className="font-display font-semibold text-sm tracking-wide text-text-primary">
              INVESTMENT RADAR
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 text-[10px] font-mono-num ${backendConnected ? 'text-regime-on' : 'text-text-tertiary'}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${backendConnected ? 'bg-regime-on' : 'bg-text-tertiary'}`} />
              BACKEND {backendConnected ? 'LIVE' : 'MOCK'}
            </span>
            <span className="text-[10px] text-text-tertiary font-mono-num hidden sm:block">
              市場環境の情報整理ツール · 投資助言ではありません
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-10">

        <div>
          <SectionLabel n="01" label="Market Regime" />
          <RegimeHero data={marketRegime} />
          <div className="mt-4">
            <ScoreGrid scores={marketRegime.scores} />
          </div>
        </div>

        <div>
          <SectionLabel n="02" label="資産クラス別レーダー" />
          <AssetRadarGrid assets={assetRadars} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Panel eyebrow="Section 03" title="Market Cycle Analysis" className="xl:col-span-1">
            <MarketCyclePanel phases={cyclePhases} />
          </Panel>
          <Panel eyebrow="Section 04" title="Bubble Risk" className="xl:col-span-1">
            <BubbleRiskPanel data={bubbleRisk} />
          </Panel>
          <Panel eyebrow="Section 05" title="AI Daily Briefing" className="xl:col-span-1">
            <DailyBriefingPanel data={dailyBriefing} />
          </Panel>
        </div>

        <div>
          <SectionLabel n="06" label="Historical Comparison" />
          <p className="text-xs text-text-tertiary mb-4 -mt-2">
            「現在は○年と同じ」という断定はしません。指標ごとの類似度を並べて確認できます。
          </p>
          <HistoricalComparisonPanel items={historicalComparisons} />
        </div>

        <div>
          <SectionLabel n="07" label="Scenario Analysis" />
          <Panel>
            <ScenarioPanel scenarios={scenarios} />
          </Panel>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <Panel eyebrow="Section 08" title="Market Charts" className="xl:col-span-2">
            <ChartTabsPanel series={chartSeries} />
          </Panel>
          <Panel eyebrow="Section 09" title="News Analysis" className="xl:col-span-1">
            <NewsFeed items={newsItems} />
          </Panel>
        </div>

        <div>
          <SectionLabel n="10" label="経済指標" />
          <Panel>
            <EconomicIndicatorTable items={liveEconomicIndicators} />
          </Panel>
        </div>

        <footer className="text-center text-[11px] text-text-tertiary py-8 border-t border-base-800">
          本アプリは市場環境を分析・可視化する情報整理ツールであり、投資助言・売買推奨を行うものではありません。
          <br />投資判断は必ずご自身の責任で行ってください。
        </footer>
      </main>
    </div>
  );
}

export default App;
