'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import background from '@/public/src/assets/wedding-photos/1.webp'
import flower from '@/public/src/assets/decorations/flower-2.png'
import ring from '@/public/src/assets/decorations/ring-2.svg'
import { Button } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LocationPin from '@mui/icons-material/LocationPin'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/SplitText'
import TextPlugin from 'gsap/TextPlugin'
import { useDevice } from '../lib/DeviceContext'

gsap.registerPlugin(ScrollTrigger, SplitText, TextPlugin)
export default function Home() {
    const heroRef = useRef(null)
    const invitesRef = useRef(null)
    const { isMobile } = useDevice()

    useGSAP(() => {
        if (!heroRef.current || !invitesRef.current) return

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: heroRef.current, // phần hero
                start: 'top top', // khi đỉnh hero chạm đỉnh viewport
                endTrigger: invitesRef.current, // kết thúc pin khi .invites...
                end: 'top +=600', // ...chạm đỉnh viewport
                pin: heroRef.current, // pin hero
            })
        }, heroRef)

        gsap.to('.background', {
            scrollTrigger: {
                trigger: heroRef.current,
                start: 'top top',
                end: '+=400', // hoặc `end: () => "+=" + heroRef.current.offsetHeight`
                scrub: true,
            },
            objectPosition: '60% 30%',
            height: '240px',
            ease: 'power1.inOut',
        })

        document.fonts.ready.then(() => {
            const text = new SplitText('.title-animation', {
                type: 'chars, words',
                charsClass: 'char',
                wordsClass: 'text',
            })

            gsap.to(text.chars, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top center',
                },
                y: 0,
                stagger: 0.02,
                delay: 0.1,
                duration: 0.1,
                ease: 'power1.inOut',
            })
        })

        const inviteCard1 = gsap.timeline({
            scrollTrigger: {
                trigger: '.float-animation.invite-1',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
            stagger: 0.2,
        })

        inviteCard1
            .fromTo(
                '.float-animation.invite-1',
                {
                    scale: 0,
                },
                {
                    scale: 1,
                    ease: `back.out(${1.5 + 2 * 0.25})`,
                }
            )
            .fromTo(
                '.invite-1 .animation',
                {
                    rotate: -30,
                },
                {
                    scale: 1,
                    rotate: 0,
                    ease: `back.out(${1.5 + 2 * 0.25})`,
                }
            )

        const inviteCard2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.float-animation.invite-2',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
            stagger: 0.2,
        })

        inviteCard2
            .fromTo(
                '.float-animation.invite-2',
                {
                    scale: 0,
                },
                {
                    scale: 1,
                    ease: `back.out(${1.5 + 2 * 0.25})`,
                }
            )
            .fromTo(
                '.invite-2 .animation',
                {
                    rotate: -30,
                },
                {
                    scale: 1,
                    rotate: 0,
                    ease: `back.out(${1.5 + 2 * 0.25})`,
                }
            )

        return () => ctx.revert()
    }, [])

    return (
        <div>
            <div
                ref={heroRef}
                className="hero relative flex h-dvh w-screen items-center justify-center"
            >
                <img
                    className="background lg:object-[60%_19%]"
                    src="/src/assets/wedding-photos/1.webp"
                    alt="Background"
                    style={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                    }}
                />
                <div className="title-animation font-caladea absolute top-12 w-full text-center text-2xl text-white">
                    THE WEDDING
                </div>
                <div
                    style={{ color: '#adc8de', mixBlendMode: 'difference' }}
                    className="font-caladea absolute top-32 w-full text-center text-2xl tracking-[0.3em] text-white"
                >
                    ANH ĐÀO & ĐẮC LONG
                </div>
            </div>

            <div
                ref={invitesRef}
                className="invites -mt-32 lg:-mt-5 lg:flex lg:justify-center"
            >
                {/* Invite Card 1 */}
                <div className="float-animation invite-1 relative mt-20">
                    <div className="absolute left-1/2 w-52 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            className="animation scale-0"
                            src={flower}
                            alt="Decoration"
                        />
                    </div>
                    <div className="bg-brand-100 mx-12 flex items-center justify-center">
                        <div className="m-6 flex w-[calc(100%-48px)] items-center justify-center border border-[#BB9096]">
                            <div className="flex w-[calc(100%-24px)] flex-col items-center">
                                <Image className="mt-7" src={ring} alt="Ring" />
                                <div className="font-dancing-script text-center text-4xl text-[#965A00]">
                                    Tiệc cưới nhà gái
                                </div>

                                <div className="mt-6 text-[14px]">
                                    <div className="ml-3">
                                        <CalendarTodayIcon
                                            className=""
                                            fontSize="inherit"
                                        />
                                        <span className="ml-2">
                                            Thứ 7, ngày 8 tháng 11 năm 2025
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <AccessTimeIcon
                                            className=""
                                            fontSize="inherit"
                                        />
                                        <span className="ml-2">17 giờ</span>
                                    </div>
                                    <div className="ml-3">
                                        <LocationPin
                                            className=""
                                            fontSize="inherit"
                                        />
                                        <span className="ml-2 inline text-justify">
                                            Đội 5, Thôn Đông Hiệp, Xã Hàm Tân,
                                            Tỉnh Lâm Đồng
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    target="_blank"
                                    href="https://maps.app.goo.gl/fvUWXpsFa2Jyfc6MA"
                                    className="bg-brand-500 font-roboto my-6 w-[calc(100%-48px)] font-black text-white"
                                    variant="contained"
                                >
                                    Mở Map
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Invite Card 2 */}
                <div className="float-animation invite-2 relative mt-20">
                    <div className="absolute left-1/2 w-52 -translate-x-1/2 -translate-y-1/2">
                        <Image
                            className="animation scale-0"
                            src={flower}
                            alt="Decoration"
                        />
                    </div>
                    <div className="bg-brand-100 mx-12 flex items-center justify-center">
                        <div className="m-6 flex w-[calc(100%-48px)] items-center justify-center border border-[#BB9096]">
                            <div className="flex w-[calc(100%-24px)] flex-col items-center">
                                <Image className="mt-7" src={ring} alt="Ring" />
                                <div className="font-dancing-script text-center text-4xl text-[#965A00]">
                                    Tiệc cưới nhà trai
                                </div>

                                <div className="mt-6 text-[14px]">
                                    <div className="ml-3">
                                        <CalendarTodayIcon fontSize="inherit" />
                                        <span className="ml-2">
                                            Chủ Nhật, Ngày 9 Tháng 11 Năm 2025
                                        </span>
                                    </div>
                                    <div className="ml-3">
                                        <AccessTimeIcon fontSize="inherit" />
                                        <span className="ml-2">16 gi? 30</span>
                                    </div>
                                    <div className="ml-3">
                                        <LocationPin fontSize="inherit" />
                                        <span className="ml-2 inline text-justify">
                                            Số 70, Đườnng Ngô Quyền, Phường La
                                            Gi, Tỉnh Lâm Đồng
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    target="_blank"
                                    href="https://maps.app.goo.gl/fvUWXpsFa2Jyfc6MA"
                                    className="bg-brand-500 font-roboto my-6 w-[calc(100%-48px)] font-black text-white"
                                    variant="contained"
                                >
                                    Mở Map
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
