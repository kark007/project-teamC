from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # すべてのオリジンを許可
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)

class Message(BaseModel):
    id: int
    sender: str
    content: str
    display_url: str
    link_url: str
    threat_type: str  # "phishing", "malware", "2fa" など
    description: str = ""  # 脅威の説明（任意）

# Three scenarios for demonstration
scenarios = [
    {
        # scenario 1: Steganography-based phishing
        "id": 1,
        "sender": "シロイヌマスラオ",
        "content": "【重要】お荷物をお届けにあがりましたが不在のため持ち帰りました。配送伝票の画像より詳細をご確認ください：",
        "display_url": "https://www.kuronekoyamato.co.jp/ytc/customer/redelivery/",
        "link_url": "http://localhost:3000/static-sites/scenario-stegano/index.html",
        "threat_type": "steganography",
        "description": "配送業者を装い、画像ファイルに偽装したペイロードを実行させるステガノグラフィ攻撃のシミュレーション。"
    },
    {
        # scenario 2: famous-people-attack
        "id": 2,
        "sender": "松〇潤",
        "content": "こんにちは！松〇潤です。最近ドラマ撮影で忙しくて、悩みを打ち明けられる人が居ないから君に相談に乗ってほしいんだ。以下のサイトから連絡くれないかな...？",
        "display_url": "https://secret-talk-room.net/invite/m_jun_0830",
        "link_url": "http://localhost:3000/static-sites/scenario-famous_people/index.html",
        "threat_type": "malware",
        "description": "有名人を装い、Googleアカウントの窃取とアプリに見せかけたマルウェアをインストールさせ、端末内の情報を抜き取るシュミレーション。"
    },
    {
        # scenario 3: 2FA phishing
        "id": 3,
        "sender": "amazon",
        "content": "不正にログインされた可能性があります。ログインしてアカウントを保護してください。",
        "display_url": "https://account.amazon.com/",
        "link_url": "http://localhost:3000/static-sites/scenario-fakesite/index.html",
        "threat_type": "2fa",
        "description": "このメールは2段階認証のフィッシングを目的としています。ユーザーがリンクをクリックすると、認証情報を盗む可能性があります。"
    }
]

@app.get("/messages", response_model=List[Message])
def get_messages():
    return scenarios
