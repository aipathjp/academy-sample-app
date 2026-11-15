// 練習用の仮の議事録（本物の会社の情報は入れない）。
// 第4章でデータベースとつなぐまでは、ここにあるものを一覧に出す。

export type Meeting = {
  id: string;
  title: string;
  held_on: string;
  attendees: string;
  notes: string;
};

export const sampleMeetings: Meeting[] = [
  {
    id: "1",
    title: "社内勉強会の振り返り",
    held_on: "2026-11-04",
    attendees: "鈴木、山本",
    notes: "AI の使い方の勉強会をふり返った。\n次回は 12 月に、議事録アプリづくりをテーマにする。",
  },
  {
    id: "2",
    title: "週次定例",
    held_on: "2026-11-10",
    attendees: "田中、佐藤、鈴木",
    notes: "先週の進み具合を共有した。\n来週までに、発表の資料を田中さんがまとめる。",
  },
  {
    id: "3",
    title: "新サービス企画会議",
    held_on: "2026-11-06",
    attendees: "山本、田中",
    notes: "新しいサービスの名前の候補を 3 つ出した。\n次回までに、それぞれの良い所と悪い所を考えてくる。",
  },
];
