"use client";

import { useState } from "react";

type Entered = { title: string; heldOn: string; attendees: string; notes: string };

export default function MeetingForm() {
  const [title, setTitle] = useState("");
  const [heldOn, setHeldOn] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  // 「保存する」を押したときに入っていた内容（第4章までは、表示するだけ）
  const [entered, setEntered] = useState<Entered | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("タイトルを入れてください");
      setEntered(null);
      return;
    }
    setError("");
    setEntered({ title: title.trim(), heldOn, attendees: attendees.trim(), notes });
  }

  const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block font-bold">タイトル</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：週次定例" className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block font-bold">日付</span>
        <input type="date" value={heldOn} onChange={(e) => setHeldOn(e.target.value)} className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block font-bold">参加者</span>
        <input value={attendees} onChange={(e) => setAttendees(e.target.value)} placeholder="例：田中、佐藤" className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block font-bold">内容</span>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={8}
          placeholder="話したこと・決まったことを書きます"
          className={field}
        />
      </label>

      <button type="submit" className="w-full rounded-xl bg-blue-600 py-3 text-base font-bold text-white hover:bg-blue-700">
        保存する
      </button>

      {error && <p className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}

      {entered && (
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
          <p className="font-bold text-blue-800">保存はまだできません。第4章で本当に保存できるようになります。</p>
          <dl className="mt-3 space-y-1 text-slate-700">
            <div>
              <dt className="inline font-bold">タイトル：</dt>
              <dd className="inline">{entered.title}</dd>
            </div>
            <div>
              <dt className="inline font-bold">日付：</dt>
              <dd className="inline">{entered.heldOn || "（未入力）"}</dd>
            </div>
            <div>
              <dt className="inline font-bold">参加者：</dt>
              <dd className="inline">{entered.attendees || "（未入力）"}</dd>
            </div>
            <div>
              <dt className="font-bold">内容：</dt>
              <dd className="whitespace-pre-wrap">{entered.notes || "（未入力）"}</dd>
            </div>
          </dl>
        </div>
      )}
    </form>
  );
}
