'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from "next/image";
import sunIcon from "../res/Images/sun.png";
import moonIcon from "../res/Images/moon.png";

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
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="fixed top-3 right-3 flex items-center">
      <button
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <Image
          src={theme === 'light' ? moonIcon : sunIcon}
          alt="Theme Toggle Icon"
          height={20}
          width={20}
        />
      </button>
    </div>
  );
}
