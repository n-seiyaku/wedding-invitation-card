'use client'

import Image from 'next/image'
import flower from '@/public/src/assets/decorations/flower-1.png'
import ring from '@/public/src/assets/decorations/ring-1.svg'
import { Button } from '@mui/material'
import { useGSAP } from '@gsap/react'
import { useEffect } from 'react'

export default function Start({ setReady, setShowLoader, ready }) {
    return (
        <div className="js-loader bg-brand-100 text-brand-500 fixed inset-0 z-[9999] flex h-dvh w-dvw grow flex-col items-center justify-center">
            <div className="wedding-text font-caladea absolute top-12 w-full text-center text-2xl">
                THE WEDDING
            </div>
            <div className="relative mt-16">
                <Image id="flower" src={flower} alt="Flower" priority />
                <div className="text font-dancing-script absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 text-center text-4xl">
                    <div className="flex flex-col">
                        <div className="delete-it">Hoàng&nbsp;Vũ</div>
                        <div>Anh&nbsp;Đào</div>
                    </div>
                    <Image
                        className="mr-7 ml-6"
                        src={ring}
                        alt="Ring"
                        style={{ width: 'auto', height: 'auto' }}
                    />
                    <div className="flex flex-col">
                        <div className="delete-it">Nguyễn</div>
                        <div>Đắc&nbsp;Long</div>
                    </div>
                </div>
                {ready ? (
                    <Button
                        onClick={() => {
                            setShowLoader(false)
                        }}
                        variant="contained"
                    >
                        Mở thiệp cưới
                    </Button>
                ) : (
                    <div>Loading</div>
                )}
            </div>
        </div>
    )
}
