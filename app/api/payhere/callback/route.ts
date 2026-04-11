import { NextResponse } from 'next/server';
import { createSupabaseServiceClient } from '@/lib/supabase-server';
import { md5 } from '@/lib/utils';

export async function POST(req: Request) {
  const form = await req.formData();

  const merchantId = String(form.get('merchant_id') ?? '');
  const orderId = String(form.get('order_id') ?? '');
  const payhereAmount = String(form.get('payhere_amount') ?? '');
  const payhereCurrency = String(form.get('payhere_currency') ?? 'LKR');
  const statusCode = String(form.get('status_code') ?? '');
  const md5sig = String(form.get('md5sig') ?? '');

  const localSig = md5(`${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${md5(process.env.PAYHERE_MERCHANT_SECRET || '')}`);

  if (md5sig !== localSig || statusCode !== '2') {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const service = createSupabaseServiceClient();
  await service.from('payments').upsert({ order_id: orderId, status: 'paid', gateway_payload: Object.fromEntries(form.entries()) });

  return NextResponse.json({ ok: true });
}
