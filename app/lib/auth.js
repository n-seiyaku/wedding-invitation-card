import crypto from 'crypto'
import { sql } from '../api/neonConfig'

const AUTH_COOKIE = 'auth'
const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-secret-change-me'

export async function getUserByUsername(username) {
    const rows =
        await sql`SELECT username, password FROM users WHERE username = ${username} LIMIT 1`
    return rows?.[0] || null
}

function base64url(input) {
    return Buffer.from(input)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

export function createSessionToken(payload) {
    const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
    const body = base64url(JSON.stringify(payload))
    const data = `${header}.${body}`
    const sig = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(data)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
    return `${data}.${sig}`
}

export function verifySessionToken(token) {
    if (!token || typeof token !== 'string' || !token.includes('.')) return null
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, body, sig] = parts
    const data = `${header}.${body}`
    const expected = crypto
        .createHmac('sha256', AUTH_SECRET)
        .update(data)
        .digest('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
    if (sig !== expected) return null
    try {
        const json = Buffer.from(
            body.replace(/-/g, '+').replace(/_/g, '/'),
            'base64'
        ).toString('utf8')
        return JSON.parse(json)
    } catch {
        return null
    }
}

export { AUTH_COOKIE }
