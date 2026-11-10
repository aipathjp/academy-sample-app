"use client";

import { useState } from "react";
import type { MeetingInput } from "@/lib/types";

type Props = {
  initial?: MeetingInput;
  submitLabel: string;
  onSubmit: (input: MeetingInput) => Promise<void>;
  onCancel?: () => void;
};

function today() {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export default function MeetingForm({ initial, submitLabel, onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [heldOn, setHeldOn] = useState(initial?.held_on ?? "");
  const [attendees, setAttendees] = useState(initial?.attendees ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("タイトルを入れてください");
      return;
    }
    setSaving(true);
    setError("");
    try {
      // 日付が空のときは今日にする
      await onSubmit({ title: title.trim(), held_on: heldOn || today(), attendees: attendees.trim(), notes });
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      setSaving(false);
    }
  }

  const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="mb-1 block font-bold">タイトル</span>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例：週次定例" className={field} />
      </label>
      <label className="block">
        <span className="mb-1 block font-bold">
          日付 <span className="text-sm font-normal text-slate-500">（空のままなら今日）</span>
        </span>
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

      {error && <p className="rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 rounded-xl bg-blue-600 py-3 text-base font-bold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? "保存中…" : submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded-xl border border-slate-300 bg-white px-5 py-3">
            やめる
          </button>
        )}
      </div>
    </form>
  );
}
