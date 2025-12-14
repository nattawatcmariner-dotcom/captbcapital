-- Add Q88 Version 6 related fields to ships table
ALTER TABLE public.ships 
ADD COLUMN IF NOT EXISTS imo_number text,
ADD COLUMN IF NOT EXISTS flag text,
ADD COLUMN IF NOT EXISTS built_year integer,
ADD COLUMN IF NOT EXISTS dwt numeric,
ADD COLUMN IF NOT EXISTS loa numeric,
ADD COLUMN IF NOT EXISTS beam numeric,
ADD COLUMN IF NOT EXISTS max_draft numeric,
ADD COLUMN IF NOT EXISTS cubic_capacity numeric,
ADD COLUMN IF NOT EXISTS class_society text,
ADD COLUMN IF NOT EXISTS pi_club text;

-- Reload schema cache to ensure API picks up new columns
NOTIFY pgrst, 'reload config';
