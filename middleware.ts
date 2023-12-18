import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'


// Ensure the middleware is only called for relevant paths.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const { supabase, response } = createClient(req)


  await supabase.auth.getSession()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // if user is signed in and the current path is / redirect the user to /account
  // if (user && req.nextUrl.pathname === '/auth/login') {
  //   return NextResponse.redirect(new URL('/account', req.url))
  // }

  // if user is not signed in and the current path is not / redirect the user to /
  // if (!user && req.nextUrl.pathname !== '/') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  return res
}
