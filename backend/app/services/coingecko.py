"""
CoinGecko連携サービス。
無料枠・APIキー不要のシンプルpriceエンドポイントを使用。
外部API呼び出しはこのファイルに閉じ込め、ルーター側は正規化済みの結果だけを扱う。

無料枠のレート制限（目安：10-30 req/分）を踏まえ、
呼び出し側（api/market.py）でキャッシュのTTLを設けて頻度を抑える設計にしている。
"""

import httpx
from datetime import datetime, timezone

COINGECKO_URL = "https://api.coingecko.com/api/v3/simple/price"

# 外部APIが失敗してもアプリ全体を止めないよう、例外は必ずここで吸収して
# 呼び出し元には「取得できたか否か」が分かる形で返す。


async def fetch_bitcoin_price() -> dict | None:
    params = {
        "ids": "bitcoin",
        "vs_currencies": "usd",
        "include_24hr_change": "true",
    }
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.get(COINGECKO_URL, params=params)
            resp.raise_for_status()
            data = resp.json()
            btc = data.get("bitcoin")
            if not btc or "usd" not in btc:
                return None
            return {
                "key": "btc_usd",
                "label": "Bitcoin",
                "value": float(btc["usd"]),
                "unit": "USD",
                "change_24h_pct": float(btc.get("usd_24h_change", 0.0)),
                "source": "coingecko",
                "quality": "LIVE",
                "fetched_at": datetime.now(timezone.utc),
                "raw_json": str(data),
            }
    except (httpx.HTTPError, httpx.TimeoutException, ValueError):
        # ネットワーク断・レート制限・パース失敗など。
        # ここでUNAVAILABLEとして扱い、古いキャッシュがあればそちらを使う判断はAPI層に委ねる。
        return None
