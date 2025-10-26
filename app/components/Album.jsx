'use client'

import 'yet-another-react-lightbox/styles.css'

import { Box, Paper, Skeleton } from '@mui/material'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import { Draggable } from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import { Masonry } from '@mui/lab'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { styled } from '@mui/material/styles'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(Draggable, InertiaPlugin)

const STORAGE_PREFIX = 'pre-weddings'

// Lightbox chỉ render ở client
const Lightbox = dynamic(() => import('yet-another-react-lightbox'), {
    ssr: false,
})

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: 12,
}))

export default function Album() {
    const [images, setImages] = useState([]) // [{ path, url, name, width?, height? }]
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    // TÁCH state
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)

    const containerRef = useRef(null)

    const getImages = async () => {
        try {
            const res = await fetch(`/api/images?prefix=${STORAGE_PREFIX}`)
            const payload = await res.json().catch(() => ({}))
            if (!res.ok)
                throw new Error(
                    payload.supabaseError || payload.message || 'Fetch failed'
                )
            setImages(payload.images ?? [])
        } catch (e) {
            setError(e.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    const skeletons = Array.from({ length: 6 })

    // Memo hóa slides để không đổi reference vô cớ
    const slides = useMemo(
        () =>
            (images || []).map((img) => ({
                src: img.url,
                alt: img.name || 'image',
                width: img.width,
                height: img.height,
            })),
        [images]
    )

    const handleOpenAt = (i) => {
        setIndex(i)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useGSAP(
        (context) => {
            const elements = context.selector('.album-image-animation')
            if (!elements.length) return

            const observer = new IntersectionObserver((entries, obs) => {
                const targets = entries
                    .filter((entry) => entry.isIntersecting)
                    .map((entry) => entry.target)

                if (!targets.length) return

                gsap.from(targets, {
                    opacity: 0,
                    stagger: 0.2,
                    onComplete: () => {
                        targets.forEach((target) => obs.unobserve(target))
                    },
                })
            })

            elements.forEach((element) => observer.observe(element))

            return () => observer.disconnect()
        },
        { scope: containerRef, dependencies: [images] }
    )

    if (error) return <Box sx={{ p: 2 }}>Lỗi tải ảnh: {error}</Box>

    return (
        <>
            <Box
                ref={containerRef}
                sx={{ width: '100%', minHeight: 393, marginTop: '150px' }}
            >
                <Masonry
                    columns={{ xs: 2, sm: 4 }}
                    spacing={2}
                    sx={{ alignContent: 'center', mx: 'auto' }}
                >
                    {images.map((image, i) => (
                        <Item key={image.path}>
                            <button
                                type="button"
                                onClick={() => handleOpenAt(i)}
                                className="block w-full focus:outline-none"
                                aria-label={`Open ${image.name || 'image'} in lightbox`}
                            >
                                <img
                                    src={image.url}
                                    alt={image.name || ''}
                                    className="album-image-animation w-full rounded-xl"
                                    style={{
                                        willChange: 'opacity, transform',
                                    }}
                                />
                            </button>
                        </Item>
                    ))}
                </Masonry>

                {/* Luôn mount Lightbox; điều khiển bằng open/index */}
            </Box>

            <Lightbox
                open={open}
                index={index}
                close={handleClose}
                slides={slides}
                carousel={{ finite: false }}
                controller={{ closeOnBackdropClick: true }}
                animation={{ fade: 300, swipe: 400 }}
            />
        </>
    )
}
