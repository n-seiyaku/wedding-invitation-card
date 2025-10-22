import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react'

const AuthContext = createContext(null)

export default function AuthProvider({ children }) {
    const [token, setToken] = useState(null)

    const refresh = useCallback(async () => {
        console.log('refresh token')
        const r = await fetch('/api/refresh-token', {
            method: 'POST',
            credentials: 'include',
        })
        if (!r.ok) throw new Error('Refresh failed')
        const { accessToken } = await r.json()
        setToken(accessToken)
        return accessToken
    }, [])

    const login = useCallback(async (username, password) => {
        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            })

            if (!res.ok) {
                let message = 'Login failed'
                try {
                    const errBody = await res.json()
                    console.log(errBody)
                    message = errBody?.error || errBody?.message || message
                } catch {}
                throw new Error(message)
            }

            const data = await res.json()
            setToken(data.accessToken)
        } catch (error) {
            throw error
        }
    }, [])

    const logout = useCallback(async () => {
        await fetch('/api/logout', { method: 'POST', credentials: 'include' })
        setToken(null)
    }, [])

    const authFetch = useCallback(
        async (input, init = {}) => {
            const headers = new Headers(init.headers || {})
            const hadToken = Boolean(token)
            if (hadToken) headers.set('Authorization', `Bearer ${token}`)
            const doFetch = () => fetch(input, { ...init, headers })

            let res = await doFetch()

            if (res.status === 401 && hadToken) {
                try {
                    const newTok = await refresh()
                    headers.set('Authorization', `Bearer ${newTok}`)
                    res = await doFetch()
                } catch {
                    setToken(null)
                }
            }
            return res
        },
        [token, refresh]
    )

    return (
        <AuthContext.Provider
            value={{ token, setToken, authFetch, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error('useAuth must be used within AuthProvider')
    return ctx
}
