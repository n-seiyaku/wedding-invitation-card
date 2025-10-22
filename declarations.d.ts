declare module '*.png' {
    const src: string
    export default src
}

declare module '*.svg' {
    import type { ComponentType, SVGProps } from 'react'
    export const ReactComponent: ComponentType<SVGProps<SVGSVGElement>>
    const src: string
    export default src
}

declare module '*.webp' {
    const src: string
    export default src
}