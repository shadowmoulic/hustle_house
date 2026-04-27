-- HUSTLE HOUSE MASTER SCHEMA
-- Version: 1.0.0
-- Description: Consolidated schema for Profiles, Portfolio, Onboarding, and Leads.

-- Enable Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (The Vetted Talent)
CREATE TABLE IF NOT EXISTS HH_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,                       -- e.g., 'sayak'
    custom_subdomain TEXT UNIQUE,                    -- e.g., 'sayak' (used for sayak.hustlehouse.io)
    full_name TEXT NOT NULL,
    role TEXT NOT NULL,                              -- e.g., 'SEO Strategist'
    education TEXT DEFAULT 'IIT Kharagpur',
    rating DECIMAL(2,1) DEFAULT 5.0,
    projects_count INTEGER DEFAULT 0,
    bio TEXT,
    skills TEXT,                                     -- Comma separated tags
    tools TEXT,                                      -- Comma separated tools
    availability TEXT DEFAULT 'available',           -- 'available' or 'busy'
    min_project_price INTEGER DEFAULT 200,
    photo_url TEXT,
    cal_link TEXT,                                   -- cal.com link
    primary_color TEXT DEFAULT '#F5A623',            -- Accent color
    theme_config JSONB DEFAULT '{"variant": "standard", "show_rating": true, "font_style": "mono"}'::jsonb,
    banner_image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. PORTFOLIO TABLE (Proof of Work)
CREATE TABLE IF NOT EXISTS HH_portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES HH_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    client_type TEXT,                                -- e.g., 'B2B SaaS'
    result_metric TEXT,                              -- e.g., '0 -> 4,200'
    result_detail TEXT,                              -- e.g., 'monthly visits'
    proof_link TEXT,                                 -- Link to actual proof
    icon TEXT,                                       -- Emoji or SVG string
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. ONBOARDING TABLE (Applications)
CREATE TABLE IF NOT EXISTS hh_onboarding (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    roll_number TEXT,
    grad_year TEXT,
    whatsapp TEXT,
    linkedin_url TEXT,
    portfolio TEXT,
    additional_proof TEXT,                      -- Comma separated links
    custom_subdomain TEXT,                       -- Requested subdomain
    primary_color TEXT DEFAULT '#F5A623',        -- Requested brand color
    expertise TEXT,                               -- Comma separated selection
    bio TEXT,                                     -- North Star Project
    status TEXT DEFAULT 'pending',                -- 'pending', 'accepted', 'rejected'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. LEADS TABLE (Inbound Requests)
CREATE TABLE IF NOT EXISTS HH_Leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    message TEXT,
    whatsapp TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. RLS POLICIES
ALTER TABLE HH_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE HH_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE hh_onboarding ENABLE ROW LEVEL SECURITY;
ALTER TABLE HH_Leads ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public Read Profiles" ON HH_profiles FOR SELECT USING (true);
CREATE POLICY "Public Read Portfolio" ON HH_portfolio FOR SELECT USING (true);

-- Public Insert Policies (For Forms)
CREATE POLICY "Public Insert Onboarding" ON hh_onboarding FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Leads" ON HH_Leads FOR INSERT WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_profile_slug ON HH_profiles(slug);
CREATE INDEX IF NOT EXISTS idx_profile_subdomain ON HH_profiles(custom_subdomain);
CREATE INDEX IF NOT EXISTS idx_portfolio_profile ON HH_portfolio(profile_id);
