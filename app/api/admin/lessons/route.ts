import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { requireAdminApi } from '@/lib/api-auth';
import { extractYouTubeVideoId } from '@/lib/utils';

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const body = await req.json();
  const youtube_video_id = extractYouTubeVideoId(body.youtubeUrlOrId);
  const payload = { course_id: body.course_id, title: body.title, youtube_video_id, published: !!body.published };

  const service = createSupabaseServiceClient();
  const { data, error } = await service.from('lessons').insert(payload).select('id, course_id, title, published').single();

  if (error) return NextResponse.json({ message: error.message }, { status: 500 });
  return NextResponse.json(data);
}
