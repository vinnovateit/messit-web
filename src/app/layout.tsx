import type {Metadata, Viewport} from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";
import { ToastContainer } from "react-toastify";
import ThemeSwitcher from "@/components/ThemeSwitch";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "Messit Web",
//     description: "VinnovateIT",
// };
const APP_NAME = "Messit Web";
const APP_DEFAULT_TITLE = "Messit Web";
const APP_TITLE_TEMPLATE = "%s";
const APP_DESCRIPTION = "VinnovateIT";

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
    // startupImage: [],
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
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative top-2 left-2 z-50">
        <ToastContainer/>
        {/*<Sidebar/>*/}
      </div>
      {/*<ThemeSwitcher />*/}
      {children}
      <Analytics/>
    </ThemeProvider>
    </body>
    </html>
  );
}
