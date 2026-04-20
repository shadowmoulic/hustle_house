-- Table for Client Leads
CREATE TABLE HH_Leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    message TEXT,
    whatsapp TEXT -- Optional
);

-- RLS (Public Insert)
ALTER TABLE HH_Leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON HH_Leads FOR INSERT WITH CHECK (true);
