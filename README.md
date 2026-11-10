# 議事録と ToDo（I-Path Academy 見本アプリ）

I-Path Academy の新カリキュラムで、受講者全員が作るアプリの見本（完成版）です。

会議ごとに議事録を書き、決まった「やること（ToDo）」を担当者と期限つきで残せます。ToDo は完了にチェックできます。スマホでも使いやすい画面になっています。

## できること

| 画面 | できること | データベースの操作 |
|---|---|---|
| 議事録の一覧 | 新しい順に並ぶ。キーワードでさがせる。残りの ToDo の数が分かる | 表示 |
| 新しい議事録 | タイトル・日付・参加者・内容を書いて保存する | 保存 |
| 議事録の詳しい画面 | 内容を見る・直す・消す | 表示・更新・削除 |
| やること（ToDo） | 追加する・完了にチェックする・消す | 保存・更新・削除 |

## 使っているもの（すべて無料で使える）

- 画面：Next.js + Tailwind CSS
- データベース：Supabase
- コードの保存：GitHub
- 公開：Vercel

ログイン画面はありません。初めて開いたときに、名前のないユーザーとして自動でログインします（Supabase の「匿名ログイン」）。データの見張り役（RLS）が、自分の書いたデータだけを見せます。別のスマホやブラウザで開くと、別の人として扱われます。

> 学習用のアプリです。本物の社内の議事録は入れず、練習用の内容で試してください。

## 自分の PC で動かす手順

1. Supabase で新しいプロジェクトを作る
2. Supabase の「SQL Editor」に `supabase/schema.sql` の中身を全部貼り付けて「Run」を押す（表ができる）
3. Supabase の「Authentication」→「Sign In / Providers」で「Allow anonymous sign-ins」をオンにする
4. `.env.example` をコピーして `.env.local` という名前にし、Supabase の「Project URL」と「Publishable key」を書く
5. 次のコマンドを順に実行する

```bash
npm install
npm run dev
```

6. ブラウザで http://localhost:3000 を開く

## インターネットに公開する手順

1. このリポジトリを自分の GitHub に用意する
2. Vercel で「Add New」→「Project」から、そのリポジトリを選ぶ
3. 「Environment Variables」に、`.env.local` と同じ 2 つの値を入れて「Deploy」を押す

## ファイルの地図

| ファイル | 役割 |
|---|---|
| `app/page.tsx` | 議事録の一覧ページ |
| `app/meetings/new/page.tsx` | 新しい議事録のページ |
| `app/meetings/[id]/page.tsx` | 議事録の詳しいページ |
| `components/` | 画面の部品（一覧・入力フォーム・詳しい画面・ToDo） |
| `lib/supabase.ts` | Supabase とつなぐ設定と、自動ログイン |
| `lib/types.ts` | データの形 |
| `supabase/schema.sql` | データベースの設計図（表とデータの見張り役） |
