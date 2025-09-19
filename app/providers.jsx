'use client'

import { ProgressProvider } from '@bprogress/next/app'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'

const Providers = ({ children }) => {
    return (
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
    )
}

export default Providers
