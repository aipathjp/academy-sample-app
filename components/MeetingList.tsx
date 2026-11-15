import { sampleMeetings } from "@/lib/sample-meetings";

export default function MeetingList() {
  // 日付の新しい順に並べる（元の並びは変えない）
  const meetings = [...sampleMeetings].sort((a, b) => b.held_on.localeCompare(a.held_on));

  return (
    <ul className="space-y-3">
      {meetings.map((m) => (
        <li key={m.id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">{m.held_on}</p>
          <p className="mt-1 text-lg font-bold">{m.title}</p>
          {m.attendees && <p className="mt-1 text-sm text-slate-600">参加者：{m.attendees}</p>}
        </li>
      ))}
    </ul>
  );
}
