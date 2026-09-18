# AI INVESTMENT RADAR

個人投資家向けの「AI投資環境分析ダッシュボード」。
「今、攻める局面か、守る局面か」を経済・金融データから多角的に分析し、
投資判断のための情報を整理するツール。**投資助言・売買推奨は行わない。**

## 現在の進捗（STEP1〜3 完了）

- ✅ STEP1: プロジェクト構成（frontend / backend）
- ✅ STEP2: Dashboard UI一式
- ✅ STEP3: モックデータで全画面完成
- ⬜ STEP4: 外部APIの接続（データ取得サービス）
- ⬜ STEP5: Database導入
- ⬜ STEP6: Rule Based Scoring
- ⬜ STEP7: AI Analysis
- ⬜ STEP8: Historical Comparison（実データ版）
- ⬜ STEP9: News Analysis（実データ版）
- ⬜ STEP10: Backtest

## セットアップ

### Frontend
```bash
cd frontend
npm install
npm run dev
```
`http://localhost:5173` で表示される。現在は `src/mocks/data.ts` のモックデータのみで動作。

### Backend（STEP4以降で本格運用）
```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # 各APIキーを記入
uvicorn app.main:app --reload --port 8000
```

## ディレクトリ構成

```
ai-investment-radar/
├── frontend/           React + Vite + TS + Tailwind
│   └── src/
│       ├── components/  UIコンポーネント
│       ├── types/       型定義（Backendレスポンスと契約を揃える）
│       └── mocks/       STEP1-3用モックデータ
└── backend/             FastAPI
    └── app/
        ├── api/          ルーター（STEP4〜）
        ├── services/      外部API取得・正規化
        ├── scoring/       Rule Based Scoring（AIと分離）
        ├── ai/            LLM分析
        ├── models/        SQLAlchemyモデル
        └── db/
```

## 設計原則（変更しない）

1. **Frontendから外部APIを直接叩かない。** 必ず `External API → FastAPI → 正規化 → DB → Frontend` の経路を通す。
2. **AIに数値スコアを決めさせない。** `Raw Data → Rule Based Score → AI Interpretation` の順序を守る。
3. **すべてのデータにData Quality（LIVE/DELAYED/ESTIMATED/UNAVAILABLE）を付与する。** 取得失敗を推測で埋めない。
4. **AI分析は断定表現を使わない。** 「〜が示唆される」「過去の類似局面では〜」という表現に統一。
5. **1つのデータ取得失敗でUI全体を止めない。**

## Renderへのデプロイ（実データ付きの公開版）

リポジトリ直下の `render.yaml` を使い、Renderのダッシュボードから「New → Blueprint」でこのリポジトリを指定すると、backend（FastAPI）とfrontend（静的サイト）の2サービスが自動生成される。

### 前提
- GitHubリポジトリにこのプロジェクトをpush済みであること（Renderはgit連携必須）

### 手順
1. GitHubにリポジトリを作成し、このプロジェクト一式をpush
2. [Render](https://dashboard.render.com) にログイン → 「New +」→「Blueprint」
3. 対象のGitHubリポジトリを選択 → `render.yaml` が自動検出される → 「Apply」
4. backend・frontend両方のビルドが終わるまで数分待つ
5. frontendサービスに割り当てられたURL（例: `https://ai-investment-radar-frontend.onrender.com`）を開く

### 無料プランの注意点
- backendは15分アクセスがないとスリープし、次のアクセス時に30〜60秒程度の起動待ちが発生する
- 起動待ち中はダッシュボードの各項目が「BACKEND MOCK」表示のままになるが、しばらく待って再読み込みすれば「LIVE」に切り替わる
