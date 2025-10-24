'use client'

import { use, useEffect, useState } from 'react'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import Image from 'next/image'
import img1 from '@/public/src/assets/wedding-photos/2.png'
import img2 from '@/public/src/assets/wedding-photos/3.png'
import decoration from '@/public/src/assets/decorations/flower-2.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useDevice } from '../lib/DeviceContext'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Story() {
    const { isMobile, deviceReady } = useDevice()

    useGSAP(() => {
        if (!deviceReady) return

        console.log(isMobile)
        const image1Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.image-1',
                start: isMobile ? 'top center' : 'top 80%',
                markers: true,
            },
        })

        image1Timeline
            .from('.image-1', {
                xPercent: 100,
                autoAlpha: 0,
                duration: 1,
            })
            .fromTo(
                '.image-1 + .decoration-animation',
                {
                    rotate: -30,
                },
                {
                    scale: 1,
                    rotate: 0,
                    ease: `back.out(${1.5 + 2 * 0.25})`,
                }
            )

        if (!isMobile) {
            gsap.from('.background-image', {
                scrollTrigger: {
                    trigger: '.background-image',
                    start: 'top 80%',
                    markers: true,
                    toggleActions: 'play none none reset',
                },
                xPercent: -100,
                autoAlpha: 0,
                duration: 1,
            })
        }

        document.fonts?.ready?.then(() => {
            const splitLines = new SplitText('.reveal-text', {
                type: 'lines',
                linesClass: 'line',
            })
            const inner = new SplitText(splitLines.lines, {
                type: 'words',
                wordsClass: 'line-inner',
            })

            // ảnh
            gsap.set(['.image-1', '.image-2', '.image-3'], { autoAlpha: 0 })
            gsap.set('.image-1', { autoAlpha: 1 }) // ảnh đầu tiên hiển thị

            // Timeline cuộn + pin
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.story-section',
                    start: 'top top',
                    end: '+=400%', // đủ dài cho 3 đoạn + các khoảng nghỉ
                    scrub: true,
                    pin: true, // pin ngay trên timeline này
                    pinSpacing: false, // để tạo không gian, tránh rời pin sớm
                    anticipatePin: 1,
                    markers: false,
                },
            })

            // reveal story-1
            tl.from('.story-1 .line-inner', {
                yPercent: 100,
                ease: 'power4.out',
                skewY: 7,
                stagger: { amount: 0.3 },
            })

            // giữ 1 nhịp
            tl.to({}, { duration: 0.15, ease: 'none' })

            // hide story-1
            tl.to('.story-1 .line-inner', {
                yPercent: 100,
                ease: 'power2.out',
            })

            //anh 1
            tl.to(
                '.image-1',
                {
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                'switchToImage2'
            )

            tl.to(
                '.image-2',
                {
                    autoAlpha: 1,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                'switchToImage2'
            )

            // reveal story-2
            tl.from(
                '.story-2 .line-inner',
                {
                    yPercent: 100,
                    ease: 'power4.out',
                    skewY: 7,
                    stagger: { amount: 0.3 },
                },
                'switchToImage2'
            )

            // giữ 1 nhịp
            tl.to({}, { duration: 0.15, ease: 'none' })

            // hide story-2
            tl.to('.story-2 .line-inner', {
                yPercent: 100,
                ease: 'power2.out',
            })

            tl.to(
                '.image-2',
                {
                    autoAlpha: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                },
                'switchToImage3'
            )

            tl.to(
                '.image-3',
                {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: 'power2.out',
                },
                'switchToImage3'
            )

            // reveal story-3
            tl.from(
                '.story-3 .line-inner',
                {
                    yPercent: 100,
                    ease: 'power4.out',
                    skewY: 7,
                    stagger: { amount: 0.3 },
                },
                'switchToImage3'
            )

            tl.to({}, { duration: 0.25, ease: 'none' })

            ScrollTrigger.refresh()
        })
    }, [deviceReady, isMobile])

    return (
        <div className="mt-24 text-white">
            <div className="story-section h-[500dvh] lg:relative">
                <div className="ml-auto sm:w-dvw lg:absolute lg:right-0 lg:w-full">
                    <div className="relative w-full lg:h-[80dvh]">
                        <img
                            className="image-1 lg:absolute lg:top-0 lg:right-0 lg:h-full"
                            src="/src/assets/wedding-photos/9.webp"
                            alt="Photo 1"
                        />
                        <img
                            className="image-2 absolute top-0 right-0 h-full"
                            src="/src/assets/wedding-photos/31.webp"
                            alt="Photo 1"
                        />
                        <img
                            className="image-3 absolute top-0 right-0 h-full"
                            src="/src/assets/wedding-photos/19.webp"
                            alt="Photo 1"
                        />
                    </div>

                    <div className="background-image lg:absolute lg:bottom-[-15dvh] lg:left-[5dvw] lg:z-10 lg:h-[54dvh] lg:w-1/2 lg:bg-[#e6eef5]">
                        <section className="text-animation section-1 relative mx-8">
                            <p className="story-1 reveal-text absolute mt-4 text-justify text-[clamp(12px,4vw,16px)] leading-relaxed tracking-wide lg:text-[#324a5f]">
                                Riêng Đào, tin, rất tin nha! Thỉnh thoảng quay
                                qua nhìn bạn chồng, Đào lại hỏi câu ngớ ngẩn:
                                "Anh là chồng em thật đấy à?". Cảm giác nhân
                                duyên cuộc đời Đào, sao kỳ lạ quá! Cho dù là,
                                Đào đã từng rất mong được lấy chồng gần nhà như
                                vợ chồng em trai, rồi kết hôn trên nền tảng sẵn
                                có, và một đám cưới bất ngờ. Nhưng chưa bao giờ
                                Đào nghĩ vũ trụ có thể hồi đáp Đào trọn vẹn đến
                                thế, cũng như trong tưởng tượng cũng không thể
                                nào vẽ ra được hình dung về chồng tương lai. Dẫu
                                bóng dáng bạn chồng đã xuất hiện trong tầm mắt
                                Đào từ 20 năm trước.
                            </p>
                            <p className="story-2 reveal-text absolute mt-4 text-justify text-[clamp(12px,4vw,16px)] leading-relaxed tracking-wide lg:text-[#324a5f]">
                                Quay ngược những năm cấp ba một chút, Đào biết
                                đến bạn chồng thông qua người bạn lớp hàng xóm
                                vì hay thấy đi chơi chung. Còn bạn chồng thì dĩ
                                nhiên không biết Đào là ai, một cô gái hướng nội
                                trầm tính. Rồi vô tình, cả hai cùng tham gia
                                chương trình về nguồn mang tên ĐỒNG HÀNH, cựu
                                học sinh quay lại trường cũ, tư vấn hướng nghiệp
                                cho các em. Tới giờ hai đứa vẫn rất tâm đắc với
                                nhân duyên kết nối từ cái tên, dù rằng thời gian
                                bên nhau cũng còn khá ngắn, nhưng nếu mô tả gãy
                                gọn, thì chắc là cảm giác ĐỒNG HÀNH.
                            </p>
                            <p className="story-3 reveal-text absolute mt-4 text-justify text-[clamp(12px,4vw,16px)] leading-relaxed tracking-wide lg:text-[#324a5f]">
                                Một lần, cũng lại vô tình, hai đứa kể nhau nghe
                                về những năm tháng mới bước chân ra đời. Để rồi,
                                giữa Sài Gòn xa hoa rộng lớn, người bạn cấp ba
                                mà Đào gặp lại ngày ấy hóa ra lại chính là chồng
                                mình. Cũng lại bất thình lình, đúng 10 năm
                                trước, Đào quyết định chuyển công tác về quê.
                                Hai đứa gặp lại nhau trong đám cưới người bạn,
                                rồi thành bạn nhậu. Mãi về sau khi bạn bè vun
                                vào, nghĩ chuyện quen bạn nhậu là Đào lại nổi
                                hết cả da gà, vì ngoài mấy lon bia để cụng với
                                nhau ra, chắc gì có điểm để kết nối đâu. Nhắc
                                đến đây thì không biết nói bao nhiêu lời cảm ơn
                                mới đủ với những ông mai bà mối đã tích cực đẩy
                                thuyền. Cuộc đời Đào, đúng thật cần hết sức trân
                                trọng hai chữ NHÂN DUYÊN.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}
