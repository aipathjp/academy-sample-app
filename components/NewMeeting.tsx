"use client";

import { useRouter } from "next/navigation";
import MeetingForm from "@/components/MeetingForm";
import { ensureSignedIn, supabase } from "@/lib/supabase";
import type { MeetingInput } from "@/lib/types";

export default function NewMeeting() {
  const router = useRouter();

  async function create(input: MeetingInput) {
    await ensureSignedIn();
    const { data, error } = await supabase.from("meetings").insert(input).select("id").single();
    if (error) throw error;
    router.push(`/meetings/${data.id}`);
  }

  return <MeetingForm submitLabel="保存する" onSubmit={create} onCancel={() => router.push("/")} />;
}
