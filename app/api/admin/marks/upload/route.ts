import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { requireAdminApi } from '@/lib/api-auth';

interface Row {
  Index_No: string;
  Exam_ID: string;
  Marks: number;
}

export async function POST(req: Request) {
  const auth = await requireAdminApi();
  if (!auth.ok) return NextResponse.json({ message: 'Forbidden' }, { status: auth.status });
  const formData = await req.formData();
  const file = formData.get('file');
  const sendSms = formData.get('sendSms') === 'true';

  if (!(file instanceof File)) {
    return NextResponse.json({ message: 'Invalid file' }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Row>(sheet);

  const errors: Array<{ row: number; message: string }> = [];

  rows.forEach((row, index) => {
    if (!row.Index_No || !row.Exam_ID || Number.isNaN(Number(row.Marks))) {
      errors.push({ row: index + 2, message: 'Missing required fields' });
    }
  });

  if (errors.length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const service = createSupabaseServiceClient();

  const payload = rows.map((row) => ({
    index_no: row.Index_No,
    exam_id: row.Exam_ID,
    marks: Number(row.Marks)
  }));

  const { error } = await service.from('marks').upsert(payload, { onConflict: 'index_no,exam_id' });
  if (error) return NextResponse.json({ message: error.message }, { status: 500 });

  for (const examId of [...new Set(rows.map((r) => r.Exam_ID))]) {
    const { data: examRows } = await service.from('marks').select('id, marks').eq('exam_id', examId).order('marks', { ascending: false });
    if (examRows) {
      await Promise.all(
        examRows.map((item, index) => service.from('marks').update({ rank: index + 1 }).eq('id', item.id))
      );
    }
  }

  if (sendSms) {
    // fire-and-forget notification hook; implement queue/retry in production
  }

  return NextResponse.json({ success: true, count: rows.length });
}
