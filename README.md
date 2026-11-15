# 議事録と ToDo（第3章のスタート地点）

I-Path Academy 新カリキュラムの見本アプリの、**第3章を始める地点**（第2章のゴール）です。議事録の一覧画面と入力画面があります。データはまだ練習用の仮のもの（`lib/sample-meetings.ts`）で、入力画面の「保存する」は入れた内容を表示するだけです（本当の保存は第4章）。
完成版は `main` の枝にあります。

## 自分の PC で動かす手順

```bash
git clone --branch ch3-start https://github.com/aipathjp/academy-sample-app.git
cd academy-sample-app
npm install
npm run dev
```

ブラウザで http://localhost:3000 を開くと、「議事録の一覧」の画面が出ます。
