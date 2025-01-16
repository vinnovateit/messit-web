import { MetadataRoute } from 'next';
 export const dynamic = 'force-static';
// https://github.com/vercel/next.js/discussions/73022

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Messit Web',
        short_name: 'Messit',
        description: 'Your mess menu on your fingertips by VinnovateIT',
        start_url: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: '48x48',
                type: 'image/x-icon',
            },
            {
                src: '/icons/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icons/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icons/maskable_icon_x384.png',
                sizes: '384x384',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        screenshots: [
            {
                src: '/screenshots/mobile1.jpg',
                sizes: '1080x1920',
                type: 'image/jpg',
            },
            {
                src: '/screenshots/mobile2.jpg',
                sizes: '1080x1920',
                type: 'image/jpg',
            },
            {
                src: '/screenshots/mobile3.jpg',
                sizes: '1080x1920',
                type: 'image/jpg',
            },
            {
                src: '/screenshots/mobile4.jpg',
                sizes: '1080x1920',
                type: 'image/jpg',
            },
        ]
    };
}
