"""
stooq.com連携サービス（APIキー不要・無料のCSVクォート配信）。
1銘柄ずつ関数を増やすのではなく、symbolを渡せば使い回せる汎用fetcherにしている。

レスポンス形式（例）:
Symbol,Date,Time,Open,High,Low,Close,Volume
^SPX,2026-08-25,22:00:00,5820.1,5845.2,5810.0,5842.3,-

終値(Close)が "N/D" の場合は非対応銘柄・休場等のため取得失敗として扱う。

注意: stooqのシンボル体系は変更される場合があるため、
実運用開始時にはhttps://stooq.com/q/ で対象銘柄のシンボルを再確認すること。
"""

import csv
import io
import httpx
from datetime import datetime, timezone

STOOQ_URL = "https://stooq.com/q/l/"


async def fetch_stooq_quote(symbol: str, label: str, unit: str | None) -> dict | None:
    params = {"s": symbol, "f": "sd2t2ohlcv", "h": "", "e": "csv"}
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.get(STOOQ_URL, params=params)
            resp.raise_for_status()
            reader = csv.DictReader(io.StringIO(resp.text))
            row = next(reader, None)
            if row is None or row.get("Close") in (None, "N/D", ""):
                return None
            return {
                "key": symbol,
                "label": label,
                "value": float(row["Close"]),
                "unit": unit,
                "change_24h_pct": None,  # stooqの簡易クォートには前日比が含まれないため、STEP4時点では未算出
                "source": "stooq",
                "quality": "DELAYED",  # stooqの無料フィードは遅延配信のため
                "fetched_at": datetime.now(timezone.utc),
                "raw_json": resp.text,
            }
    except (httpx.HTTPError, httpx.TimeoutException, ValueError, StopIteration):
        return None
