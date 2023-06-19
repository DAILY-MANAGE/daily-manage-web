import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authHandler } from '../utils/authHandler'

export async function middleware(request: NextRequest) {
  const auth = new authHandler(request);

  if (request.url === '/' || request.nextUrl.pathname.startsWith('/login')) {

    const isLogged = await auth.hasAuthTokenInCookies();
    if (!isLogged) {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
    return NextResponse.redirect('/home');

  } else {

    if (request.nextUrl.pathname.startsWith('/dashboard')) {
      return NextResponse.rewrite(new URL('/dashboard/user', request.url))
    }

    return NextResponse.redirect(request.url);
  }
}

export const config = {
  matcher: ['/home', '/login', '/cadastro', '/dashboard/:path*'],
}
