// AI INVESTMENT RADAR — 共通型定義
// Backend(FastAPI)のレスポンス契約と一致させる想定。STEP4以降でここをsource of truthにする。

export type DataQuality = 'LIVE' | 'DELAYED' | 'ESTIMATED' | 'UNAVAILABLE';
export type Confidence = 'HIGH' | 'MEDIUM' | 'LOW';
export type Direction = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';
export type Impact = 'LOW' | 'MEDIUM' | 'HIGH';
export type Regime = 'RISK_ON' | 'NEUTRAL' | 'CAUTION' | 'RISK_OFF';

export interface ScoreBlock {
  key: string;
  label: string;
  value: number; // 0-100
  description: string; // このスコアが何を意味するか（高い/低いの解釈）
  quality: DataQuality;
}

export interface MarketRegimeState {
  regime: Regime;
  marketScore: number;
  summary: string;
  scores: ScoreBlock[];
  asOf: string;
}

export type AssetClassKey =
  | 'US_EQUITY' | 'JP_EQUITY' | 'BONDS' | 'GOLD'
  | 'OIL' | 'REAL_ESTATE' | 'CRYPTO' | 'CASH';

export interface AssetRadar {
  key: AssetClassKey;
  label: string;
  score: number;
  momentum: 'Positive' | 'Neutral' | 'Negative';
  valuation: 'Cheap' | 'Fair' | 'Expensive';
  macroSensitivity: 'Low' | 'Medium' | 'High';
  risk: 'Low' | 'Medium' | 'High';
  aiComment: string;
  quality: DataQuality;
}

export interface EconomicIndicator {
  key: string;
  label: string;
  value: string;
  unit?: string;
  change?: string;
  quality: DataQuality;
  updatedAt: string;
}

export interface CyclePhaseSimilarity {
  phase: 'ACCUMULATION' | 'EXPANSION' | 'EUPHORIA' | 'CONTRACTION' | 'RECOVERY';
  label: string;
  similarity: number; // %
}

export interface HistoricalComparisonItem {
  year: string;
  label: string;
  similarityNote: string; // 「〜という類似点がある」形式のみ
  dimensions: { key: string; label: string; similarity: number }[];
}

export interface BubbleRiskComponent {
  key: string;
  label: string;
  value: number;
}

export interface BubbleRiskState {
  score: number;
  status: string;
  components: BubbleRiskComponent[];
  disclaimer: string;
}

export interface ScenarioImpact {
  asset: string;
  impact: string;
}

export interface Scenario {
  key: 'BASE' | 'BULL' | 'BEAR';
  label: string;
  description: string;
  impacts: ScenarioImpact[];
}

export interface DailyBriefing {
  date: string;
  confidence: Confidence;
  todayEnvironment: string;
  changesFromYesterday: string[];
  riskIncreasing: string[];
  riskDecreasing: string[];
  watchEvents: string[];
  assetComments: { asset: string; comment: string }[];
  scenariosToWatch: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  source: string;
  category: string;
  impact: Impact;
  direction: Direction;
  publishedAt: string;
}

export interface ChartSeriesPoint {
  date: string;
  value: number;
}

export interface ChartSeries {
  key: string;
  label: string;
  unit?: string;
  quality: DataQuality;
  points: ChartSeriesPoint[];
}
