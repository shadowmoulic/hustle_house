-- Adding specialist field to leads table to track who the inquiry is for
ALTER TABLE hh_leads ADD COLUMN IF NOT EXISTS specialist_name TEXT;
ALTER TABLE hh_leads ADD COLUMN IF NOT EXISTS company_name TEXT;
