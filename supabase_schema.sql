-- Create Ships Table
create table public.ships (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  type text not null,
  status text not null,
  location text,
  destination text,
  eta text,
  speed numeric,
  cargo text,
  charterer text
);

-- Enable Row Level Security (RLS)
alter table public.ships enable row level security;

-- Create Policy: Allow Public Read Access (For Demo purposes)
create policy "Allow public read access"
  on public.ships for select
  using (true);

-- Create Policy: Allow Public Insert Access (For Demo purposes)
create policy "Allow public insert access"
  on public.ships for insert
  with check (true);

-- Create Policy: Allow Public Update Access (For Demo purposes)
create policy "Allow public update access"
  on public.ships for update
  using (true);

-- Create Policy: Allow Public Delete Access (For Demo purposes)
create policy "Allow public delete access"
  on public.ships for delete
  using (true);

-- Insert Mock Data
insert into public.ships (name, type, status, location, destination, eta, speed, cargo, charterer)
values
  ('MT OCEAN QUEEN', 'VLCC', 'In Transit', 'Indian Ocean', 'Ningbo, CN', '2025-12-15', 12.5, 'Crude Oil', 'Unipec'),
  ('MT PACIFIC STAR', 'Suezmax', 'Loading', 'Ras Tanura, SA', 'Singapore, SG', '2025-12-20', 0, 'Crude Oil', 'Shell'),
  ('MT ATLANTIC ROSE', 'Aframax', 'Discharging', 'Rotterdam, NL', 'Antwerp, BE', '2025-12-05', 0, 'Fuel Oil', 'BP'),
  ('MT NORDIC SPIRIT', 'VLCC', 'Waiting', 'Fujairah, AE', 'Orders', '-', 0, 'Empty', 'Spot'),
  ('MT EASTERN DRAGON', 'MR', 'In Transit', 'South China Sea', 'Manila, PH', '2025-12-08', 13.0, 'Gasoline', 'Petron');
