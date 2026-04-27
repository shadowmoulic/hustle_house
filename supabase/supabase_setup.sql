-- SQL for Hustle House Profiles and Portfolio
-- This script sets up the tables for freelancer profiles and their work.

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS HH_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL, -- sayak, rahul, etc.
    full_name TEXT NOT NULL,
    role TEXT NOT NULL, -- SEO Strategist, Web Dev, etc.
    education TEXT DEFAULT 'IIT Kharagpur',
    rating DECIMAL(2,1) DEFAULT 5.0,
    projects_count INTEGER DEFAULT 0,
    bio TEXT,
    photo_url TEXT,
    cal_link TEXT, -- cal.com/sayak/30min
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Portfolio/Case Studies Table
CREATE TABLE IF NOT EXISTS HH_portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES HH_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT, -- emoji or SVG
    result_metric TEXT, -- e.g., "25% Search Traffic Increase"
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Skills Table (Optional, for filtering)
CREATE TABLE IF NOT EXISTS HH_skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES HH_profiles(id) ON DELETE CASCADE,
    skill_name TEXT NOT NULL, -- SEO, React, Zapier
    category TEXT -- Graphics, Tech, Marketing
);

-- Enable Row Level Security (RLS)
ALTER TABLE HH_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE HH_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE HH_skills ENABLE ROW LEVEL SECURITY;

-- Select policy (everyone can read)
CREATE POLICY "Public Read" ON HH_profiles FOR SELECT USING (true);
CREATE POLICY "Public Read" ON HH_portfolio FOR SELECT USING (true);
CREATE POLICY "Public Read" ON HH_skills FOR SELECT USING (true);

-- Insert Sample Data
INSERT INTO HH_profiles (slug, full_name, role, education, rating, projects_count, bio, cal_link)
VALUES 
('sayak', 'Sayak', 'SEO Strategist', 'IIT Kharagpur', 5.0, 3, 'Specialized in semantic SEO and organic growth for startups.', 'sayak/30min'),
('rahul', 'Rahul', 'Web Developer', 'IIT Kharagpur', 4.5, 1, 'Full-stack developer focused on performance and scale.', 'rahul/discovery');

INSERT INTO HH_portfolio (profile_id, title, description, icon)
SELECT id, 'FinTech SEO Scale', 'Increased monthly organic visitors from 1k to 25k.', '📈'
FROM HH_profiles WHERE slug = 'sayak';
