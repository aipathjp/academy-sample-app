"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Todo } from "@/lib/types";

export default function TodoSection({ meetingId }: { meetingId: string }) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [content, setContent] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueOn, setDueOn] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("todos")
        .select("*")
        .eq("meeting_id", meetingId)
        .order("created_at", { ascending: true });
      if (error) setError(error.message);
      else setTodos(data as Todo[]);
    })();
  }, [meetingId]);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    const { data, error } = await supabase
      .from("todos")
      .insert({ meeting_id: meetingId, content: content.trim(), assignee: assignee.trim(), due_on: dueOn || null })
      .select("*")
      .single();
    if (error) {
      setError(error.message);
      return;
    }
    setTodos([...todos, data as Todo]);
    setContent("");
    setAssignee("");
    setDueOn("");
    setError("");
  }

  async function toggle(todo: Todo) {
    const { error } = await supabase.from("todos").update({ done: !todo.done }).eq("id", todo.id);
    if (error) {
      setError(error.message);
      return;
    }
    setTodos(todos.map((t) => (t.id === todo.id ? { ...t, done: !t.done } : t)));
  }

  async function remove(todo: Todo) {
    const { error } = await supabase.from("todos").delete().eq("id", todo.id);
    if (error) {
      setError(error.message);
      return;
    }
    setTodos(todos.filter((t) => t.id !== todo.id));
  }

  const field = "rounded-lg border border-slate-300 bg-white px-3 py-3 text-base";

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-lg font-bold">やること（ToDo）</h2>

      <ul className="mt-3 divide-y divide-slate-100">
        {todos.length === 0 && <li className="py-3 text-slate-400">まだ ToDo はありません</li>}
        {todos.map((t) => (
          <li key={t.id} className="flex items-start gap-3 py-3">
            <input
              type="checkbox"
              checked={t.done}
              onChange={() => toggle(t)}
              aria-label={`${t.content} を完了にする`}
              className="mt-1 h-6 w-6 shrink-0 accent-green-600"
            />
            <div className="min-w-0 flex-1">
              <p className={t.done ? "text-slate-400 line-through" : "font-medium"}>{t.content}</p>
              <p className="text-sm text-slate-500">
                {t.assignee && <>担当：{t.assignee}　</>}
                {t.due_on && <>期限：{t.due_on}</>}
              </p>
            </div>
            <button onClick={() => remove(t)} aria-label={`${t.content} を消す`} className="px-2 text-slate-400 hover:text-red-600">
              ✕
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={add} className="mt-4 space-y-3 border-t border-slate-100 pt-4">
        <input value={content} onChange={(e) => setContent(e.target.value)} placeholder="やること（例：資料を共有する）" className={`${field} w-full`} />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input value={assignee} onChange={(e) => setAssignee(e.target.value)} placeholder="担当（例：田中）" className={`${field} sm:flex-1`} />
          <input type="date" value={dueOn} onChange={(e) => setDueOn(e.target.value)} aria-label="期限" className={`${field} sm:flex-1`} />
        </div>
        <button type="submit" className="w-full rounded-xl bg-green-600 py-3 font-bold text-white hover:bg-green-700">
          ＋ ToDo を追加
        </button>
      </form>

      {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">{error}</p>}
    </section>
  );
}
