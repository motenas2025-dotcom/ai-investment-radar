"""
外部APIから取得したデータを正規化して保存するテーブル。
1つのkey（例: "btc_usd"）に対して最新値を1レコード保持するシンプルなキャッシュ。
将来的に時系列を貯める場合は別テーブル(MarketDataHistory等)を追加する。
"""

from sqlalchemy import Column, String, Float, DateTime, Text
from app.db.database import Base


class MarketDataPoint(Base):
    __tablename__ = "market_data_points"

    key = Column(String, primary_key=True)       # 例: "btc_usd"
    label = Column(String, nullable=False)         # 例: "Bitcoin"
    value = Column(Float, nullable=False)
    unit = Column(String, nullable=True)            # 例: "USD"
    change_24h_pct = Column(Float, nullable=True)
    source = Column(String, nullable=False)         # 例: "coingecko"
    quality = Column(String, nullable=False)        # LIVE / DELAYED / ESTIMATED / UNAVAILABLE
    fetched_at = Column(DateTime, nullable=False)
    raw_json = Column(Text, nullable=True)           # デバッグ用に生レスポンスを保持
