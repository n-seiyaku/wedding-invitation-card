'use client'

import { useEffect, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import Image from 'next/image'
import img1 from '@/public/src/assets/wedding-photos/2.png'
import img2 from '@/public/src/assets/wedding-photos/3.png'
import decoration from '@/public/src/assets/decorations/flower-2.png'

export default function Page() {
    return (
        <div className="text-white">
            <div>
                <div className="relative ml-auto max-w-4/5">
                    <Image src={img1} alt="Photo 1" priority />
                    <Image
                        className="absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 translate-y-1/2"
                        src={decoration}
                        priority
                        alt="Decoration"
                    />
                </div>

                <div>
                    <section className="mx-6 mt-9">
                        <h1 className="-mb-1 text-[18px] font-bold tracking-widest">
                            THE FISRT WE MEET
                        </h1>
                        <time className="text-brand-500 text-[14px]">2019</time>
                        <p className="mt-4 text-justify indent-4 text-[12px] leading-relaxed tracking-wide">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Minus, officia quod voluptas sint vero fuga
                            deserunt consectetur? Necessitatibus fuga et animi!
                            Maiores vitae nam impedit, voluptate labore magnam
                            ut rem!
                        </p>

                        <p className="mt-4 text-justify indent-4 text-[12px] leading-relaxed tracking-wide">
                            Adipiscing vulputate platea pharetra et purus
                            ultricies. Aliquam et, amet, quam neque…
                        </p>
                    </section>
                </div>
            </div>

            <div>
                <div className="relative mt-10 max-w-4/5">
                    <Image src={img2} alt="Photo 2" priority />
                    <Image
                        className="absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 translate-y-1/2"
                        src={decoration}
                        alt="Decoration"
                        priority
                    />
                </div>

                <div className="mb-10">
                    <section className="mx-6 mt-9">
                        <h1 className="-mb-1 text-[18px] font-bold tracking-widest">
                            ENGAGEMENT
                        </h1>
                        <time className="text-brand-500 text-[14px]">2030</time>
                        <p className="mt-4 text-justify indent-4 text-[12px] leading-relaxed tracking-wide">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Minus, officia quod voluptas sint vero fuga
                            deserunt consectetur? Necessitatibus fuga et animi!
                            Maiores vitae nam impedit, voluptate labore magnam
                            ut rem!
                        </p>

                        <p className="mt-4 text-justify indent-4 text-[12px] leading-relaxed tracking-wide">
                            Adipiscing vulputate platea pharetra et purus
                            ultricies. Aliquam et, amet, quam neque…
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
