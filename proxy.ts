import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Define paths that require authentication
  const authPaths = ['/admin', '/admin/enquiries', '/admin/settings'];
  
  // Check if path requires auth
  const requiresAuth = authPaths.some(path => pathname.startsWith(path));
  
  if (!requiresAuth) {
    return NextResponse.next();
  }
  
  // Check for auth cookie
  const authCookie = request.cookies.get('hpl_admin_auth');
  
  if (!authCookie) {
    // Redirect to login if not authenticated
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.search = request.nextUrl.search; // Preserve query params
    return NextResponse.redirect(url);
  }
  
  // Optional: Verify cookie is valid (could call server action here)
  // For now, we trust the cookie presence
  
  return NextResponse.next();
}

// Configure matcher to only run on relevant paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};