-- Drop valid existing policies to restart fresh
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.ships;
DROP POLICY IF EXISTS "Enable all access for details" ON public.ships;

-- Create a new policy that allows ALL operations for everyone (anon key)
-- This is suitable for this stage where we want the app to work publicly
CREATE POLICY "Enable all access for public" ON public.ships
FOR ALL USING (true) WITH CHECK (true);
