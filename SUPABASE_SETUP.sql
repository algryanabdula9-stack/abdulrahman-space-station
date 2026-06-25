-- Run this in Supabase SQL Editor if you rebuild the database or get permission errors.

create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

alter table journal_entries enable row level security;
drop policy if exists "user can read own entries" on journal_entries;
drop policy if exists "user can insert own entries" on journal_entries;
create policy "user can read own entries" on journal_entries for select using (auth.uid() = user_id);
create policy "user can insert own entries" on journal_entries for insert with check (auth.uid() = user_id);

create table if not exists library (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  created_at timestamptz default now()
);

alter table library enable row level security;
drop policy if exists "authenticated can read library" on library;
drop policy if exists "authenticated can insert library" on library;
create policy "authenticated can read library" on library for select to authenticated using (true);
create policy "authenticated can insert library" on library for insert to authenticated with check (true);
