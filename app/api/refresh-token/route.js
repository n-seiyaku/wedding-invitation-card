import {
    generateJti,
    setRefreshCookie,
    signAccessToken,
    signRefreshToken,
    verifyRefresh,
} from '@/app/lib/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { supabase } from '../supabaseConfig'

export async function POST() {
    const token = (await cookies()).get('refresh_token')?.value
    if (!token) {
        return NextResponse.json(
            { error: 'missing refresh token' },
            { status: 401 }
        )
    }

    try {
        const decoded = verifyRefresh(token)

        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('id', decoded.sub)

        if (data.length == 0 || error) {
            return NextResponse.json(
                { error: 'user not found' },
                { status: 401 }
            )
        }

        const newAccess = signAccessToken(data[0])
        const newRefresh = signRefreshToken(data[0], generateJti())
        await setRefreshCookie(newRefresh)

        return NextResponse.json({
            accessToken: newAccess,
            tokenType: 'Bearer',
            expiresIn: process.env.ACCESS_EXPIRES || '15m',
        })
    } catch (e) {
        return NextResponse.json(
            { error: 'invalid or expired refresh token' },
            { status: 401 }
        )
    }
}
