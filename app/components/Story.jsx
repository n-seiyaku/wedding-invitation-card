'use client'

import { useEffect, useRef } from 'react'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { doc } from 'prettier'
import gsap from 'gsap'
import { useDevice } from '../lib/DeviceContext'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Story() {
    const { isMobile, deviceReady } = useDevice()

    useGSAP(() => {
        if (!deviceReady) return

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
            gsap.set('.image-1', { autoAlpha: 1 })

            // Timeline cuộn + pin
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.story-section',
                    start: isMobile ? 'top end' : 'top top',
                    end: '+=400%', // đủ dài cho 3 đoạn + các khoảng nghỉ
                    scrub: true,
                    pin: true, // pin ngay trên timeline này
                    pinSpacing: false, // để tạo không gian, tránh rời pin sớm
                    anticipatePin: 1,
                    markers: true,
                },
            })

            if (!isMobile) {
                tl.from(
                    '.background-image',
                    {
                        xPercent: -100,
                        autoAlpha: 0,
                        duration: 0.6,
                        ease: 'power2.out',
                    },
                    0
                )
            }

            tl.from(
                '.image-1',
                {
                    xPercent: 100,
                    autoAlpha: 0,
                    duration: 0.6,
                    ease: 'power2.out',

                    overwrite: 'auto',
                },
                0
            )

            // reveal story-1
            tl.from(
                '.title .line-inner',
                {
                    yPercent: 100,
                    ease: 'power4.out',
                    skewY: 7,
                    stagger: { amount: 0.3 },
                    duration: 0.6,
                },
                0
            )

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

    const story = [
        'Riêng Đào, tin, rất tin nha! Thỉnh thoảng quay qua nhìn bạn chồng, Đào lại hỏi câu ngớ ngẩn: "Anh là chồng em thật đấy à?". Cảm giác nhân duyên cuộc đời Đào, sao kỳ lạ quá! Cho dù là, Đào đã từng rất mong được lấy chồng gần nhà như vợ chồng em trai, rồi kết hôn trên nền tảng sẵn có, và một đám cưới bất ngờ. Nhưng chưa bao giờ Đào nghĩ vũ trụ có thể hồi đáp Đào trọn vẹn đến thế, cũng như trong tưởng tượng cũng không thể nào vẽ ra được hình dung về chồng tương lai. Dẫu bóng dáng bạn chồng đã xuất hiện trong tầm mắt Đào từ 20 năm trước.',
        'Quay ngược những năm cấp ba một chút, Đào biết đến bạn chồng thông qua người bạn lớp hàng xóm vì hay thấy đi chơi chung. Còn bạn chồng thì dĩ nhiên không biết Đào là ai, một cô gái hướng nội trầm tính. Rồi vô tình, cả hai cùng tham gia chương trình về nguồn mang tên ĐỒNG HÀNH, cựu học sinh quay lại trường cũ, tư vấn hướng nghiệp cho các em. Tới giờ hai đứa vẫn rất tâm đắc với nhân duyên kết nối từ cái tên, dù rằng thời gian bên nhau cũng còn khá ngắn, nhưng nếu mô tả gãy gọn, thì chắc là cảm giác ĐỒNG HÀNH.',
        'Một lần, cũng lại vô tình, hai đứa kể nhau nghe về những năm tháng mới bước chân ra đời. Để rồi, giữa Sài Gòn xa hoa rộng lớn, người bạn cấp ba mà Đào gặp lại ngày ấy hóa ra lại chính là chồng mình. Cũng lại bất thình lình, đúng 10 năm trước, Đào quyết định chuyển công tác về quê. Hai đứa gặp lại nhau trong đám cưới người bạn, rồi thành bạn nhậu. Mãi về sau khi bạn bè vun vào, nghĩ chuyện quen bạn nhậu là Đào lại nổi hết cả da gà, vì ngoài mấy lon bia để cụng với nhau ra, chắc gì có điểm để kết nối đâu. Nhắc đến đây thì không biết nói bao nhiêu lời cảm ơn mới đủ với những ông mai bà mối đã tích cực đẩy thuyền. Cuộc đời Đào, đúng thật cần hết sức trân trọng hai chữ NHÂN DUYÊN.',
    ]

    const imageSrcs = [
        '/src/assets/wedding-photos/9.webp',
        '/src/assets/wedding-photos/31.webp',
        '/src/assets/wedding-photos/19.webp',
    ]

    if (!deviceReady) return null

    return (
        <div className="mt-24 text-white">
            <div className="story-section h-[500dvh] lg:relative">
                <div className="ml-auto sm:w-dvw lg:absolute lg:right-0 lg:w-full">
                    <div className="relative w-full lg:h-[72dvh] xl:h-[80dvh]">
                        {imageSrcs.map((src, index) => (
                            <img
                                key={index}
                                className={`image-item image-${index + 1} absolute lg:top-0 lg:right-0 lg:h-full`}
                                src={src}
                                alt={`Photo ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div
                        className={`background-image absolute flex h-dvh w-dvw flex-col items-center ${!isMobile && 'justify-center'} rounded-xl lg:bottom-[-15dvh] lg:left-[5dvw] lg:z-10 lg:h-[60dvh] lg:w-[45dvw] lg:bg-[#e6eef5] xl:h-[45dvh] xl:w-[40dvw]`}
                    >
                        {isMobile && (
                            <div className="w-full">
                                <img
                                    className="invisible"
                                    src="/src/assets/wedding-photos/9.webp"
                                    alt="Dummy for spacing"
                                />
                            </div>
                        )}

                        <div
                            className={`${!isMobile && 'absolute'} title reveal-text font-dancing-script text-brand-500 mt-5 text-2xl lg:-top-[30%] lg:mt-0 lg:text-3xl xl:-top-[60%] xl:text-4xl`}
                        >
                            Bạn có tin vào Luật hấp dẫn không?
                        </div>

                        {isMobile ? (
                            <div className="relative h-full w-dvw">
                                {story.map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className={`story-${index + 1} reveal-text absolute top-5 mb-3 px-8 text-justify text-[clamp(12px,4vw,16px)] leading-relaxed tracking-wide lg:text-[#324a5f]`}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            story.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className={`story-${index + 1} reveal-text absolute mb-3 px-8 text-justify text-[clamp(12px,4vw,16px)] leading-relaxed tracking-wide lg:text-[#324a5f]`}
                                >
                                    {paragraph}
                                </p>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
