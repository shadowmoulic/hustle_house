-- Advanced Customization for HH Profiles
ALTER TABLE HH_profiles 
ADD COLUMN IF NOT EXISTS custom_subdomain TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS theme_config JSONB DEFAULT '{"variant": "standard", "show_rating": true, "font_style": "mono"}'::jsonb,
ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#F5A623', -- Electric Amber
ADD COLUMN IF NOT EXISTS banner_image TEXT;

-- Update existing profiles to have a custom subdomain matching their slug for now
UPDATE HH_profiles SET custom_subdomain = slug WHERE custom_subdomain IS NULL;

-- Example of a customized profile update
UPDATE HH_profiles SET 
    theme_config = '{"variant": "premium", "show_rating": false, "font_style": "serif"}'::jsonb,
    primary_color = '#E63946' -- Signal Red for Sayak
WHERE slug = 'sayak';
