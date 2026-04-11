import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const startsAt = searchParams.get('startsAt');
  if (!startsAt) return NextResponse.json({ showJoin: false });

  const start = new Date(startsAt).getTime();
  const now = Date.now();
  const diffMin = (start - now) / 60000;

  return NextResponse.json({ showJoin: diffMin <= 15, minutesToStart: Math.max(0, Math.floor(diffMin)) });
}
