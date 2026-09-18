import type {
  AssetRadar, BubbleRiskState, ChartSeries, CyclePhaseSimilarity,
  DailyBriefing, EconomicIndicator, HistoricalComparisonItem,
  MarketRegimeState, NewsItem, Scenario,
} from '../types';

export const marketRegime: MarketRegimeState = {
  regime: 'CAUTION',
  marketScore: 63,
  summary: '景気は底堅い一方、バリュエーションと金利環境には注意が必要な局面が示唆されています。',
  asOf: '2026-08-25 07:00 JST',
  scores: [
    { key: 'economic', label: 'Economic Score', value: 71, quality: 'DELAYED',
      description: '雇用・生産などの実体経済指標の強さ。高いほど景気拡大局面を示唆。' },
    { key: 'liquidity', label: 'Liquidity Score', value: 58, quality: 'ESTIMATED',
      description: '市場に供給されている資金の量。高いほど資産価格を押し上げやすい環境。' },
    { key: 'inflation', label: 'Inflation Score', value: 47, quality: 'DELAYED',
      description: '物価上昇圧力の強さを逆転表示。低いほどインフレ懸念が強いことを示す。' },
    { key: 'rate', label: 'Interest Rate Score', value: 44, quality: 'LIVE',
      description: '金利水準・方向性。低いほど株式などリスク資産に逆風となりやすい環境。' },
    { key: 'valuation', label: 'Valuation Score', value: 39, quality: 'DELAYED',
      description: '資産価格の割高・割安度を逆転表示。低いほど歴史的に割高な水準を示す。' },
    { key: 'credit', label: 'Credit Risk Score', value: 68, quality: 'ESTIMATED',
      description: '信用市場の健全性。高いほど社債スプレッド等が落ち着いていることを示す。' },
    { key: 'momentum', label: 'Market Momentum Score', value: 74, quality: 'LIVE',
      description: '直近の値動きの勢い。高いほど上昇トレンドが継続していることを示す。' },
  ],
};

export const assetRadars: AssetRadar[] = [
  { key: 'US_EQUITY', label: '米国株', score: 68, momentum: 'Positive', valuation: 'Expensive',
    macroSensitivity: 'Medium', risk: 'Medium', quality: 'DELAYED',
    aiComment: '景気・企業業績は比較的良好だが、バリュエーションには注意が必要と示唆されます。' },
  { key: 'JP_EQUITY', label: '日本株', score: 61, momentum: 'Positive', valuation: 'Fair',
    macroSensitivity: 'Medium', risk: 'Medium', quality: 'DELAYED',
    aiComment: '円安と企業改革期待が支えとなっている一方、米国景気減速時の輸出敏感度に留意点があります。' },
  { key: 'BONDS', label: '債券', score: 52, momentum: 'Neutral', valuation: 'Fair',
    macroSensitivity: 'High', risk: 'Medium', quality: 'LIVE',
    aiComment: '金利のピークアウト期待はあるものの、インフレ再燃リスクが上値を抑える要因として挙げられます。' },
  { key: 'GOLD', label: '金', score: 65, momentum: 'Positive', valuation: 'Expensive',
    macroSensitivity: 'Medium', risk: 'Low', quality: 'DELAYED',
    aiComment: '実質金利低下観測と地政学リスクが下支えとして働いていると考えられます。' },
  { key: 'OIL', label: '原油', score: 48, momentum: 'Negative', valuation: 'Fair',
    macroSensitivity: 'High', risk: 'High', quality: 'ESTIMATED',
    aiComment: '需要鈍化懸念と供給調整のせめぎ合いから方向感の乏しい展開が示唆されます。' },
  { key: 'REAL_ESTATE', label: '不動産', score: 44, momentum: 'Neutral', valuation: 'Expensive',
    macroSensitivity: 'High', risk: 'Medium', quality: 'ESTIMATED',
    aiComment: '金利水準の高止まりが調達コストに影響しやすい環境と考えられます。' },
  { key: 'CRYPTO', label: '暗号資産', score: 57, momentum: 'Positive', valuation: 'Expensive',
    macroSensitivity: 'High', risk: 'High', quality: 'LIVE',
    aiComment: '流動性環境の改善期待がある一方、ボラティリティの高さは変わらない点に留意が必要です。' },
  { key: 'CASH', label: '現金', score: 55, momentum: 'Neutral', valuation: 'Fair',
    macroSensitivity: 'Low', risk: 'Low', quality: 'LIVE',
    aiComment: '相対的な金利収入は得られるが、インフレ調整後の実質リターンは限定的である点が指摘できます。' },
];

