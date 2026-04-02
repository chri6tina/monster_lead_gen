import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load variables directly from your Next.js local environment
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("🔴 Missing Supabase credentials in .env.local. Database Service offline.");
}

// Ensure it doesn't crash if keys are missing during build phase
export const botDb = (supabaseUrl && supabaseUrl.startsWith('http') && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : {
      from: () => ({ insert: () => ({ error: 'Database Offline' }), upsert: () => ({ error: 'Database Offline' }) })
    } as any;

/**
 * Inserts a fully generated Blog Post into the Supabase database.
 * This makes it instantly live on the Next.js website.
 */
export async function pushBlogToProduction(blogData: {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  targetNiche: string;
  targetCity: string;
}) {
  const { error } = await botDb
    .from('blogs')
    .insert([blogData]);

  if (error) {
    throw new Error(`Supabase Insert Failed: ${error.message}`);
  }

  return true;
}

/**
 * Inserts or Updates a massive, heavy-content City Page into Supabase.
 * We use an upsert so that the Bot can come back "in the future and update more information" as requested.
 */
export async function pushCityPageToProduction(cityData: Record<string, any>) {
  const { error } = await botDb
    .from('city_pages')
    .upsert(cityData, { onConflict: 'niche_slug, city_slug' });

  if (error) {
    throw new Error(`Supabase Upsert Failed for City Page: ${error.message}`);
  }

  return true;
}
