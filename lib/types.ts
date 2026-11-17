// データベースの表（supabase/schema.sql）と同じ形

export type Meeting = {
  id: string;
  title: string;
  held_on: string;
  attendees: string;
  notes: string;
  created_at: string;
};

export type Todo = {
  id: string;
  meeting_id: string;
  content: string;
  assignee: string;
  due_on: string | null;
  done: boolean;
  created_at: string;
};

export type MeetingInput = Pick<Meeting, "title" | "held_on" | "attendees" | "notes">;
