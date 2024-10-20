import type {Metadata, Viewport} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Messit Web",
//     description: "VinnovateIT",
// };
const APP_NAME = "Messit Web by VinnovateIT";
const APP_DEFAULT_TITLE = "Messit Web by VinnovateIT";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "Unmess the mess, See your hostel mess menu at the ease of a click.";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    startupImage: [
      {
        url:'splash/apple-splash-2048-2732.jpg',
        media:'(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1668-2388.jpg',
        media:'(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1536-2048.jpg',
        media:'(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1488-2266.jpg',
        media:'(device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1640-2360.jpg',
        media:'(device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1668-2224.jpg',
        media:'(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1620-2160.jpg',
        media:'(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1290-2796.jpg',
        media:'(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1179-2556.jpg',
        media:'(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1284-2778.jpg',
        media:'(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1170-2532.jpg',
        media:'(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1125-2436.jpg',
        media:'(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1242-2688.jpg',
        media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-828-1792.jpg',
        media:'(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-1242-2208.jpg',
        media:'(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-750-1334.jpg',
        media:'(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-640-1136.jpg',
        media:'(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-2048-2732.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1668-2388.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1536-2048.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1488-2266.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1640-2360.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1668-2224.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1620-2160.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1290-2796.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1179-2556.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1284-2778.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1170-2532.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1125-2436.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1242-2688.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-828-1792.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-1242-2208.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-750-1334.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
      {
        url:'splash/apple-splash-dark-640-1136.jpg',
        media:'(prefers-color-scheme: dark) and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
      },
    ],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#fff',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
      {/*<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>*/}
      {/*<meta name="theme-color" content="#fff"/>*/}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0B1120')
                }
              } catch (_) {}
            `,
        }}
      />
    </head>
    <body className={inter.className}>
    <ThemeProvider
      attribute="class"
      // defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative top-2 left-2 z-50">
        <ToastContainer/>
        {/*<Sidebar/>*/}
      </div>
      {/*<ThemeSwitcher />*/}
      {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