export const economicIndicators: EconomicIndicator[] = [
  { key: 'us_rate', label: '米国政策金利', value: '4.25–4.50', unit: '%', change: '横ばい', quality: 'DELAYED', updatedAt: '2026-08-20' },
  { key: 'us_10y', label: '米国10年国債利回り', value: '4.18', unit: '%', change: '+0.03', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'jp_rate', label: '日本政策金利', value: '0.50', unit: '%', change: '横ばい', quality: 'DELAYED', updatedAt: '2026-08-15' },
  { key: 'us_cpi', label: '米国CPI（前年比）', value: '2.9', unit: '%', change: '-0.1', quality: 'DELAYED', updatedAt: '2026-08-12' },
  { key: 'jp_cpi', label: '日本CPI（前年比）', value: '2.6', unit: '%', change: '+0.1', quality: 'DELAYED', updatedAt: '2026-08-08' },
  { key: 'us_unemployment', label: '米国失業率', value: '4.2', unit: '%', change: '+0.1', quality: 'DELAYED', updatedAt: '2026-08-01' },
  { key: 'jp_unemployment', label: '日本失業率', value: '2.4', unit: '%', change: '横ばい', quality: 'DELAYED', updatedAt: '2026-07-30' },
  { key: 'gdp', label: '米国GDP成長率（前期比年率）', value: '2.1', unit: '%', change: '-0.3', quality: 'ESTIMATED', updatedAt: '2026-07-25' },
  { key: 'vix', label: 'VIX', value: '16.8', change: '-0.4', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'usdjpy', label: 'ドル円', value: '148.32', change: '+0.21', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'sp500', label: 'S&P500', value: '5,842', change: '+0.6%', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'nasdaq', label: 'NASDAQ', value: '18,930', change: '+0.9%', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'nikkei', label: '日経平均', value: '39,210', change: '+0.3%', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'topix', label: 'TOPIX', value: '2,745', change: '+0.2%', quality: 'LIVE', updatedAt: '2026-08-25' },
  { key: 'gold', label: '金価格', value: '2,486', unit: 'USD/oz', change: '+0.4%', quality: 'DELAYED', updatedAt: '2026-08-24' },
  { key: 'oil', label: '原油価格（WTI）', value: '76.2', unit: 'USD', change: '-1.1%', quality: 'DELAYED', updatedAt: '2026-08-24' },
  { key: 'btc', label: 'Bitcoin', value: '68,420', unit: 'USD', change: '+2.3%', quality: 'LIVE', updatedAt: '2026-08-25' },
];

export const cyclePhases: CyclePhaseSimilarity[] = [
  { phase: 'EXPANSION', label: 'Expansion（拡大）', similarity: 42 },
  { phase: 'RECOVERY', label: 'Recovery（回復）', similarity: 28 },
  { phase: 'EUPHORIA', label: 'Euphoria（過熱）', similarity: 18 },
  { phase: 'CONTRACTION', label: 'Contraction（収縮）', similarity: 12 },
];

export const historicalComparisons: HistoricalComparisonItem[] = [
  {
    year: '2008', label: 'グローバル金融危機',
    similarityNote: '現在と2008年には信用スプレッドの水準という点で一部類似が見られますが、当時と比べ金融機関の資本水準は大きく異なります。',
    dimensions: [
      { key: 'credit', label: '信用環境', similarity: 24 },
      { key: 'rate', label: '金利環境', similarity: 31 },
      { key: 'valuation', label: 'バリュエーション', similarity: 18 },
    ],
  },
  {
    year: '2000', label: 'ドットコムバブル崩壊',
    similarityNote: '現在と2000年にはグロース株の一部でバリュエーションの拡大という共通点がある一方、企業収益の裏付けには相違が見られます。',
    dimensions: [
      { key: 'credit', label: '信用環境', similarity: 15 },
      { key: 'rate', label: '金利環境', similarity: 22 },
      { key: 'valuation', label: 'バリュエーション', similarity: 46 },
    ],
  },
  {
    year: '2020', label: 'コロナショック後の急回復',
    similarityNote: '現在と2020年後半には緩和的な流動性環境という点で類似が見られますが、当時ほどの急激な財政拡張は見られません。',
    dimensions: [
      { key: 'credit', label: '信用環境', similarity: 33 },
      { key: 'rate', label: '金利環境', similarity: 27 },
      { key: 'valuation', label: 'バリュエーション', similarity: 38 },
    ],
  },
  {
    year: '2022', label: 'インフレ・急速利上げ局面',
    similarityNote: '現在と2022年にはインフレ動向への市場の警戒感という点で共通点がありますが、利上げペースの方向性は異なります。',
    dimensions: [
      { key: 'credit', label: '信用環境', similarity: 29 },
      { key: 'rate', label: '金利環境', similarity: 41 },
      { key: 'valuation', label: 'バリュエーション', similarity: 33 },
    ],
  },
  {
    year: '1987', label: 'ブラックマンデー前後',
    similarityNote: '現在と1987年には株式市場の連続上昇という点で表面的な類似がありますが、当時のプログラム売買主導の下落構造とは市場構造が異なります。',
    dimensions: [
      { key: 'credit', label: '信用環境', similarity: 11 },
      { key: 'rate', label: '金利環境', similarity: 19 },
      { key: 'valuation', label: 'バリュエーション', similarity: 28 },
    ],
  },
];

