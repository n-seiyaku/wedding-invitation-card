// Navigator.jsx
'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import HomeIcon from '@mui/icons-material/Home'
import MapIcon from '@mui/icons-material/Map'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import PersonIcon from '@mui/icons-material/Person'
import {
    HomeOutlined,
    MapOutlined,
    PersonOutline,
    PhotoCameraOutlined,
} from '@mui/icons-material'

const navItems = [
    { label: 'Home', link: '/home', icon: [<HomeIcon />, <HomeOutlined />] },
    { label: 'Story', link: '/story', icon: [<MapIcon />, <MapOutlined />] },
    {
        label: 'Album',
        link: '/album',
        icon: [<PhotoCameraIcon />, <PhotoCameraOutlined />],
    },
    {
        label: 'Profile',
        link: '/invite',
        icon: [<PersonIcon />, <PersonOutline />],
    },
]

export default function Navigator() {
    const pathname = usePathname()
    const [value, setValue] = useState(pathname)
    const navRef = useRef(null)

    useLayoutEffect(() => {
        const el = navRef.current
        if (!el) return

        const update = () => {
            const h = el.offsetHeight || 0
            // set 2 biến: chiều cao thật và kèm safe-area cho iOS
            document.documentElement.style.setProperty(
                '--bottom-nav-height',
                `${h}px`
            )
            document.documentElement.style.setProperty(
                '--bottom-nav-safe',
                `calc(${h}px + env(safe-area-inset-bottom, 0px))`
            )
        }

        update()
        const ro = new ResizeObserver(update)
        ro.observe(el)
        window.addEventListener('resize', update)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', update)
        }
    }, [])

    return (
        <Paper
            ref={navRef}
            elevation={3}
            className="fixed right-0 bottom-0 left-0 z-50"
            sx={{
                backgroundColor: '#DFF3FE',
                borderTop: '1px solid rgb(229 231 235)',
                pb: 'env(safe-area-inset-bottom, 0px)',
            }}
        >
            <BottomNavigation
                value={value}
                onChange={(_, nv) => setValue(nv)}
                sx={{ backgroundColor: 'transparent' }}
            >
                {navItems.map((item) => (
                    <BottomNavigationAction
                        LinkComponent={Link}
                        href={item.link}
                        key={item.label}
                        label={item.label}
                        icon={value === item.link ? item.icon[0] : item.icon[1]}
                        value={item.link}
                        sx={{
                            color: '#507AB9',
                            '& .MuiSvgIcon-root': { fontSize: 24 },
                            '& .MuiBottomNavigationAction-label': {
                                fontSize: '0.75rem',
                            },
                        }}
                    />
                ))}
            </BottomNavigation>
        </Paper>
    )
}
