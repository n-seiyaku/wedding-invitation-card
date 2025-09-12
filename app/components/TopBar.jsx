import React from 'react'

export default function TopBar({ classAdded }) {
    return (
        <div
            className={`font-dancing-script text-brand-500 absolute top-96 h-14 w-full bg-[#dff3fe] text-center text-4xl leading-14 ${classAdded}`}
        >
            Anh Đào & Đắc Long
        </div>
    )
}
