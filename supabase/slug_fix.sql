-- Correcting slug for Sayak as per user request
UPDATE HH_profiles 
SET slug = 'sayak-moulic', 
    custom_subdomain = 'sayak' 
WHERE slug = 'sayak';

-- Portfolio updates for the new slug if needed
UPDATE HH_portfolio SET profile_id = (SELECT id FROM HH_profiles WHERE slug = 'sayak-moulic')
WHERE profile_id IN (SELECT id FROM HH_profiles WHERE slug = 'sayak');
