-- SQL script to create the Case Studies table in Supabase

CREATE TABLE IF NOT EXISTS public.hh_case_studies (
    id UUID DEFAULT extensions.uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    keyword TEXT NOT NULL,
    url_slug TEXT NOT NULL UNIQUE,
    seo_title TEXT NOT NULL,
    h1_title TEXT NOT NULL,
    meta_description TEXT NOT NULL,
    hero_image_url TEXT NOT NULL,
    content TEXT NOT NULL,
    author_name TEXT DEFAULT 'Sayak Moulic',
    author_title TEXT DEFAULT 'Co-Founder KGP Hustle House',
    author_experience_years INTEGER,
    author_linkedin TEXT DEFAULT 'https://www.linkedin.com/in/sayak-moulic-seo-for-coaches/'
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.hh_case_studies ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so anyone can view the case studies)
CREATE POLICY "Enable read access for all users" ON public.hh_case_studies
    FOR SELECT USING (true);

-- Allow public insert access (since the admin panel currently handles its own passcode logic)
-- If you want this completely locked down to authenticated users, change this policy accordingly.
CREATE POLICY "Enable insert access for all users" ON public.hh_case_studies
    FOR INSERT WITH CHECK (true);
