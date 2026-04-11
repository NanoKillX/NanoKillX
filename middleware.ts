import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard') || pathname.startsWith('/classroom') || pathname.startsWith('/parent')) {
    const hasSession = req.cookies.get('sb-access-token') || req.cookies.get('sb:token');
    if (!hasSession) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/classroom/:path*', '/parent/:path*']
};
