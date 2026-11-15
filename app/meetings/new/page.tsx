import Link from "next/link";
import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <>
      <Link href="/" className="text-sm text-blue-600 underline">
        ← 一覧へ戻る
      </Link>
      <h1 className="mb-4 mt-2 text-2xl font-bold">新しい議事録</h1>
      <MeetingForm />
    </>
  );
}
