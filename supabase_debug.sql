-- TEMPORARY DEBUGGING POLICY
-- Allow ANYONE (including not logged in) to View and Add ships
create policy "Enable public access for debugging" on public.ships
  for all
  using (true)
  with check (true);

-- Reload the schema cache to be safe
NOTIFY pgrst, 'reload config';
