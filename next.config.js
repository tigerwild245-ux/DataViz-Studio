/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // API routes configuration
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },

    // Environment variables
    env: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY,
        GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemini-pro',
    },
}

module.exports = nextConfig
