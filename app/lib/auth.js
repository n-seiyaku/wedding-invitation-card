import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET
const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || '15m'
const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || '7d'

export function signAccessToken(user) {
    const payload = { sub: user.id, username: user.username, role: user.role }
    return jwt.sign(payload, ACCESS_SECRET, {
        algorithm: 'HS256',
        expiresIn: ACCESS_EXPIRES,
    })
}

export function signRefreshToken(user, jti) {
    const payload = { sub: user.id, jti }
    return jwt.sign(payload, REFRESH_SECRET, {
        algorithm: 'HS256',
        expiresIn: REFRESH_EXPIRES,
    })
}

export function verifyAccess(token) {
    return jwt.verify(token, ACCESS_SECRET, { algorithms: ['HS256'] })
}

export function verifyRefresh(token) {
    return jwt.verify(token, REFRESH_SECRET, { algorithms: ['HS256'] })
}

export async function setRefreshCookie(token) {
    const cookieStore = await cookies()

    cookieStore.set('refresh_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/api/refresh-token',
        maxAge: 60 * 60 * 24 * 7,
    })
}

export async function clearRefreshCookie() {
    const cookieStore = await cookies()

    cookieStore.set('refresh_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        path: '/api/refresh-token',
        maxAge: 0,
    })
}

export function generateJti() {
    return crypto.randomUUID()
}
