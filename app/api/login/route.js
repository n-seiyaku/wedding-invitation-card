import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

import {
    generateJti,
    setRefreshCookie,
    signAccessToken,
    signRefreshToken,
} from '@/app/lib/auth'
import { supabase } from '../supabaseConfig'

export async function POST(req) {
    const { username, password } = await req.json()

    if (!username || !password) {
        return NextResponse.json(
            { error: 'Tên đăng nhập và mật khẩu là bắt buộc' },
            { status: 400 }
        )
    }

    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('username', username)

    if (error || data.length == 0) {
        return NextResponse.json(
            { error: 'Sai tên đăng nhập hoặc mật khẩu' },
            { status: 401 }
        )
    }

    const ok = await bcrypt.compare(password, data[0].password)
    if (!ok) {
        return NextResponse.json(
            { error: 'Sai tên đăng nhập hoặc mật khẩu' },
            { status: 401 }
        )
    }

    const accessToken = signAccessToken(data[0])
    const jti = generateJti()
    const refreshToken = signRefreshToken(data[0], jti)

    await setRefreshCookie(refreshToken)
    return NextResponse.json({
        accessToken,
        tokenType: 'Bearer',
        expiresIn: process.env.ACCESS_EXPIRES || '15m',
    })
}
