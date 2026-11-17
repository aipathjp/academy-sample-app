"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ensureSignedIn, supabase } from "@/lib/supabase";
import type { Meeting } from "@/lib/types";

export default function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        await ensureSignedIn();
        // 会議を新しい順に取ってくる
        const { data, error } = await supabase
          .from("meetings")
          .select("*")
          .order("held_on", { ascending: false })
          .order("created_at", { ascending: false });
        if (error) throw error;
        setMeetings(data as Meeting[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, []);

  if (error) return <p className="rounded-lg bg-red-50 p-4 text-red-700">読み込めませんでした：{error}</p>;
  if (!meetings) return <p className="text-slate-500">読み込み中…</p>;

  return (
    <div className="space-y-4">
      {meetings.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
          <p className="mb-4">まだ議事録がありません。</p>
          <Link href="/meetings/new" className="font-bold text-blue-600 underline">
            最初の議事録を書いてみよう
          </Link>
        </div>
      )}

      <ul className="space-y-3">
        {meetings.map((m) => (
          <li key={m.id}>
            <Link
              href={`/meetings/${m.id}`}
              className="block rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-blue-400"
            >
              <p className="text-sm text-slate-500">{m.held_on}</p>
              <p className="mt-1 text-lg font-bold">{m.title}</p>
              {m.attendees && <p className="mt-1 text-sm text-slate-600">参加者：{m.attendees}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
