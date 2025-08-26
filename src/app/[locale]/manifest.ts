import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'E shark',
        short_name: 'Ziyara',
        description: 'A pharamcy system se',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon-196.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/favicon-196.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}