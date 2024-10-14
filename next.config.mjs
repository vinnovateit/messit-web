import withSerwistInit from "@serwist/next";
import { execSync } from 'child_process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    images: {
        unoptimized: true, // Disable image optimization - doesn't work with export
    },
    webpack: (config, { isServer }) => {
        // Run the json update script during build
        if (isServer) {
            console.log('Updating menu data...');
            try {
                execSync('node scripts/updateMenuData.js', { stdio: 'inherit' });
            } catch (error) {
                console.error('Failed to update menu data:', error);
                process.exit(1);
            }
        }
        return config;
    },
};

const withSerwist = withSerwistInit({
    swSrc: "src/app/sw.ts",
    swDest: "public/sw.js",
});

export default withSerwist(nextConfig);
