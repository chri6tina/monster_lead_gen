-- Lead Monster Supabase Schema
-- Paste this entire file into the Supabase SQL Editor and hit "Run"

-- 1. Create the 'blogs' table for the Intelligence Routing Hub
CREATE TABLE IF NOT EXISTS public.blogs (
    slug TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    author TEXT DEFAULT 'Lead Monster Intelligence',
    date DATE DEFAULT CURRENT_DATE,
    "targetNiche" TEXT,
    "targetCity" TEXT,
    "linkedUrl" TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the 'city_pages' table for the ultra-specific location databases
-- Note: we use "double quotes" for camelCase so Next.js parses the JSON flawlessly without a transformer
CREATE TABLE IF NOT EXISTS public.city_pages (
    niche_slug TEXT NOT NULL,
    city_slug TEXT NOT NULL,
    "heroHeadline" TEXT,
    "heroSub" TEXT,
    "infoHeading" TEXT,
    "infoParagraph" TEXT,
    "feat1Title" TEXT,
    "feat1Desc" TEXT,
    "feat2Title" TEXT,
    "feat2Desc" TEXT,
    "targetAudienceHeading" TEXT,
    "targetAudience" JSONB, -- Example array of objects: [{"title": "A", "desc": "B"}, ...]
    "landscapeHeading" TEXT,
    "landscapeParagraph1" TEXT,
    "landscapeParagraph2" TEXT,
    "faqs" JSONB, -- Example array of localized FAQs: [{"question": "Q?", "answer": "A."}]
    "blogs" JSONB, -- Example array of localized blogs: [{"title": "Blog", "url": "/blog/x"}]
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT city_pages_pkey PRIMARY KEY (niche_slug, city_slug)
);

-- 3. Enable Row Level Security (RLS)
-- This protects your database tables from being written to by hackers or outside bots
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.city_pages ENABLE ROW LEVEL SECURITY;

-- 4. Create Public Read Policies
-- This allows your Next.js application (and public website visitors) to SELECT and READ the data safely
CREATE POLICY "Allow public read access to blogs"
ON public.blogs FOR SELECT
USING (true);

CREATE POLICY "Allow public read access to city_pages"
ON public.city_pages FOR SELECT
USING (true);

-- 5. (Optional but Recommended) Service Role Write Security
-- Only allowing inserts/updates from your authenticated AI Agents / backend servers (using the SERVICE_ROLE key)
CREATE POLICY "Allow service role full access to blogs"
ON public.blogs FOR ALL
USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role full access to city_pages"
ON public.city_pages FOR ALL
USING (auth.role() = 'service_role');
