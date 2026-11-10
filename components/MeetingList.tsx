"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ensureSignedIn, supabase } from "@/lib/supabase";
import type { Meeting } from "@/lib/types";

type MeetingWithTodos = Meeting & { todos: { done: boolean }[] };

export default function MeetingList() {
  const [meetings, setMeetings] = useState<MeetingWithTodos[] | null>(null);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await ensureSignedIn();
        // 会議を新しい順に取ってくる。ToDo は「終わったかどうか」だけ一緒に取る
        const { data, error } = await supabase
          .from("meetings")
          .select("*, todos(done)")
          .order("held_on", { ascending: false })
          .order("created_at", { ascending: false });
        if (error) throw error;
        setMeetings(data as MeetingWithTodos[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  if (error) return <p className="rounded-lg bg-red-50 p-4 text-red-700">読み込めませんでした：{error}</p>;
  if (!meetings) return <p className="text-slate-500">読み込み中…</p>;

  const word = keyword.trim();
  const shown = word
    ? meetings.filter((m) => [m.title, m.attendees, m.notes].some((text) => text.includes(word)))
    : meetings;

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="🔍 タイトル・参加者・内容でさがす"
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base"
      />

      {meetings.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          <p className="mb-4">まだ議事録がありません。</p>
          <Link href="/meetings/new" className="font-bold text-blue-600 underline">
            最初の議事録を書いてみよう
          </Link>
        </div>
      )}

      {meetings.length > 0 && shown.length === 0 && (
        <p className="text-slate-500">「{word}」に当てはまる議事録はありません。</p>
      )}

      <ul className="space-y-3">
        {shown.map((m) => {
          const left = m.todos.filter((t) => !t.done).length;
          return (
            <li key={m.id}>
              <Link
                href={`/meetings/${m.id}`}
                className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-400"
              >
                <p className="text-sm text-slate-500">{m.held_on}</p>
                <p className="mt-1 text-lg font-bold">{m.title}</p>
                {m.attendees && <p className="mt-1 text-sm text-slate-600">参加者：{m.attendees}</p>}
                <p className="mt-2 text-sm">
                  {m.todos.length === 0 ? (
                    <span className="text-slate-400">ToDo なし</span>
                  ) : left === 0 ? (
                    <span className="font-bold text-green-700">✅ ToDo はすべて完了</span>
                  ) : (
                    <span className="font-bold text-orange-600">
                      残りの ToDo：{left} / {m.todos.length}
                    </span>
                  )}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
