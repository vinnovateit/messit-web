import withSerwistInit from "@serwist/next";
import { execSync } from 'child_process';
import type { Configuration as WebpackConfig } from 'webpack';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    output: 'export',
    images: {
        loader: "custom",
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    transpilePackages: ["next-image-export-optimizer"],
    env: {
        nextImageExportOptimizer_imageFolderPath: "public/images",
        nextImageExportOptimizer_exportFolderPath: "out",
        nextImageExportOptimizer_quality: "75",
        nextImageExportOptimizer_storePicturesInWEBP: "true",
        nextImageExportOptimizer_exportFolderName: "nextImageExportOptimizer",
        nextImageExportOptimizer_generateAndUseBlurImages: "true",
        nextImageExportOptimizer_remoteImageCacheTTL: "0",
    },
    webpack: (config: WebpackConfig, { isServer }: { isServer: boolean }): WebpackConfig => {
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
