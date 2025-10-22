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
                markers: true,
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
    }, [])

    useGSAP(() => {}, [])

    return (
        <div className="text-white">
            <div>
                <div className="relative ml-auto max-w-4/5 lg:w-dvw">
                    <img
                        className="image-1"
                        src="/src/assets/wedding-photos/2.png"
                        alt="Photo 1"
                    />
                    <Image
                        className="decoration-animation absolute bottom-0 left-1/2 w-1/2 -translate-x-1/2 translate-y-1/2 scale-0"
                        src={decoration}
                        priority
                        alt="Decoration"
                    />
                </div>

                <div>
                    <section className="text-animation section-1 mx-6 mt-9">
                        <p className="story indent-fix mt-4 text-justify text-[12px] leading-relaxed tracking-wide">
                            Riêng Đào, tin, rất tin nha! Thỉnh thoảng quay qua
                            nhìn bạn chồng, Đào lại hỏi câu ngớ ngẩn: "Anh là
                            chồng em thật đấy à?". Cảm giác nhân duyên cuộc đời
                            Đào, sao kỳ lạ quá! Cho dù là, Đào đã từng rất mong
                            được lấy chồng gần nhà như vợ chồng em trai, rồi kết
                            hôn trên nền tảng sẵn có, và một đám cưới bất ngờ.
                            Nhưng chưa bao giờ Đào nghĩ vũ trụ có thể hồi đáp
                            Đào trọn vẹn đến thế, cũng như trong tưởng tượng
                            cũng không thể nào vẽ ra được hình dung về chồng
                            tương lai. Dẫu bóng dáng bạn chồng đã xuất hiện
                            trong tầm mắt Đào từ 20 năm trước.
                        </p>
                        <p className="story indent-fix mt-4 text-justify text-[12px] leading-relaxed tracking-wide">
                            Quay ngược những năm cấp ba một chút, Đào biết đến
                            bạn chồng thông qua người bạn lớp hàng xóm vì hay
                            thấy đi chơi chung. Còn bạn chồng thì dĩ nhiên không
                            biết Đào là ai, một cô gái hướng nội trầm tính. Rồi
                            vô tình, cả hai cùng tham gia chương trình về nguồn
                            mang tên ĐỒNG HÀNH, cựu học sinh quay lại trường cũ,
                            tư vấn hướng nghiệp cho các em. Tới giờ hai đứa vẫn
                            rất tâm đắc với nhân duyên kết nối từ cái tên, dù
                            rằng thời gian bên nhau cũng còn khá ngắn, nhưng nếu
                            mô tả gãy gọn, thì chắc là cảm giác ĐỒNG HÀNH.
                        </p>
                        <p className="story indent-fix mt-4 text-justify text-[12px] leading-relaxed tracking-wide">
                            Một lần, cũng lại vô tình, hai đứa kể nhau nghe về
                            những năm tháng mới bước chân ra đời. Để rồi, giữa
                            Sài Gòn xa hoa rộng lớn, người bạn cấp ba mà Đào gặp
                            lại ngày ấy hóa ra lại chính là chồng mình. Cũng lại
                            bất thình lình, đúng 10 năm trước, Đào quyết định
                            chuyển công tác về quê. Hai đứa gặp lại nhau trong
                            đám cưới người bạn, rồi thành bạn nhậu. Mãi về sau
                            khi bạn bè vun vào, nghĩ chuyện quen bạn nhậu là Đào
                            lại nổi hết cả da gà, vì ngoài mấy lon bia để cụng
                            với nhau ra, chắc gì có điểm để kết nối đâu. Nhắc
                            đến đây thì không biết nói bao nhiêu lời cảm ơn mới
                            đủ với những ông mai bà mối đã tích cực đẩy thuyền.
                            Cuộc đời Đào, đúng thật cần hết sức trân trọng hai
                            chữ NHÂN DUYÊN.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
