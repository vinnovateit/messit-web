'use client'

// import { FiSun, FiMoon } from "react-icons/fi"
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Image from "next/image"
import img from "../res/Images/sun.png"
import img1 from "../res/Images/moon.png"

export default function ThemeSwitcher(){
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    useEffect(() =>  setMounted(true), [])

    if(!mounted){
        return null;
    }

    return(
        <div className='absolute top-5 right-10'>
            <div className='absolute h-[20px] w-[20px] dark:z-10 -z-10 hidden dark:flex' onClick={()=>setTheme("light")}>
                <Image
                    src={img}
                    alt="GFG logo served with static path of public directory"
                    height={20}
                    width={20}
                />
            </div>
            <div className='absolute h-[20px] w-[20px] dark:-z-10 dark:hidden z-10' onClick={()=>setTheme("dark")}>
                <Image
                    src={img1}
                    alt="GFG logo served with static path of public directory"
                    height={20}
                    width={20}
                />
            </div>
        </div>
    )
};