// Backendへのアクセスはこのファイルに集約する。
// フロントから外部APIへは直接繋がない（設計原則1）。
// 失敗してもUI全体を止めないよう、必ずnullを返して呼び出し側でフォールバックする。
//
// VITE_BACKEND_URL は .env で切り替える:
//   - ローカル開発: http://localhost:8000 (デフォルト)
//   - Render本番:   Renderのバックエンド公開URL（render.yamlでビルド時に自動注入される）

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';

export interface LiveMarketPoint {
  key: string;
  label: string;
  value: number | null;
  unit: string | null;
  change24hPct: number | null;
  source: string;
  quality: 'LIVE' | 'DELAYED' | 'ESTIMATED' | 'UNAVAILABLE';
  updatedAt: string;
}

async function safeFetch<T>(path: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const res = await fetch(`${BACKEND_URL}${path}`, { signal: controller.signal });
    clearTimeout(timeout);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // バックエンド未起動・ネットワーク断（Renderのコールドスタート中含む）など。
    // ここで揉み消してUIはモック/UNAVAILABLE表示にフォールバックする。
    return null;
  }
}

export function fetchBitcoinPrice(): Promise<LiveMarketPoint | null> {
  return safeFetch<LiveMarketPoint>('/api/market/crypto/bitcoin');
}

export function fetchUsdJpy(): Promise<LiveMarketPoint | null> {
  return safeFetch<LiveMarketPoint>('/api/market/forex/usdjpy');
}

export function fetchQuote(key: string): Promise<LiveMarketPoint | null> {
  return safeFetch<LiveMarketPoint>(`/api/market/quote/${key}`);
}
