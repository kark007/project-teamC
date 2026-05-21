# Desmishing
SMSターゲティング型フィッシング攻撃──スミッシングにフォーカスした、**セキュリティ教育用体験シミュレーションアプリ**です。</br>

本アプリケーションはスマートフォン画面を模したモックアップをインターフェースとし、受信したSMSメッセージ内の「表示だけ偽装されたURL」をタップすることで、「模擬脅威シナリオ」の体験ページにシームレスに遷移する設計となっています。

## 特徴
- **リアルなUI/UX**: iOSメッセージアプリを細部まで再現し、実用性の高いタイポスクワッティング（表示用偽装URL）を体験。

- **没入感のある演出**: 体験の開始時に、ハッカーのハックターミナルやアラートを彷彿とさせる、緊迫感のあるダーク・レッドアラートデザインが受講者の警戒心を刺激します。

- **セキュアな演習環境**: すべての攻撃プロセスはローカルネットワーク内で完結し、外部に対して実害を及ぼさない安全なサンドボックス形式でシミュレートされます。

- **簡単構築（Dockerマルチコンテナ対応）**: モノレポ構造を採用し、Docker Composeを用いてフロントエンド・バックエンドの一発起動が可能です。

## セットアップ・起動方法
Docker, ローカル環境両対応のため、環境に合わせてセットアップを行ってください。
### 方法1: Dockerで起動（推奨）
リポジトリルートで以下のコマンドを実行するだけで、フロントエンド・バックエンド・静的サイトが自動的にビルドされ、ネットワークリンクされます。</br>
```
# キャッシュをクリアしてビルド・起動
docker compose down -v
docker compose up -d --build
```
### 方法2: ローカルで手動起動
#### バックエンドの起動
Python 3.10以上が必要です。標準の pip を使った起動方法、および uv を使った高速な起動方法のどちらでも実行可能です。
```
cd backend

# 仮想環境の作成と有効化
python -m venv .venv
source .venv/bin/activate  # macOS / Linux の場合
# Windows (Command Prompt) の場合は以下を実行:
# .venv\Scripts\activate.bat
# Windows (PowerShell) の場合は以下を実行:
# .venv\Scripts\Activate.ps1

# FastAPIの起動
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
#### フロントエンドの起動
Node.js v20以上が必要です。標準のパッケージマネージャーである npm を使用して起動します。
```
cd frontend
# 依存パッケージのインストール
npm install
# 開発サーバーの起動
npm run dev
```
## 開発ガイドライン (For Developers)
1. .gitignore について</br>
    本プロジェクトは、メンバーごとに異なる開発・バージョン管理ツールを使用している可能性があるため、以下の「個人の管理ツール」や「環境依存のキャッシュ」は リポジトリにコミットしない ポリシーを徹底しています。
    - mise 関連: .mise.toml（共通リポジトリから除外）
    - Python仮想環境・キャッシュ: .venv/, __pycache__/
    - Nodeパッケージキャッシュ: node_modules/, dist/

    各自、ステージングの前に git status で余分なファイルが登録されていないか確認してください。

2. シナリオ追加の流れ</br>
    新しくフィッシングやマルウェアのシナリオをマージする際は、以下のステップを行ってください。

    1. 静的HTMLの配置: frontend/public/static-sites/ 配下にフォルダ（例: scenario-malware）を作成し、その中に index.html を配置します。

    2. バックエンドデータ追加: backend/main.py 内の scenarios リストに新しいオブジェクトを追加します。その際、link_url に該当のローカルパス（例: [http://localhost:3000/static-sites/scenario-malware/index.html](hxxp://localhost:3000/static-sites/scenario-malware/index.html)）を割り当てます。