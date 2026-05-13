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
        "sender": "ヤマト運輸",
        "content": "【重要】お荷物をお届けにあがりましたが不在のため持ち帰りました。配送伝票の画像より詳細をご確認ください：",
        "display_url": "https://www.kuronekoyamato.co.jp/ytc/customer/redelivery/",
        "link_url": "http://localhost:3000/static-sites/scenario-stegano/index.html",
        "threat_type": "steganography",
        "description": "配送業者を装い、画像ファイルに偽装したペイロードを実行させるステガノグラフィ攻撃のシミュレーション。"
    },
    {
        # scenario 2: Malware distribution
        "id": 2,
        "sender": "Google",
        "content": "【Google】新しいアプリのダウンロードが完了しました",
        "display_url": "https://play.google.com/store/apps/details?id=com.google.app",
        "link_url": "http://localhost:3000/static-sites/scenario-malware/index.html",
        "threat_type": "malware",
        "description": "このメールはマルウェアの配布を目的としています。ユーザーがリンクをクリックすると、マルウェアが端末にインストールされる可能性があります。"
    },
    {
        # scenario 3: 2FA phishing
        "id": 3,
        "sender": "Microsoft",
        "content": "【Microsoft】2段階認証のコードを入力してください",
        "display_url": "https://account.microsoft.com/security",
        "link_url": "http://localhost:3000/static-sites/scenario-2fa/index.html",
        "threat_type": "2fa",
        "description": "このメールは2段階認証のフィッシングを目的としています。ユーザーがリンクをクリックすると、認証情報を盗む可能性があります。"
    }
]

@app.get("/messages", response_model=List[Message])
def get_messages():
    return scenarios
