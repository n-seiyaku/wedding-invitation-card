'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import background from '@/public/src/assets/wedding-photos/background-invite.png'
import decoration from '@/public/src/assets/decorations/flower-2.png'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField,
} from '@mui/material'
import { supabase } from '../api/supabaseConfig'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { useDevice } from '../lib/DeviceContext'

export default function Invite() {
    const [name, setName] = useState('')
    const [partnerChecked, setPartnerChecked] = useState(false)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [nameError, setNameError] = useState('')
    const { isMobile } = useDevice()

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(name)
        console.log(partnerChecked)

        // Reset lỗi trước
        setNameError('')

        // Kiểm tra validation
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
                setName('')
                setMessage('')
                setPartnerChecked(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const sx = {
        '& .MuiOutlinedInput-root': {
            // input
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#507ab9',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#507ab9',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'currentColor',
                borderWidth: 2,
            },
        },
        // label
        '& .MuiInputLabel-root': { color: '#507ab9' },
        '& .MuiInputLabel-root.Mui-focused': {
            color: '#507ab9',
        },
    }

    return (
        <div className="font-roboto text-brand-500 flex h-dvh translate-y-[-40px] flex-col items-center justify-center">
            <div className="bg-brand-50 flex w-[calc(100%-48px)] flex-col items-center justify-center rounded-2xl lg:max-w-1/3">
                <div className="font-dancing-script mt-4 text-center text-2xl">
                    Anh Đào
                    {isMobile && <br />} & {isMobile && <br />}
                    Đắc Long
                </div>
                <div className="w-52">
                    <Image src={decoration} alt="flower" priority />
                </div>

                <form className="w-full px-6" onSubmit={handleSubmit}>
                    <FormGroup>
                        <TextField
                            className="text-brand-500"
                            label="Tên"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={sx}
                            error={!!nameError}
                            helperText={nameError}
                            fullWidth
                        />

                        <TextField
                            className="text-brand-500 mt-6"
                            label="Nhắn gửi cho cô dâu chú rể"
                            variant="outlined"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            sx={sx}
                            fullWidth
                        />

                        <FormControlLabel
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
                            loading={loading}
                        >
                            Gửi
                        </Button>
                    </FormGroup>
                </form>
            </div>
        </div>
    )
}
