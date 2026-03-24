import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Use the service role key to bypass RLS for admin operations in Server Actions
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const isValidUrl = supabaseUrl.startsWith('https://');

export const supabaseAdmin = supabaseUrl && supabaseServiceKey && isValidUrl
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;
