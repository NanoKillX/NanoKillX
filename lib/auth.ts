import { redirect } from 'next/navigation';
import { createSupabaseServerClient, createSupabaseServiceClient } from './supabase-server';
import { AppUser, UserRole } from './types';

export async function requireUser() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function requireRole(role: UserRole | UserRole[]) {
  const user = await requireUser();
  const service = createSupabaseServiceClient();
  const { data } = await service.from('users').select('*').eq('id', user.id).single<AppUser>();

  const expected = Array.isArray(role) ? role : [role];
  if (!data || !expected.includes(data.role)) {
    redirect('/dashboard');
  }

  return data;
}
