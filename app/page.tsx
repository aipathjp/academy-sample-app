export default function Home() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-bold text-blue-600">第1章のスタート地点</p>
      <h1 className="mt-2 text-2xl font-bold">ようこそ！</h1>
      <p className="mt-4 leading-relaxed text-slate-700">
        このアプリは、これからあなたが育てていく「議事録と ToDo」のアプリです。
        今はまだ、名前とこの画面しかありません。
      </p>
      <ul className="mt-4 space-y-2 text-slate-700">
        <li>📝 第1章：アプリに自分の名前を付ける</li>
        <li>🖼 第2章：議事録の一覧と入力の画面を作る</li>
        <li>🌐 第3章：インターネットに公開する</li>
        <li>🗄 第4章：データベースとつないで、本当に保存する</li>
      </ul>
    </section>
  );
}
