import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
// Provide warnings if keys are missing from .env
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Ensure database table names are documented for the AI Agents:
// TABLE 1: 'blogs'
// Columns: slug (text, primary key), title (text), excerpt (text), content (text), author (text), date (date), targetNiche (text), targetCity (text), linkedUrl (text)

// TABLE 2: 'city_pages'
// Columns: niche_slug (text), city_slug (text), heroHeadline, heroSub, infoHeading, infoParagraph, feat1Title, feat1Desc, feat2Title, feat2Desc, targetAudienceHeading, landscapeHeading, landscapeParagraph1, landscapeParagraph2, blogs (json array)
