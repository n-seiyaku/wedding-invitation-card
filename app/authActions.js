'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserByUsername, createSessionToken, AUTH_COOKIE } from './lib/auth'

export async function login(formData) {
    const username = formData.get('username')
    const password = formData.get('password')

    if (!username || !password) {
        redirect('/login?error=missing')
    }

    const user = await getUserByUsername(String(username))
    if (!user) {
        redirect('/login?error=invalid')
    }

    // NOTE: For production, store hashed passwords and verify securely (e.g., scrypt/bcrypt).
    const ok = String(user.password) === String(password)
    if (!ok) {
        redirect('/login?error=invalid')
    }

    const token = createSessionToken({ u: user.username, t: Date.now() })
    const cookieStore = await cookies()
    cookieStore.set(AUTH_COOKIE, token, {
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    redirect('/dashboard')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete(AUTH_COOKIE)
    redirect('/login')
}
