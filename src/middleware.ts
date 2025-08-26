import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { protectedRoutes, authRoutes } from '@/settings';



const intlMiddleware = createMiddleware(routing);
export default function middleware(req: NextRequest) {
    const res = intlMiddleware(req);

    const { pathname } = req.nextUrl;
    const token = req.cookies.get('token')?.value;

    // If trying to access a protected route without token → redirect to login
    if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    // If trying to access a public route while logged in → redirect to dashboard
    if (authRoutes.includes(pathname) && token) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res;
}
export const config = {
    // Match all pathnames except for
    // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};