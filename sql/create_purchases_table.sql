-- Run this exact code in your Supabase SQL Editor to track all new purchases!
-- It stores the critical metadata injected from the Lead Capture Modal in the checkout session.

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id TEXT UNIQUE NOT NULL,
  client_email TEXT,
  zip_code TEXT,
  plan_name TEXT,
  lead_count INTEGER,
  niche_name TEXT,
  city_name TEXT,
  price_paid DECIMAL(10,2),
  source_url TEXT,
  status TEXT DEFAULT 'paid', -- Can be 'paid', 'delivered', 'refunded'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS) but allow the backend Admin Service Role to bypass it safely
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- Index for fast searches by email or stripe session
CREATE INDEX IF NOT EXISTS idx_purchases_stripe_session_id ON purchases(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_purchases_client_email ON purchases(client_email);
