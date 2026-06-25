-- Run this in Supabase SQL Editor if needed.
create table if not exists journal_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  content text,
  image_url text,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

alter table journal_entries enable row level security;

drop policy if exists "user can read own entries" on journal_entries;
drop policy if exists "user can insert own entries" on journal_entries;

create policy "user can read own entries"
on journal_entries for select
using (auth.uid() = user_id);

create policy "user can insert own entries"
on journal_entries for insert
with check (auth.uid() = user_id);

create table if not exists library (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text not null,
  created_at timestamptz default now()
);

alter table library enable row level security;

drop policy if exists "any logged user can read library" on library;
drop policy if exists "any logged user can insert library" on library;

create policy "any logged user can read library"
on library for select
using (auth.uid() is not null);

create policy "any logged user can insert library"
on library for insert
with check (auth.uid() is not null);
