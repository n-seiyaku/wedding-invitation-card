/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [
        'local-origin.dev',
        '*.local-origin.dev',
        '192.168.100.91',
    ],
}

export default nextConfig
