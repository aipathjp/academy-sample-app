# 議事録と ToDo（上級 第6章のゴール）

I-Path Academy 新カリキュラムの見本アプリの、**上級 第6章のゴール**です。第6章のスタート地点（`ch6-start`）に、「内容から ToDo を取り出す」機能を足しました。議事録と ToDo が Supabase のデータベースに本当に保存され、日付の枠がスマホでも使いやすくなっています。

- 一覧：自分の議事録が日付の新しい順に並ぶ（押すと詳しい画面）
- 新しい議事録：タイトル・日付・参加者・内容を保存する
- 詳しい画面：見る・直す・消す。ToDo（担当・期限つき）を追加する・完了にチェックする・消す
- ログイン画面は作らない。初めて開いたときに名前のないユーザーとして自動でログインし（Supabase の匿名ログイン）、データの見張り役（RLS）が自分のデータだけを見せる

- 日付の枠（`components/DateField.tsx`）：ほかの枠と同じ見た目の箱に、透明な日付の枠を重ねる。薄い文字の説明（「空のままなら今日」「期限」）と、消すボタン（✕）がある（第5章）

- 内容から ToDo を取り出す（上級 第6章）：議事録の内容の「ToDo：」で始まる行を、詳しい画面の ToDo の欄に候補として出す。「＋ 追加」で ToDo になる。取り出すしくみは `lib/extractTodos.ts`

検索と「残りの ToDo の数」（初級・中級の第6章）は入っていません。それは `main` の枝にあります。

## 自分の PC で動かす手順

1. Supabase でプロジェクトを作り、SQL Editor に `supabase/schema.sql` の中身を全部貼って「Run」を押す
2. Supabase の Authentication の設定で、匿名ログイン（Allow anonymous sign-ins）をオンにする
3. `.env.example` をまねて `.env.local` を作り、Supabase の Project URL と Publishable key を書く

```bash
git clone --branch adv-ch6-goal https://github.com/aipathjp/academy-sample-app.git
cd academy-sample-app
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開くと、「議事録の一覧」の画面が出ます。
