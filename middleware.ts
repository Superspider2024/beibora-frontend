// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Extract token from cookies (adjust 'beibora_token' to match your backend auth cookie)
  const token = request.cookies.get('beibora_token')?.value;
  
  // Define routes that require strict authentication
  const protectedRoutes = ['/marketplace', '/orders', '/admin', '/profile'];
  const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // If hitting a protected route without a token, brutally redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If already logged in and trying to hit login/signup, redirect to the dashboard
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && token) {
    return NextResponse.redirect(new URL('/marketplace', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};