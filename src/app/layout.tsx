import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/theme-provider";
import Sidebar from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Messit Web",
    description: "VinnovateIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
    </head>
    <body className={inter.className}>
    <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
    >
        <Sidebar/>
        {children}
    </ThemeProvider>
    </body>
    </html>
  );
}
