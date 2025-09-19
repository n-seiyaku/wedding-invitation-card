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

export default function Page() {
    const [name, setName] = useState('')
    const [partnerChecked, setPartnerChecked] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        console.log(partnerChecked)
    }

    return (
        <div className="font-roboto text-brand-500 relative">
            <Image
                src={background}
                alt="Wedding photo"
                width={0}
                height={0}
                style={{
                    maxWidth: '100dvw',
                    height: 'auto',
                }}
                priority
            />
            <div className="bg-brand-50 absolute top-2 left-6 flex w-[calc(100%-48px)] flex-col items-center justify-center rounded-2xl">
                <div className="font-dancing-script mt-4 text-center text-2xl">
                    Anh Đào
                    <br />&<br />
                    Đắc Long
                </div>
                <div className="w-52">
                    <Image src={decoration} alt="flower" priority />
                </div>

                <FormGroup className="w-full px-6">
                    <TextField
                        className="text-brand-500"
                        label="Tên"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                // input
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#507ab9',
                                },
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#507ab9',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                    {
                                        borderColor: '#507ab9',
                                        borderWidth: 2,
                                    },
                            },
                            // label
                            '& .MuiInputLabel-root': { color: '#507ab9' },
                            '& .MuiInputLabel-root.Mui-focused': {
                                color: '#507ab9',
                            },
                        }}
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
                        label="+NT?"
                    />

                    <Button
                        className="mb-6"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Gửi
                    </Button>
                </FormGroup>
            </div>
        </div>
    )
}
