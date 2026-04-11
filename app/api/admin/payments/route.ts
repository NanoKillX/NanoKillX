import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { requireAdminApi } from '@/lib/api-auth';

export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const service = createSupabaseServiceClient();
  const { data, error } = await service.from('payments').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}
