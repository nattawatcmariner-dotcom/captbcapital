-- Create the ships table
create table public.ships (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  type text not null,
  status text not null,
  location text,
  destination text,
  eta text,
  speed numeric default 0,
  cargo text,
  charterer text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.ships enable row level security;

-- Create policy to allow all actions for authenticated users
create policy "Enable all access for details" on public.ships
  for all using (true);

-- Create policy to allow read access for everyone (optional, if you want public to see fleet)
-- create policy "Enable read access for all users" on public.ships for select using (true);
