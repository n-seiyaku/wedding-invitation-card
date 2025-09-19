'use client'

import { useEffect, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'

export default function Page() {
    const images = [
        {
            src: '/src/assets/wedding-photos/1.png',
            width: '426',
            height: '223',
        },
        {
            src: '/src/assets/wedding-photos/2.png',
            width: '362',
            height: '255',
        },
        {
            src: '/src/assets/wedding-photos/3.png',
            width: '362',
            height: '222',
        },
        {
            src: '/src/assets/wedding-photos/4.jpg',
            width: '4160',
            height: '6240',
        },
        {
            src: '/src/assets/wedding-photos/6.jpg',
            width: '4084',
            height: '5105',
        },
        {
            src: '/src/assets/wedding-photos/5.jpg',
            width: '2060',
            height: '2747',
        },
        {
            src: '/src/assets/wedding-photos/1.png',
            width: '426',
            height: '223',
        },
        {
            src: '/src/assets/wedding-photos/2.png',
            width: '362',
            height: '255',
        },
        {
            src: '/src/assets/wedding-photos/3.png',
            width: '362',
            height: '222',
        },
        {
            src: '/src/assets/wedding-photos/4.jpg',
            width: '4160',
            height: '6240',
        },
        {
            src: '/src/assets/wedding-photos/6.jpg',
            width: '4084',
            height: '5105',
        },
        {
            src: '/src/assets/wedding-photos/5.jpg',
            width: '2060',
            height: '2747',
        },
    ]

    useEffect(() => {
        const lightbox = new PhotoSwipeLightbox({
            gallery: '#my-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        })

        lightbox.init()

        return () => lightbox.destroy()
    }, [])

    return (
        <div className="flex flex-wrap gap-4" id="my-gallery">
            {images.map((image, i) => (
                <a
                    className="flex-auto"
                    href={image.src}
                    data-pswp-width={image.width}
                    data-pswp-height={image.height}
                    target="_blank"
                    key={image + i}
                >
                    <img
                        className="h-[200px] w-auto min-w-full object-cover"
                        src={image.src}
                        alt=""
                    />
                </a>
            ))}
        </div>
    )
}
