-- 議事録と ToDo アプリのデータベース設計図
-- Supabase の「SQL Editor」にこのファイルの中身を全部貼り付けて「Run」を押すと、表ができます。

-- 会議（議事録）の表
create table if not exists public.meetings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  title text not null,
  held_on date not null default current_date,
  attendees text not null default '',
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- やること（ToDo）の表。1 つの会議に、いくつでもぶら下がる
create table if not exists public.todos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  meeting_id uuid not null references public.meetings (id) on delete cascade,
  content text not null,
  assignee text not null default '',
  due_on date,
  done boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists todos_meeting_id_idx on public.todos (meeting_id);

-- データの見張り役（RLS）：自分が作ったデータだけを、見たり直したりできるようにする
alter table public.meetings enable row level security;
alter table public.todos enable row level security;

create policy "自分の会議だけ見られる" on public.meetings
  for select using (auth.uid() = user_id);
create policy "自分の会議だけ作れる" on public.meetings
  for insert with check (auth.uid() = user_id);
create policy "自分の会議だけ直せる" on public.meetings
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "自分の会議だけ消せる" on public.meetings
  for delete using (auth.uid() = user_id);

create policy "自分の ToDo だけ見られる" on public.todos
  for select using (auth.uid() = user_id);
-- ToDo を付ける会議も、自分のものでなければいけない
create policy "自分の ToDo だけ作れる" on public.todos
  for insert with check (
    auth.uid() = user_id
    and exists (select 1 from public.meetings m where m.id = meeting_id and m.user_id = auth.uid())
  );
create policy "自分の ToDo だけ直せる" on public.todos
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "自分の ToDo だけ消せる" on public.todos
  for delete using (auth.uid() = user_id);
