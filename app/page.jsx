'use client'

import Image from 'next/image'
import flower from '@/public/src/assets/decorations/flower-1.png'
import ring from '@/public/src/assets/decorations/ring-1.svg'
import { Button } from '@mui/material'
import { useState } from 'react'
import { animate } from 'animejs'
import { useRouter } from 'next/navigation'

export default function Page() {
    const [pending, setPending] = useState(false)
    const router = useRouter()

    const handleClick = async () => {
        // setPending(true)
        // await animate('#flower', {
        //     scale: 0,
        //     rotate: {
        //         to: '.75turn',
        //         ease: 'inOutQuad',
        //     },
        //     duration: 2000,
        // })
        // setPending(false)
        router.push('/home')
    }

    return (
        <div className="bg-brand-100 text-brand-500 relative flex h-dvh w-dvw flex-col items-center justify-center">
            <div className="font-caladea absolute top-12 w-full text-center text-2xl">
                THE WEDDING
            </div>
            <div className="relative">
                <Image id="flower" src={flower} alt="Flower" priority />
                <div className="font-dancing-script absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 text-center text-4xl">
                    <div>
                        <span>
                            Hoàng&nbsp;Vũ
                            <br />
                            Anh&nbsp;Đào
                        </span>
                    </div>
                    <Image className="mr-7 ml-6" src={ring} alt="Ring" />
                    <div>
                        <span>
                            Nguyễn
                            <br />
                            Đắc&nbsp;Long
                        </span>
                    </div>
                </div>
            </div>
            <Button
                onClick={handleClick}
                className="bg-brand-500 mt-4"
                variant="contained"
                loading={pending}
            >
                Mở thiệp mời
            </Button>
        </div>
    )
}
