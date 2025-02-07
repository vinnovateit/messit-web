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
    {
        matcher: /.*/i,
        handler: new StaleWhileRevalidate({
            cacheName: "all-routes",
            plugins: [
                new ExpirationPlugin({
                    maxEntries: 512,
                    maxAgeSeconds: 25 * 24 * 60 * 60, // 25 days
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
