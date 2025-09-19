import { login } from '../authActions'

export default async function LoginPage({ searchParams }) {
    const { error } = await searchParams
    return (
        <div style={{ maxWidth: 360 }}>
            <h1>Login</h1>
            {error && (
                <p style={{ color: 'red' }}>
                    {error === 'missing'
                        ? 'Vui lòng nhập đủ thông tin.'
                        : 'Sai username hoặc password.'}
                </p>
            )}
            <form action={login}>
                <div style={{ marginBottom: 8 }}>
                    <label>
                        Username
                        <input type="text" name="username" required />
                    </label>
                </div>
                <div style={{ marginBottom: 8 }}>
                    <label>
                        Password
                        <input type="password" name="password" required />
                    </label>
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
