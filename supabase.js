// Supabase Configuration
const SUPABASE_URL = 'https://yjocgelojlzrnnsotvgj.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlqb2NnZWxvamx6cm5uc290dmdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxNTQ1NjYsImV4cCI6MjA5MTczMDU2Nn0.OkJpTyweZAqWwGF3mNGqAHgiPgP0K77udiccPvzKVGw';

// Initialize the Supabase client
const db = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
