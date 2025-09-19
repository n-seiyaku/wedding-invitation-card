'use client'

import React, { useLayoutEffect, useRef } from 'react'

export default function TopBar() {
    const ref = useRef(null)

    useLayoutEffect(() => {
        const el = ref.current
        if (!el) return

        const update = () => {
            const h = el.offsetHeight || 0
            document.documentElement.style.setProperty(
                '--top-bar-height',
                `${h}px`
            )
        }

        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        window.addEventListener('resize', update)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', update)
        }
    }, [])

    return (
        <div
            ref={ref}
            className="font-dancing-script bg-brand-100 fixed top-0 right-0 left-0 z-10 flex h-14 w-full items-center justify-center text-2xl"
        >
            T & D
        </div>
    )
}
