'use client'

import React, { useEffect } from 'react'
import { animate, onScroll, svg, utils } from 'animejs'
import { images } from '@/public/src/assets/dogs/index'
import Image from 'next/image'
import { Button } from '@mui/material'

export default function Page() {
    useEffect(() => {
        const items = Array.from(document.querySelectorAll('.image'))
        if (items.length === 0) return

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        animate(entry.target, {
                            opacity: 1,
                            duration: 800,
                            easing: 'easeOutQuad',
                        })
                    } else {
                        animate(entry.target, {
                            opacity: 0,
                            duration: 800,
                            easing: 'easeOutQuad',
                        })
                    }
                })
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        )

        items.forEach((el) => io.observe(el))
        return () => io.disconnect()
    }, [])

    const handleClick = (e) => {
        animate(e.currentTarget, {
            scale: 2,
            duration: 200,
            direction: 'alternate',
            easing: 'easeInOutQuad',
        })
    }

    const moveAnimation = () => {
        animate('.square', {
            ...svg.createMotionPath('path'),
            scale: { to: 5 },
            rotate: { to: 360, ease: 'linear' },
            ease: 'inOut', // ease applied between each keyframes if no ease defined
            playbackEase: 'ouIn(5)', // ease applied accross all keyframes
        })
    }

    return (
        <div className="scroll-container">
            {/* <div className="grid w-full grid-cols-3 gap-6 px-6">
                {images.map((src, i) => (
                    <Image
                        onClick={handleClick}
                        key={`a-${i}-${src.src ?? i}`}
                        className="image h-auto w-full object-cover opacity-0"
                        alt={`Dog ${i}`}
                        src={src}
                        priority
                    />
                ))}
            </div> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
                <g>
                    <title>Layer 1</title>
                    <path
                        d="m178.33333,203.33333c0,2 1.5695,4.133 3,8c2.32739,6.29152 3.42113,11.06236 5,23c1.46596,11.08382 4.52528,21.08443 6,27.99998c1.51831,7.12003 3.2935,13.88138 6,21c3.37143,8.86755 8.42056,20.55362 18,30c7.56903,7.4639 16.5056,14.72824 28,22c10.58888,6.69891 35.86482,13.99594 46.99998,15c21.9111,1.97571 33.76694,-1.82037 43,-4c6.8819,-1.6246 15.06989,-3.43393 23,-10c6.01578,-4.98102 12.1629,-11.70248 19,-19c6.3035,-6.728 15.86929,-14.39972 26,-30c8.78189,-13.52325 14.36887,-26.76471 20,-35.99998c5.35989,-8.79044 9.09409,-13.95387 12,-20c6.20233,-12.90469 11.68909,-23.46381 17,-31c4.64426,-6.59021 9,-13 11,-15l1,-2l1,-3l2,-4"
                        id="svg_1"
                        stroke="#000"
                        fill="none"
                    />
                </g>
            </svg>

            <div className="medium row">
                <div className="square" data-x="170"></div>
            </div>

            <Button
                className="absolute top-24"
                onClick={moveAnimation}
                variant="contained"
            >
                Move
            </Button>

            {/* <div className="grid w-full grid-cols-3 gap-6 px-6">
                {images.map((src, i) => (
                    <Image
                        onClick={handleClick}
                        key={`b-${i}-${src.src ?? i}`}
                        className="image h-auto w-full object-cover opacity-0"
                        alt={`Dog ${i}`}
                        src={src}
                        priority
                    />
                ))}
            </div>

            <div className="grid w-full grid-cols-3 gap-6 px-6">
                {images.map((src, i) => (
                    <Image
                        onClick={handleClick}
                        key={`c-${i}-${src.src ?? i}`}
                        className="image h-auto w-full object-cover opacity-0"
                        alt={`Dog ${i}`}
                        src={src}
                        priority
                    />
                ))}
            </div> */}
        </div>
    )
}
