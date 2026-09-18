"""
Frankfurter（ECB公表レートベース、APIキー不要・無料）連携サービス。
外部API呼び出しはこのファイルに閉じ込め、失敗時は例外を吸収してNoneを返す。
"""

import httpx
from datetime import datetime, timezone

FRANKFURTER_URL = "https://api.frankfurter.app/latest"


async def fetch_usdjpy() -> dict | None:
    params = {"from": "USD", "to": "JPY"}
    try:
        async with httpx.AsyncClient(timeout=8.0) as client:
            resp = await client.get(FRANKFURTER_URL, params=params)
            resp.raise_for_status()
            data = resp.json()
            rate = data.get("rates", {}).get("JPY")
            if rate is None:
                return None
            return {
                "key": "usdjpy",
                "label": "USD/JPY",
                "value": float(rate),
                "unit": "JPY",
                "change_24h_pct": None,  # Frankfurterは日次確定値のみのためSTEP4時点では前日比は未算出
                "source": "frankfurter",
                "quality": "LIVE",
                "fetched_at": datetime.now(timezone.utc),
                "raw_json": str(data),
            }
    except (httpx.HTTPError, httpx.TimeoutException, ValueError):
        return None
