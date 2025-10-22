'use client'

import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
} from '@mui/material'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/AuthProvider'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useProgress } from '@bprogress/next'

export default function Page() {
    const { login } = useAuth()
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [show, setShow] = useState(false)
    const [pending, setPending] = useState(false)
    const [error, setError] = useState('')
    const { start, stop } = useProgress()

    async function onSubmit(e) {
        e.preventDefault()
        setPending(true)
        setError('')
        try {
            start()
            await login(username, password)
            router.push('/dashboard')
        } catch (err) {
            const message = err?.message ?? 'Đăng nhập thất bại'
            setError(message)
        } finally {
            setPending(false)
            stop()
        }
    }

    const ERR = '#ec003f'
    const OK = '#507ab9'

    return (
        <div className="bg-brand-50 mx-auto flex min-h-2/5 w-[calc(100vw-48px)] flex-col items-center justify-center rounded-3xl lg:max-w-1/3">
            <h1 className="font-dancing-script text-brand-600 my-4 text-3xl">
                Login
            </h1>

            <form
                onSubmit={onSubmit}
                className="flex w-60 flex-col items-center justify-center"
            >
                <TextField
                    className="my-8"
                    label="Tên đăng nhập"
                    variant="outlined"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    value={username}
                    sx={{
                        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline':
                            { borderColor: error ? ERR : OK },
                        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                            { borderColor: error ? ERR : OK },
                        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                            {
                                borderColor: error ? ERR : OK,
                                borderWidth: 2,
                            },
                        '& .MuiInputLabel-root': { color: error ? ERR : OK },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: error ? ERR : OK,
                        },
                    }}
                    fullWidth
                />

                <FormControl variant="outlined" fullWidth>
                    <InputLabel
                        htmlFor="password"
                        sx={{
                            color: error ? ERR : OK,
                            '&.Mui-focused': { color: error ? ERR : OK },
                        }}
                    >
                        Mật khẩu
                    </InputLabel>
                    <OutlinedInput
                        id="password"
                        type={show ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        label="Mật khẩu"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: error ? ERR : OK,
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: error ? ERR : OK,
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: error ? ERR : OK,
                                borderWidth: 2,
                            },
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        show ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'
                                    }
                                    onClick={() => setShow((s) => !s)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {show ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        autoComplete="current-password"
                        required
                    />
                </FormControl>
                {error && (
                    <p className="text-sm text-rose-600" role="alert">
                        {error}
                    </p>
                )}

                <Button
                    className="bg-brand-500 font-roboto my-8"
                    variant="contained"
                    type="submit"
                    loading={pending}
                    fullWidth
                >
                    Login
                </Button>
            </form>
        </div>
    )
}
