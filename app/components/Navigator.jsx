'use client'

import React, { useEffect, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home'
import MapIcon from '@mui/icons-material/Map'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import PersonIcon from '@mui/icons-material/Person'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import {
    HomeOutlined,
    MapOutlined,
    PersonOutline,
    PhotoCameraOutlined,
} from '@mui/icons-material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { label: 'Home', link: '/home', icon: [<HomeIcon />, <HomeOutlined />] },
    { label: 'Map', link: '/map', icon: [<MapIcon />, <MapOutlined />] },
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

    const handleChange = (e, newValue) => {
        setValue(newValue)
    }

    return (
        <Paper elevation={3} className="fixed right-0 bottom-0 left-0 z-50">
            <BottomNavigation
                sx={{
                    backgroundColor: '#DFF3FE',
                    borderTop: '1px solid rgb(229 231 235)',
                }}
                value={value}
                onChange={handleChange}
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
