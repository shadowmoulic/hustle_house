-- Add status field to onboarding
ALTER TABLE hh_onboarding 
ADD COLUMN status TEXT DEFAULT 'pending';
