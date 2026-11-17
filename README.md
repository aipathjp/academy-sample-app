# 議事録と ToDo（第4章のスタート地点）

I-Path Academy 新カリキュラムの見本アプリの、**第4章を始める地点**（第3章のゴール）です。議事録の一覧画面と入力画面があり、画面のいちばん下に「（名前）の議事録アプリ」と出ます（第3章 3.5 で足したもの。見本では「見本」）。データはまだ練習用の仮のもの（`lib/sample-meetings.ts`）で、入力画面の「保存する」は入れた内容を表示するだけです（本当の保存は第4章）。
完成版は `main` の枝にあります。

## 自分の PC で動かす手順

```bash
git clone --branch ch4-start https://github.com/aipathjp/academy-sample-app.git
cd academy-sample-app
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開くと、「議事録の一覧」の画面が出ます。
