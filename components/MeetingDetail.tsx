"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MeetingForm from "@/components/MeetingForm";
import TodoSection from "@/components/TodoSection";
import { ensureSignedIn, supabase } from "@/lib/supabase";
import type { Meeting, MeetingInput } from "@/lib/types";

export default function MeetingDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await ensureSignedIn();
        const { data, error } = await supabase.from("meetings").select("*").eq("id", id).maybeSingle();
        if (error) throw error;
        if (!data) setNotFound(true);
        else setMeeting(data as Meeting);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
  }, [id]);

  async function update(input: MeetingInput) {
    const { data, error } = await supabase.from("meetings").update(input).eq("id", id).select("*").single();
    if (error) throw error;
    setMeeting(data as Meeting);
    setEditing(false);
  }

  async function remove() {
    if (!confirm("この議事録と、ぶら下がっている ToDo をすべて消します。よろしいですか？")) return;
    const { error } = await supabase.from("meetings").delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
  }

  if (error) return <p className="rounded-lg bg-red-50 p-4 text-red-700">うまくいきませんでした：{error}</p>;
  if (notFound)
    return (
      <p className="text-slate-600">
        この議事録は見つかりませんでした。
        <Link href="/" className="ml-2 text-blue-600 underline">
          一覧へ戻る
        </Link>
      </p>
    );
  if (!meeting) return <p className="text-slate-500">読み込み中…</p>;

  return (
    <div className="space-y-6">
      <Link href="/" className="text-sm text-blue-600 underline">
        ← 一覧へ戻る
      </Link>

      {editing ? (
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <MeetingForm initial={meeting} submitLabel="変更を保存" onSubmit={update} onCancel={() => setEditing(false)} />
        </section>
      ) : (
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{meeting.held_on}</p>
          <h1 className="mt-1 text-2xl font-bold">{meeting.title}</h1>
          {meeting.attendees && <p className="mt-2 text-slate-600">参加者：{meeting.attendees}</p>}
          <p className="mt-4 whitespace-pre-wrap leading-relaxed">{meeting.notes || "（内容はまだありません）"}</p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setEditing(true)} className="flex-1 rounded-xl border border-slate-300 py-3 font-bold">
              ✏️ 直す
            </button>
            <button onClick={remove} className="rounded-xl border border-red-300 px-5 py-3 font-bold text-red-600">
              🗑 消す
            </button>
          </div>
        </section>
      )}

      <TodoSection meetingId={meeting.id} />
    </div>
  );
}
