'use client'

import React from 'react'
import Image from 'next/image'
import background from '@/public/src/assets/wedding-photos/1.png'
import flower from '@/public/src/assets/decorations/flower-2.png'
import ring from '@/public/src/assets/decorations/ring-2.svg'
import { Button } from '@mui/material'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import { LocationPin } from '@mui/icons-material'

export default function Page() {
    return (
        <div className="pb-20">
            <div className="relative w-screen">
                <Image
                    src={background}
                    alt="Background"
                    priority
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                />
                <div className="font-caladea absolute top-12 w-full text-center text-2xl text-white">
                    THE WEDDING
                </div>
                <div className="font-caladea absolute top-32 w-full text-center text-2xl tracking-[0.3em] text-white">
                    ANH ĐÀO & ĐẮC LONG
                </div>
            </div>
            <div className="relative mt-20">
                <div className="absolute left-1/2 w-52 -translate-x-1/2 -translate-y-1/2">
                    <Image src={flower} alt="Decoration" />
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
                                    <CalendarTodayIcon fontSize="inherit" />
                                    <span className="ml-2">
                                        Thứ 7, ngày 11 tháng 10 năm 2025
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <AccessTimeIcon fontSize="inherit" />
                                    <span className="ml-2">11 giờ</span>
                                </div>
                                <div className="ml-3">
                                    <LocationPin fontSize="inherit" />
                                    <span className="ml-2 inline text-justify">
                                        Hàm Tân Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit. Nihil
                                        ipsa, aliquid autem maxime numquam
                                        exercitationem mollitia assumenda
                                        voluptatem iste fuga inventore nemo unde
                                        suscipit nisi. Voluptatum optio et
                                        blanditiis quis!
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

            <div className="relative mt-20">
                <div className="absolute left-1/2 w-52 -translate-x-1/2 -translate-y-1/2">
                    <Image src={flower} alt="Decoration" />
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
                                        Thứ 7, ngày 11 tháng 10 năm 2025
                                    </span>
                                </div>
                                <div className="ml-3">
                                    <AccessTimeIcon fontSize="inherit" />
                                    <span className="ml-2">11 giờ</span>
                                </div>
                                <div className="ml-3">
                                    <LocationPin fontSize="inherit" />
                                    <span className="ml-2 inline text-justify">
                                        Hàm Tân Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit. Nihil
                                        ipsa, aliquid autem maxime numquam
                                        exercitationem mollitia assumenda
                                        voluptatem iste fuga inventore nemo unde
                                        suscipit nisi. Voluptatum optio et
                                        blanditiis quis!
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
    )
}
