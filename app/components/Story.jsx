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

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Story() {
    useGSAP(() => {
        const image1Timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '.image-1',
                start: 'top 80%',
                // markers: true,
            },
        })

        image1Timeline
            .from('.image-1', {
                x: 200,
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

        //     const image2Timeline = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: '.image-2',
        //             start: 'top 80%',
        //             markers: true,
        //         },
        //     })

        //     image2Timeline
        //         .from('.image-2', {
        //             x: -200,
        //             autoAlpha: 0,
        //             duration: 1,
        //         })
        //         .fromTo(
        //             '.image-2 + .decoration-animation',
        //             {
        //                 rotate: -30,
        //             },
        //             {
        //                 scale: 1,
        //                 rotate: 0,
        //                 ease: `back.out(${1.5 + 2 * 0.25})`,
        //             }
        //         )

        //     document.fonts.ready.then(() => {
        //         const story1 = SplitText.create('.section-1.text-animation', {
        //             type: 'chars, words',
        //         })

        //         gsap.from(story1.chars, {
        //             yPercent: 'random([-100, 100])',
        //             autoAlpha: 0,
        //             stagger: 0.005,
        //             scrollTrigger: {
        //                 trigger: '.section-1.text-animation',
        //                 start: 'top 80%',
        //                 markers: true,
        //             },
        //         })

        //         const story2 = SplitText.create('.section-2.text-animation', {
        //             type: 'chars, words',
        //         })

        //         gsap.from(story2.chars, {
        //             yPercent: 'random([-100, 100])',
        //             autoAlpha: 0,
        //             stagger: 0.005,
        //             scrollTrigger: {
        //                 trigger: '.section-2.text-animation',
        //                 start: 'top 80%',
        //                 markers: true,
        //             },
        //         })
        //     })

        // const story = document.querySelector('.story-section')

        // ScrollTrigger.create({
        //     trigger: story,
        //     start: 'top 60%', // khi phần đầu thẻ chạm 60% viewport
        //     end: 'bottom 40%', // khi phần cuối thẻ còn trong khung nhìn 40%
        //     onEnter: (self) => {
        //         gsap.to(window, {
        //             scrollTo: { y: self.start, offsetY: 0 }, // tự cuộn tới vị trí bắt đầu thẻ
        //             duration: 0.6,
        //             ease: 'power2.out',
        //         })
        //     },
        //     onEnterBack: (self) => {
        //         gsap.to(window, {
        //             scrollTo: { y: self.start, offsetY: 0 },
        //             duration: 0.6,
        //             ease: 'power2.out',
        //         })
        //     },
        //     markers: false,
        // })]

        /* ScrollTrigger.create({
            trigger: '.story-section',
            start: 'top top',
            end: 'bottom bottom',
            pin: true,
            pinSpacing: false,
        })

        document.fonts.ready.then(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.story-section',
                    start: 'top top',
                    end: '+=400%',
                    toggleActions: 'play none none reset',
                    markers: true,
                    scrub: true,
                },
            })

            const splitLines = new SplitText('.reveal-text', {
                type: 'lines',
                linesClass: 'line',
            })

            const inner = new SplitText(splitLines.lines, {
                type: 'words',
                wordsClass: 'line-inner',
            })

            // tl.set(splitLines.lines, { overflow: 'hidden' })
            // tl.set(inner.words,{  yPercent: 100 })

            tl.from('.story-1 .line-inner', {
                yPercent: 100,
                ease: 'power4.out',
                delay: 1,
                skewY: 7,
                stagger: {
                    amount: 0.3,
                },
            })

            const HOLD_DISTANCE = 100 // px
            const SCROLL_DISTANCE = 600 // quãng bạn đang dùng cho hiệu ứng chính
            const TOTAL_DISTANCE = SCROLL_DISTANCE + HOLD_DISTANCE
            tl.to(
                {},
                {
                    duration: HOLD_DISTANCE / TOTAL_DISTANCE, // tỉ lệ của khoảng chờ so với toàn timeline
                    ease: 'none',
                }
            )

            tl.to('.story-1 .line-inner', {
                yPercent: 100,
                ease: 'power2.out',
            })

            tl.from('.story-2 .line-inner', {
                yPercent: 100,
                ease: 'power4.out',
                delay: 1,
                skewY: 7,
                stagger: {
                    amount: 0.3,
                },
            })

            tl.to(
                '.story-2 .line-inner',
                {
                    yPercent: 100,
                    ease: 'power2.out',
                },
                '+=0.5'
            )

            tl.from(
                '.story-3 .line-inner',
                {
                    yPercent: 100,
                    ease: 'power4.out',
                    delay: 1,
                    skewY: 7,
                    stagger: {
                        amount: 0.3,
                    },
                },
                '+=0.5'
            )

            tl.to(
                {},
                {
                    duration: 1 / 2, // tỉ lệ của khoảng chờ so với toàn timeline
                    ease: 'none',
                }
            )
        }) */

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

            // (tùy chọn) preload ảnh để tránh nháy
            // ;['.image-2', '.image-3'].forEach((sel) => {
            //     const el = document.querySelector(sel)
            //     if (el) {
            //         const pre = new Image()
            //         pre.src = el.getAttribute('src')
            //     }
            // })

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

            // reveal story-3
            tl.from('.story-3 .line-inner', {
                yPercent: 100,
                ease: 'power4.out',
                skewY: 7,
                stagger: { amount: 0.3 },
            })

            tl.to({}, { duration: 0.25, ease: 'none' })

            ScrollTrigger.refresh()
        })
    }, [])

    return (
        <div className="text-white">
            <div className="story-section h-[500dvh] lg:relative">
                <div className="relative ml-auto lg:absolute lg:right-0 lg:w-full">
                    <div className="relative lg:h-[80dvh] lg:w-full">
                        <img
                            className="image-1 absolute top-0 right-0 h-full"
                            src="/src/assets/wedding-photos/9.webp"
                            alt="Photo 1"
                        />
                        {/* <Image
                            className="decoration-animation absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 translate-y-1/2 scale-0"
                            src={decoration}
                            priority
                            alt="Decoration"
                        /> */}
                        <img
                            className="image-2 absolute top-0 right-0 h-full"
                            src="/src/assets/wedding-photos/31.webp"
                            alt="Photo 1"
                        />
                        <img
                            className="image-3 absolute top-0 right-0 h-full"
                            src="/src/assets/wedding-photos/9.webp"
                            alt="Photo 1"
                        />
                    </div>

                    <div className="lg:absolute lg:bottom-[-15dvh] lg:left-[5dvw] lg:z-10 lg:h-[54dvh] lg:w-1/2 lg:bg-[#e6eef5]">
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
