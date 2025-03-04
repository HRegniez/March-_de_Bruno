import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default async function middleware(req: NextRequest) {
    if (!req.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.next()
    }

    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })

    try {
        const { data: { session } } = await supabase.auth.getSession()

        if (!session) {
            return NextResponse.redirect(new URL('/login', req.url))
        }

        return res
    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.redirect(new URL('/login', req.url))
    }
}

export const config = {
    matcher: '/dashboard/:path*'
} 