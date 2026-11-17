import { Suspense } from "react";
import MeetingDetail from "@/components/MeetingDetail";

export default function MeetingPage() {
  // どの議事録を開くか（URL の id）は開いたときに決まるので、Suspense で包む
  return (
    <Suspense fallback={<p className="text-slate-500">読み込み中…</p>}>
      <MeetingDetail />
    </Suspense>
  );
}
