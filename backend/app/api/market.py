"""
Frontendが叩くのはこのルーターのみ。外部APIへは直接繋がず、
必ずこの層でキャッシュ確認 → 必要なら取得 → DB保存 → 正規化レスポンス、の順を通す。

データソースが増えるたびに fetcher 関数（services/配下）だけ増やせば良いよう、
キャッシュ取得ロジックは get_or_fetch() に共通化している。
"""

from datetime import datetime, timedelta, timezone
from typing import Awaitable, Callable, Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.market_data import MarketDataPoint
from app.services.coingecko import fetch_bitcoin_price
from app.services.frankfurter import fetch_usdjpy
from app.services.stooq import fetch_stooq_quote

router = APIRouter()

CACHE_TTL_DEFAULT = timedelta(minutes=3)


def _to_response(row: MarketDataPoint) -> dict:
    return {
        "key": row.key,
        "label": row.label,
        "value": row.value,
        "unit": row.unit,
        "change24hPct": row.change_24h_pct,
        "source": row.source,
        "quality": row.quality,
        "updatedAt": row.fetched_at.isoformat(),
    }


def _unavailable_response(key: str, label: str, unit: Optional[str], source: str) -> dict:
    return {
        "key": key, "label": label, "value": None, "unit": unit,
        "change24hPct": None, "source": source, "quality": "UNAVAILABLE",
        "updatedAt": datetime.now(timezone.utc).isoformat(),
    }


async def get_or_fetch(
    db: Session,
    key: str,
    label: str,
    unit: Optional[str],
    source: str,
    fetcher: Callable[[], Awaitable[Optional[dict]]],
    ttl: timedelta = CACHE_TTL_DEFAULT,
) -> dict:
    cached = db.get(MarketDataPoint, key)

    is_fresh = (
        cached is not None
        and cached.fetched_at.replace(tzinfo=timezone.utc) > datetime.now(timezone.utc) - ttl
    )
    if is_fresh:
        return _to_response(cached)

    fresh = await fetcher()

    if fresh is None:
        # 取得失敗。古いキャッシュがあればDELAYEDとして返す。無ければUNAVAILABLE。
        if cached is not None:
            cached.quality = "DELAYED"
            db.commit()
            return _to_response(cached)
        return _unavailable_response(key, label, unit, source)

    if cached is None:
        cached = MarketDataPoint(key=key)
        db.add(cached)

    cached.label = fresh["label"]
    cached.value = fresh["value"]
    cached.unit = fresh["unit"]
    cached.change_24h_pct = fresh["change_24h_pct"]
    cached.source = fresh["source"]
    cached.quality = fresh["quality"]
    cached.fetched_at = fresh["fetched_at"]
    cached.raw_json = fresh["raw_json"]
    db.commit()

    return _to_response(cached)


@router.get("/crypto/bitcoin")
async def get_bitcoin(db: Session = Depends(get_db)):
    return await get_or_fetch(
        db, key="btc_usd", label="Bitcoin", unit="USD",
        source="coingecko", fetcher=fetch_bitcoin_price,
    )


@router.get("/forex/usdjpy")
async def get_usdjpy(db: Session = Depends(get_db)):
    return await get_or_fetch(
        db, key="usdjpy", label="USD/JPY", unit="JPY",
        source="frankfurter", fetcher=fetch_usdjpy,
        ttl=timedelta(hours=1),  # 為替の日次確定値のため頻繁に叩く必要はない
    )


# stooq経由で取得する銘柄一覧。
# ここに1行追加するだけで /api/market/quote/{key} から取得できるようになる。
# シンボルはstooq.comの表記に準拠（要: 運用開始前に実際のシンボルを再確認）。
STOOQ_SYMBOLS: dict[str, tuple[str, str, Optional[str]]] = {
    "gold": ("xauusd", "金価格", "USD/oz"),
    "oil": ("cl.f", "原油(WTI)", "USD"),
    "vix": ("^vix", "VIX", None),
    "sp500": ("^spx", "S&P500", None),
    "nasdaq": ("^ndq", "NASDAQ", None),
    "nikkei": ("^nkx", "日経平均", None),
}


@router.get("/quote/{key}")
async def get_quote(key: str, db: Session = Depends(get_db)):
    if key not in STOOQ_SYMBOLS:
        return _unavailable_response(key, key, None, "stooq")

    symbol, label, unit = STOOQ_SYMBOLS[key]

    async def fetcher():
        return await fetch_stooq_quote(symbol, label, unit)

    return await get_or_fetch(
        db, key=f"stooq_{key}", label=label, unit=unit,
        source="stooq", fetcher=fetcher,
        ttl=timedelta(minutes=15),
    )
