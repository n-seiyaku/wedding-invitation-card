'use client'

import Image from 'next/image'
import flower from '@/public/src/assets/home_flower.png'
import { Button, CircularProgress } from '@mui/material'
import Link from 'next/link'
import { useState } from 'react'

export default function Page() {
    const [pending, setPending] = useState(false)

    return (
        <div className="bg-brand-100 relative flex h-dvh w-dvw flex-col items-center justify-center">
            {/* <div className="">
                <Image src={flower} alt="Flower" priority />
            </div> */}
            <Button
                LinkComponent={Link}
                href="/home"
                onClick={() => setPending(true)}
                className="mt-4"
                variant="contained"
                loading={pending}
            >
                Vào trang chính
            </Button>
        </div>
    )
}
