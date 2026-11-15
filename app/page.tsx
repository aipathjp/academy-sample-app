import MeetingList from "@/components/MeetingList";

export default function Home() {
  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">議事録の一覧</h1>
      <MeetingList />
    </>
  );
}
