'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import ExportedImage from "next-image-export-optimizer";
import sunIcon from "/public/sun.png";
import moonIcon from "/public/moon.png";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'light' : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark');
    setTheme(newTheme);
    // document.querySelector('meta[name="theme-color"]')!.setAttribute('content', theme === 'light' ? '#0B1120' : '#f8fafc' );
    // no don't try to simplify this
    const metaTag = document.querySelector('meta[name="theme-color"]');
    if (theme === 'dark') {
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', '#fff')
    } else {
      document
        .querySelector('meta[name="theme-color"]')!
        .setAttribute('content', '#0B1120')
    }
  };

  return (
    <div className="fixed top-3 right-3 flex items-center">
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <ExportedImage
          src={theme === 'light' ? moonIcon : sunIcon}
          alt="Theme Toggle Icon"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
}
