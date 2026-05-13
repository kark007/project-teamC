# サーバー起動方法
1. Docker Desktopを起動する。
2. プロジェクトのルート（../sms-security-app）で以下のコマンドを実行する。
    - 初回の場合
        ```
        bash
        docker compose up -d --build
        ```
    - 初回以外の場合
        ```
        bash
        docker compose up -d
        ```
3. Dockerを停止する
    ```
    bash
    docker compose down
    ```
