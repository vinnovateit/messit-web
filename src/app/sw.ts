import { defaultCache } from "@serwist/next/worker";
import {ExpirationPlugin, PrecacheEntry, SerwistGlobalConfig, StaleWhileRevalidate} from "serwist";
import { Serwist } from "serwist";

declare global {
    interface WorkerGlobalScope extends SerwistGlobalConfig {
        __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
    }
}

declare const self: ServiceWorkerGlobalScope;

const customCache = [
    // {
    //     matcher: /\/_next\/data\/.+\/.+\.json$/i,
    //     handler: new StaleWhileRevalidate({
    //         cacheName: "next-data",
    //         plugins: [
    //             new ExpirationPlugin({
    //                 maxEntries: 32,
    //                 maxAgeSeconds: 24 * 60 * 60, // 24 hours
    //                 maxAgeFrom: "last-used",
    //             }),
    //         ],
    //     }),
    // },
    {
        matcher: /\/manifest\.webmanifest$/i,
        handler: new StaleWhileRevalidate({
            cacheName: "manifest",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 1,
                    maxAgeSeconds: 24 * 60 * 60, // 24 hours
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
    {
        matcher: /\.(?:json|xml|csv)$/i,
        handler: new StaleWhileRevalidate({
            cacheName: "static-data-assets",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 64,
                    maxAgeSeconds: 20 * 24 * 60 * 60, // 20 days
                    maxAgeFrom: "last-used",
                }),
            ],
        }),
    },
    ...defaultCache,
];

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
    navigationPreload: true,
    runtimeCaching: customCache,
});

serwist.addEventListeners();
