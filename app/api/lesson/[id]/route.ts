import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const service = createSupabaseServiceClient();

  const { data: enrollment } = await service
    .from('enrollments')
    .select('id, status')
    .eq('student_id', user.id)
    .eq('course_id', params.id)
    .eq('status', 'paid')
    .maybeSingle();

  if (!enrollment) {
    return NextResponse.json({ message: 'Payment required' }, { status: 403 });
  }

  const { data: lesson } = await service
    .from('lessons')
    .select('youtube_video_id, published')
    .eq('course_id', params.id)
    .eq('published', true)
    .limit(1)
    .single();

  if (!lesson) return NextResponse.json({ message: 'Not found' }, { status: 404 });

  return NextResponse.json({ videoId: lesson.youtube_video_id });
}
