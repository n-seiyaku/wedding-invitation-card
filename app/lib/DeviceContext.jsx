'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const DeviceContext = createContext({ isMobile: false, deviceReady: false })

export function DeviceProvider({ children }) {
    const [isMobile, setIsMobile] = useState(false)
    const [deviceReady, setDeviceReady] = useState(false)

    useEffect(() => {
        const ua =
            typeof navigator === 'undefined'
                ? ''
                : navigator.userAgent.toLowerCase()

        const mobile =
            /iphone|ipod|ipad|android|blackberry|mini|windows\sce|palm/i.test(
                ua
            )
        setIsMobile(mobile)

        setDeviceReady(true)
    }, [])

    const value = useMemo(
        () => ({ isMobile, deviceReady }),
        [isMobile, deviceReady]
    )

    return (
        <DeviceContext.Provider value={value}>
            {children}
        </DeviceContext.Provider>
    )
}

export function useDevice() {
    return useContext(DeviceContext)
}
