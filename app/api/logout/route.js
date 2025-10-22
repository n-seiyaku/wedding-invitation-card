import { clearRefreshCookie } from '@/app/lib/auth'
import { NextResponse } from 'next/server'

export async function POST() {
    clearRefreshCookie()
    return NextResponse.json({ ok: true })
}
