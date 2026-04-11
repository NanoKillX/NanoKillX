import { NextResponse } from 'next/server';
import { md5 } from '@/lib/utils';

export async function POST(req: Request) {
  const body = await req.json();
  const merchantId = process.env.PAYHERE_MERCHANT_ID!;
  const merchantSecret = process.env.PAYHERE_MERCHANT_SECRET!;

  const amount = Number(body.amount).toFixed(2);
  const currency = body.currency ?? 'LKR';
  const orderId = body.orderId;

  const hash = md5(`${merchantId}${orderId}${amount}${currency}${md5(merchantSecret)}`);
  return NextResponse.json({ hash, merchantId, sandbox: process.env.PAYHERE_SANDBOX === 'true' });
}
