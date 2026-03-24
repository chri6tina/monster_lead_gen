import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If accessing /admin but not /admin/login
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const adminToken = request.cookies.get('admin_token')?.value;

    // Check if the token is present and valid
    if (adminToken !== process.env.ADMIN_SECRET_TOKEN && adminToken !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Auto redirect /admin to /admin/blogs, or let them see /admin Dashboard root
  // We will build a dashboard at /admin, so no redirect needed here. Let it pass.

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
