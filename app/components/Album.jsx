'use client'

import { useEffect, useRef, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Draggable } from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import { Box, Paper, Skeleton } from '@mui/material'
import { Masonry } from '@mui/lab'
import { styled } from '@mui/material/styles'
import Image from 'next/image'

const STORAGE_PREFIX = 'pre-weddings'

gsap.registerPlugin(Draggable, InertiaPlugin)

export default function Album() {
    const [images, setImages] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const containerRef = useRef(null)

    const getImages = async () => {
        try {
            const response = await fetch(`/api/images?prefix=${STORAGE_PREFIX}`)
            const payload = await response.json().catch(() => ({}))
            if (!response.ok)
                throw new Error(
                    payload.supabaseError || payload.message || 'Fetch failed'
                )

            const files = payload.images ?? []
            setImages(files)
            setLoading(false)
        } catch (err) {
            setError(err.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getImages()
    }, [])

    // useEffect(() => {
    //     console.log(images)
    //     if (!images.length) {
    //         return
    //     }

    //     const lightbox = new PhotoSwipeLightbox({
    //         gallery: '#my-gallery',
    //         children: 'a',
    //         pswpModule: () => import('photoswipe'),
    //     })

    //     lightbox.init()

    //     return () => lightbox.destroy()
    // }, [images])

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

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(0.5),
        textAlign: 'center',
        color: (theme.vars || theme).palette.text.secondary,
        ...theme.applyStyles('dark', {
            backgroundColor: '#1A2027',
        }),
    }))

    const skeletons = Array.from({ length: 4 })

    return (
        <Box ref={containerRef} sx={{ width: '100%', minHeight: 393 }}>
            <Masonry
                columns={{ xs: 2, sm: 4 }}
                spacing={2}
                sx={{ alignContent: 'center', mx: 'auto' }}
            >
                {loading
                    ? skeletons.map((_, index) => (
                          <Skeleton
                              key={index}
                              variant="rectangular"
                              className="min-h-[33vh] rounded-2xl"
                          />
                      ))
                    : images.map((image) => (
                          <Item key={image.path} className="rounded-xl">
                              <Box
                                  component="img"
                                  src={image.url}
                                  alt={image.name}
                                  className="album-image-animation w-full rounded-xl"
                              />
                          </Item>
                      ))}
            </Masonry>
        </Box>
    )
}
