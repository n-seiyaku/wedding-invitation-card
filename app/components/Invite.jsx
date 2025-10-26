'use client'

import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material'
import React, { useState } from 'react'

import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Image from 'next/image'
import decoration from '@/public/src/assets/decorations/flower-2.png'
import { supabase } from '../api/supabaseConfig'
import { useDevice } from '../lib/DeviceContext'

export default function Invite() {
    const [name, setName] = useState('')
    const [partnerChecked, setPartnerChecked] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [nameError, setNameError] = useState('')
    const [success, setSuccess] = useState(false) // ✅ trạng thái hiển thị animation
    const { isMobile } = useDevice()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setNameError('')

        if (!name.trim()) {
            setNameError('Hãy nhập tên')
            return
        }

        setLoading(true)

        try {
            const { error } = await supabase.from('information').insert({
                name: name,
                message: message,
                has_partner: partnerChecked,
                confirm: true,
            })

            if (error) {
                console.error('Error inserting invitation data:', error)
                alert('Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại.')
            } else {
                // ✅ reset form
                setName('')
                setMessage('')
                setPartnerChecked(false)

                // ✅ bật hiệu ứng thành công
                setSuccess(true)

                // ✅ ẩn hiệu ứng sau 3s (nếu muốn)
                setTimeout(() => setSuccess(false), 3000)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const sx = {
        '& .MuiOutlinedInput-root': {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#507ab9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#507ab9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#507ab9',
                borderWidth: 2,
            },
        },
        '& .MuiInputLabel-root': { color: '#507ab9' },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#507ab9',
        },
    }

    return (
        <div className="font-roboto text-brand-500 flex h-dvh -translate-y-10 flex-col items-center justify-center">
            <div className="bg-brand-50 relative flex w-[calc(100%-48px)] flex-col items-center justify-center rounded-2xl lg:max-w-1/3">
                {/* ✅ Hiển thị DotLottie khi thành công */}
                {success && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/80">
                        <DotLottieReact
                            src="/src/assets/success.lottie"
                            autoplay
                            loop={false}
                            style={{ width: 200, height: 200 }}
                        />
                    </div>
                )}

                <div className="font-dancing-script mt-4 text-center text-2xl">
                    Anh Đào
                    {isMobile && <br />} & {isMobile && <br />}Đắc Long
                </div>

                <div className="w-52">
                    <Image src={decoration} alt="flower" priority />
                </div>

                {/* ✅ Ẩn form khi đang hiển thị success */}
                {!success && (
                    <form className="w-full px-6" onSubmit={handleSubmit}>
                        <FormGroup>
                            <TextField
                                label="Tên"
                                variant="outlined"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={sx}
                                error={!!nameError}
                                helperText={nameError}
                                fullWidth
                                onFocus={() => setNameError('')}
                            />

                            <TextField
                                className="mt-6"
                                label="Nhắn gửi cho cô dâu chú rể"
                                variant="outlined"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={sx}
                                fullWidth
                            />

                            <FormControlLabel
                                className="my-4"
                                control={
                                    <Checkbox
                                        checked={partnerChecked}
                                        onChange={(e) =>
                                            setPartnerChecked(e.target.checked)
                                        }
                                    />
                                }
                                label="Dẫn bạn đi cùng chứ?"
                            />

                            <Button
                                className="mb-6"
                                variant="contained"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Đang gửi...' : 'Gửi'}
                            </Button>
                        </FormGroup>
                    </form>
                )}
            </div>
        </div>
    )
}
