# 議事録と ToDo（第5章のスタート地点）

I-Path Academy 新カリキュラムの見本アプリの、**第5章を始める地点**（第4章のゴール）です。議事録と ToDo が Supabase のデータベースに本当に保存されます。

- 一覧：自分の議事録が日付の新しい順に並ぶ（押すと詳しい画面）
- 新しい議事録：タイトル・日付・参加者・内容を保存する
- 詳しい画面：見る・直す・消す。ToDo（担当・期限つき）を追加する・完了にチェックする・消す
- ログイン画面は作らない。初めて開いたときに名前のないユーザーとして自動でログインし（Supabase の匿名ログイン）、データの見張り役（RLS）が自分のデータだけを見せる

日付の枠の見た目の直し（第5章）と、検索（第6章）は、まだ入っていません。完成版は `main` の枝にあります。

## 自分の PC で動かす手順

1. Supabase でプロジェクトを作り、SQL Editor に `supabase/schema.sql` の中身を全部貼って「Run」を押す
2. Supabase の Authentication の設定で、匿名ログイン（Allow anonymous sign-ins）をオンにする
3. `.env.example` をまねて `.env.local` を作り、Supabase の Project URL と Publishable key を書く

```bash
git clone --branch ch5-start https://github.com/aipathjp/academy-sample-app.git
cd academy-sample-app
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開くと、「議事録の一覧」の画面が出ます。
