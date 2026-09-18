"""
AI INVESTMENT RADAR — Backend entrypoint

ローカル起動: uvicorn app.main:app --reload --port 8000
Render本番起動: uvicorn app.main:app --host 0.0.0.0 --port $PORT
（render.yamlのstartCommandで指定済み）
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models import market_data  # noqa: F401  テーブル登録のためのimport
from app.api.market import router as market_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Investment Radar API",
    description="市場環境分析ダッシュボードのバックエンドAPI（情報整理ツール。投資助言は行わない）",
    version="0.1.0",
)

# ALLOWED_ORIGIN はRender本番ではフロントエンドの公開URLに設定される（render.yaml参照）。
# ローカル開発用にVite/vite previewのデフォルトポートも許可しておく。
allowed_origin = os.getenv("ALLOWED_ORIGIN")
allow_origins = [allowed_origin] if allowed_origin else [
    "http://localhost:5173", "http://localhost:4173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


app.include_router(market_router, prefix="/api/market", tags=["market"])

# STEP4で今後追加予定:
# app.include_router(assets_router, prefix="/api/assets")
# app.include_router(economic_router, prefix="/api/economic")
# app.include_router(news_router, prefix="/api/news")