export const bubbleRisk: BubbleRiskState = {
  score: 62,
  status: '過熱警戒',
  disclaimer: '高いバブルリスクスコアは、価格の下落を予測するものではありません。過熱局面が長期化し、価格上昇と高リスクが同時に継続することは歴史的にも珍しくありません。',
  components: [
    { key: 'valuation', label: 'Asset Valuation', value: 71 },
    { key: 'credit', label: 'Credit Expansion', value: 54 },
    { key: 'leverage', label: 'Leverage', value: 49 },
    { key: 'momentum', label: 'Market Momentum', value: 74 },
    { key: 'speculation', label: 'Speculation', value: 63 },
    { key: 'retail', label: 'Retail Participation', value: 58 },
    { key: 'liquidity', label: 'Liquidity', value: 66 },
    { key: 'concentration', label: 'Concentration Risk', value: 69 },
  ],
};

export const scenarios: Scenario[] = [
  {
    key: 'BASE', label: 'BASE CASE — 現状継続',
    description: '現在の金利水準・インフレトレンド・景気ペースが大きく変わらず継続した場合のシナリオです。',
    impacts: [
      { asset: '株', impact: '緩やかな上昇基調が継続する可能性が示唆されます。ただしセクター間のばらつきが拡大しやすいと考えられます。' },
      { asset: '債券', impact: 'レンジ内での推移が想定され、利回りの急変動リスクは相対的に低いと考えられます。' },
      { asset: '金', impact: '実質金利の安定を背景に、方向感の乏しい底堅い展開が想定されます。' },
      { asset: '原油', impact: '需給バランスに大きな変化がなければ、レンジ相場が継続しやすいと考えられます。' },
      { asset: '不動産', impact: '金利の高止まりが調達コスト面での重石として作用し続ける可能性があります。' },
      { asset: '為替', impact: '日米金利差を軸にしたレンジ推移が続く可能性が示唆されます。' },
      { asset: '暗号資産', impact: '流動性環境に沿った推移となりやすいが、独自のボラティリティは残ると考えられます。' },
    ],
  },
  {
    key: 'BULL', label: 'BULL CASE — 環境改善',
    description: '景気・企業業績・流動性がともに改善方向に振れた場合のシナリオです。',
    impacts: [
      { asset: '株', impact: '業績相場への移行とともに、バリュエーションの一段の拡大が起きる可能性が示唆されます。' },
      { asset: '債券', impact: '相対的に資金がリスク資産へシフトし、価格には上値の重さが出やすいと考えられます。' },
      { asset: '金', impact: 'リスク選好の高まりにより、資金流入ペースが鈍化する可能性があります。' },
      { asset: '原油', impact: '需要拡大観測から上昇圧力がかかりやすいと考えられます。' },
      { asset: '不動産', impact: '金利低下・景気拡大が追い風となり、資金流入が回復しやすいと考えられます。' },
      { asset: '為替', impact: 'リスク選好通貨への資金シフトが起きやすい局面と考えられます。' },
      { asset: '暗号資産', impact: '流動性拡大の恩恵を受けやすい資産クラスとして資金流入が加速する可能性があります。' },
    ],
  },
  {
    key: 'BEAR', label: 'BEAR CASE — 景気後退・信用収縮',
    description: '景気後退やインフレ再燃、信用収縮などが顕在化した場合のシナリオです。',
    impacts: [
      { asset: '株', impact: 'バリュエーション調整と業績下方修正が重なり、下落圧力が強まるリスクが示唆されます。' },
      { asset: '債券', impact: '質への逃避により国債への資金流入が起きやすいと考えられます。' },
      { asset: '金', impact: '不確実性の高まりを背景に、資金の逃避先として選好されやすいと考えられます。' },
      { asset: '原油', impact: '需要減少懸念から下落圧力がかかりやすいと考えられます。' },
      { asset: '不動産', impact: '信用収縮の影響を受けやすく、取引の停滞が起きるリスクがあります。' },
      { asset: '為替', impact: '安全資産とされる通貨への資金シフトが起きやすい局面と考えられます。' },
      { asset: '暗号資産', impact: 'リスク資産としての性質から、他のリスク資産以上に大きな調整が起きるリスクが指摘できます。' },
    ],
  },
];

