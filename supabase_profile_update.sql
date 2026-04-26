-- Update HH_profiles with new fields for the premium template
ALTER TABLE HH_profiles 
ADD COLUMN IF NOT EXISTS availability TEXT DEFAULT 'available',
ADD COLUMN IF NOT EXISTS skills TEXT,
ADD COLUMN IF NOT EXISTS tools TEXT,
ADD COLUMN IF NOT EXISTS min_project_price INTEGER DEFAULT 200;

-- Update HH_portfolio with new fields for proof cards
ALTER TABLE HH_portfolio
ADD COLUMN IF NOT EXISTS client_type TEXT,
ADD COLUMN IF NOT EXISTS result_detail TEXT,
ADD COLUMN IF NOT EXISTS proof_link TEXT;

-- Sample Update for Sayak
UPDATE HH_profiles SET 
    skills = 'Technical SEO, Semantic Content, Growth',
    tools = 'Search Console, Ahrefs, SEMRush, Screaming Frog',
    min_project_price = 300,
    availability = 'available',
    cal_link = 'https://cal.com/kgphustlehouse/seo'
WHERE slug = 'sayak';

-- Sample Portfolio Update for Sayak
UPDATE HH_portfolio SET
    client_type = 'B2B SaaS / FinTech',
    result_metric = '0 → 4,200',
    result_detail = 'monthly organic visits in 4 months',
    proof_link = 'https://google.com'
WHERE profile_id IN (SELECT id FROM HH_profiles WHERE slug = 'sayak');
