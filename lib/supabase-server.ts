import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';

export function createSupabaseServerClient() {
  return createServerComponentClient({ cookies });
}

export function createSupabaseServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !key) {
    throw new Error('Supabase service credentials are missing.');
  }

  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
