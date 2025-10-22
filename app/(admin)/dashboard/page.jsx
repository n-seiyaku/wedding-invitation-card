'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

export default function ProtectedPage() {
    useGSAP(() => {
        gsap.set('svg', { autoAlpha: 1 })

        gsap.timeline({
            scrollTrigger: {
                trigger: 'svg',
                start: 'top top',
                end: '+=1000px',
                pin: true,
                scrub: true,
            },
            defaults: { duration: 1, ease: 'none' },
        })
            .set('.data', {
                rotation: -90,
                transformOrigin: 'center',
                drawSVG: '0',
            })
            .to('.data01', { drawSVG: '75%', duration: 3, ease: 'none' })
            .set('.data02', { drawSVG: '75%' })
            .to('.data02', { drawSVG: '100%', duration: 1, ease: 'none' })
    }, [])

    return (
        <div>
            <svg className="invisible" viewBox="0 0 300 200">
                <circle
                    className="data02 data fill-none stroke-[25]"
                    cx="150"
                    cy="55"
                    r="40"
                    stroke="#134813"
                />

                <circle
                    className="data01 data fill-none stroke-[25]"
                    cx="150"
                    cy="55"
                    r="40"
                    stroke="green"
                />
            </svg>
        </div>
    )
}
