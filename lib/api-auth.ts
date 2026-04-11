import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createSupabaseServiceClient } from './supabase-server';

export async function requireAdminApi() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { ok: false as const, status: 401 };

  const service = createSupabaseServiceClient();
  const { data } = await service.from('users').select('role').eq('id', user.id).single();

  if (!data || data.role !== 'admin') {
    return { ok: false as const, status: 403 };
  }

  return { ok: true as const, user };
}