export const dailyBriefing: DailyBriefing = {
  date: '2026-08-25',
  confidence: 'MEDIUM',
  todayEnvironment: '主要指標は総じて堅調に推移しており、市場のモメンタムは引き続き強い状態にあると示唆されます。一方でバリュエーション面の警戒感は根強く残っています。',
  changesFromYesterday: [
    '米10年国債利回りがわずかに上昇',
    'VIXが低下し、市場の警戒感がやや後退',
    'ドル円が円安方向にわずかに推移',
  ],
  riskIncreasing: [
    'グロース株のバリュエーション拡大',
    '一部セクターへの資金集中度の上昇',
  ],
  riskDecreasing: [
    '短期的なボラティリティ指標の低下',
    '信用スプレッドの落ち着き',
  ],
  watchEvents: [
    '来週の米雇用統計発表',
    '日銀の金融政策会合',
    '主要テック企業の決算発表',
  ],
  assetComments: [
    { asset: '米国株', comment: 'モメンタムは良好だが、押し目待ちの資金も相応にあると考えられます。' },
    { asset: '債券', comment: '金利の方向感がはっきりするまでレンジ推移が続く可能性があります。' },
    { asset: '金', comment: '地政学リスクへのヘッジ需要が下支えとなっていると考えられます。' },
  ],
  scenariosToWatch: [
    'インフレ指標の予想外の上振れ',
    '主要中央銀行のタカ派的な発言',
    '地政学リスクの急激な悪化',
  ],
};

export const newsItems: NewsItem[] = [
  { id: '1', title: '米雇用統計、市場予想を上回る結果に', source: 'Reuters', category: 'Employment', impact: 'HIGH', direction: 'POSITIVE', publishedAt: '2026-08-25 06:30' },
  { id: '2', title: '日銀、金融政策の据え置きを示唆', source: 'Nikkei', category: 'Interest Rate', impact: 'MEDIUM', direction: 'NEUTRAL', publishedAt: '2026-08-25 05:10' },
  { id: '3', title: '主要テック企業、AI関連投資をさらに拡大へ', source: 'Bloomberg', category: 'AI', impact: 'MEDIUM', direction: 'POSITIVE', publishedAt: '2026-08-24 22:40' },
  { id: '4', title: '中東情勢の緊迫化、原油相場に影響', source: 'AP', category: 'Geopolitics', impact: 'HIGH', direction: 'NEGATIVE', publishedAt: '2026-08-24 20:15' },
  { id: '5', title: '中国、追加の景気刺激策を検討と報道', source: 'Reuters', category: 'China', impact: 'MEDIUM', direction: 'POSITIVE', publishedAt: '2026-08-24 18:05' },
  { id: '6', title: 'エネルギー価格の上昇、インフレ再燃への警戒', source: 'WSJ', category: 'Inflation', impact: 'MEDIUM', direction: 'NEGATIVE', publishedAt: '2026-08-24 16:50' },
];

function genSeries(base: number, vol: number, n = 60): { date: string; value: number }[] {
  const pts = [];
  let v = base;
  const today = new Date('2026-08-25');
  for (let i = n; i >= 0; i--) {
    v += (Math.sin(i / 7) * vol * 0.3) + (Math.random() - 0.5) * vol;
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    pts.push({ date: d.toISOString().slice(0, 10), value: Math.round(v * 100) / 100 });
  }
  return pts;
}

export const chartSeries: ChartSeries[] = [
  { key: 'sp500', label: 'S&P500', quality: 'LIVE', points: genSeries(5700, 30) },
  { key: 'nasdaq', label: 'NASDAQ', quality: 'LIVE', points: genSeries(18500, 120) },
  { key: 'nikkei', label: '日経平均', quality: 'LIVE', points: genSeries(38500, 250) },
  { key: 'topix', label: 'TOPIX', quality: 'LIVE', points: genSeries(2700, 15) },
  { key: 'gold', label: '金', unit: 'USD/oz', quality: 'DELAYED', points: genSeries(2450, 15) },
  { key: 'oil', label: '原油(WTI)', unit: 'USD', quality: 'DELAYED', points: genSeries(77, 1.5) },
  { key: 'btc', label: 'Bitcoin', unit: 'USD', quality: 'LIVE', points: genSeries(66000, 1500) },
  { key: 'usdjpy', label: 'USD/JPY', quality: 'LIVE', points: genSeries(147.5, 0.6) },
  { key: 'us10y', label: '米10年債利回り', unit: '%', quality: 'LIVE', points: genSeries(4.15, 0.06) },
];
