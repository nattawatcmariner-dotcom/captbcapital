-- Drop valid existing policies to restart fresh
DROP POLICY IF EXISTS "Enable all access for authenticated users" ON public.ships;
DROP POLICY IF EXISTS "Enable all access for details" ON public.ships;
DROP POLICY IF EXISTS "Enable all access for public" ON public.ships;

DROP POLICY IF EXISTS "Enable all access for users" ON public.profiles;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.profiles;

-- 1. SHIPS TABLE (Already done, but repeating for safety)
CREATE POLICY "Enable all access for public" ON public.ships
FOR ALL USING (true) WITH CHECK (true);

-- 2. PROFILES TABLE (New improvement)
-- Allows smooth login even if profile fetching is slow/restricted
CREATE POLICY "Enable read access for public profiles" ON public.profiles
FOR SELECT USING (true);

-- Allow users to update their own profile (if needed)
CREATE POLICY "Enable update for own profile" ON public.profiles
FOR UPDATE USING (auth.uid() = id);

-- Allow insert for new users
CREATE POLICY "Enable insert for own profile" ON public.profiles
FOR INSERT WITH CHECK (auth.uid() = id);
