import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { requireAdminApi } from '@/lib/api-auth';

export async function GET() {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const service = createSupabaseServiceClient();
  const { data, error } = await service.from('courses').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const body = await req.json();
  const service = createSupabaseServiceClient();
  const { data, error } = await service.from('courses').insert(body).select('*').single();
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}
