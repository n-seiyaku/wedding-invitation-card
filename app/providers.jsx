'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import AuthProvider from './lib/AuthProvider'
import { DeviceProvider } from './lib/DeviceContext'

const Providers = ({ children }) => {
    return (
        <AuthProvider>
            <DeviceProvider>
                <ProgressProvider
                    height="4px"
                    color="#ff0033"
                    options={{ showSpinner: false }}
                    shallowRouting
                >
                    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                        {children}
                    </AppRouterCacheProvider>
                </ProgressProvider>
            </DeviceProvider>
        </AuthProvider>
    )
}

export default Providers
