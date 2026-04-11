import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { requireAdminApi } from '@/lib/api-auth';

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const body = await req.json();
  const service = createSupabaseServiceClient();

  const { data: exam, error } = await service.from('exams').insert({
    course_id: body.course_id,
    title: body.title,
    duration_minutes: body.duration_minutes,
    published: !!body.published
  }).select('*').single();

  if (error || !exam) return NextResponse.json({ message: error?.message || 'Failed' }, { status: 500 });

  if (Array.isArray(body.questions) && body.questions.length) {
    const questions = body.questions.map((q: any) => ({ ...q, exam_id: exam.id }));
    await service.from('questions').insert(questions);
  }

  return NextResponse.json(exam);
}
