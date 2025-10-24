'use client'

import Image from 'next/image'
import flower from '@/public/src/assets/decorations/flower-1.png'
import ring from '@/public/src/assets/decorations/ring-1.svg'
import { Button } from '@mui/material'
import Link from 'next/link'
import Start from './components/Start'
import Home from './components/Home'
import Story from './components/Story'
import Album from './components/Album'
import Invite from './components/Invite'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useEffect, useState } from 'react'
import TextPlugin from 'gsap/TextPlugin'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, TextPlugin, ScrollToPlugin)

export default function Page() {
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const done = () => setReady(true)
        if (document.readyState === 'complete') done()
        else window.addEventListener('load', done)
        return () => window.removeEventListener('load', done)
    }, [])

    useGSAP(() => {
        if (!ready) return

        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wapper',
            content: '#smooth-content',
            smooth: 2,
            smoothTouch: 0.2,
        })
    }, [ready])

    return (
        <div id="smooth-wapper" className="relative">
            {!ready && (
                <div className="absolute z-10 h-dvh w-dvw bg-black"></div>
            )}

            <div id="smooth-content">
                <Home />
                <Story />
                <Album />
                <Invite />
            </div>
        </div>
    )
}
