'use client'
import Calendar from "@/components/Calendar";
// import Card from "@/components/ui/Card";
import MenuCard from "@/components/MenuCard";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import LandingPage from "@/components/Landing";

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);

  useEffect(() => {
    const selectedHostel = Cookies.get('selectedHostelType');
    const selectedMessType = Cookies.get('selectedMessType');

    if (selectedHostel && selectedMessType) {
      setShowMainContent(true);
    }
  }, []);

  if (!showMainContent) {
    return <LandingPage/>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around laptop:p-16 gap-[2rem] mobile:p-8">
      <div className="fixed top-2 left-2 z-50">
        <Sidebar setShowMainContent={setShowMainContent}/>
      </div>
      <div className="w-full flex flex-col justify-between items-start text-[3rem] gap-[2rem]">
        <h1 className="w-full text-center mobile:text-[2rem] mobile:mt-[2rem]"> LH- <span className="font-bold text-[#53C0D3] dark:text-[#98E4FF]">Special Mess</span></h1>
        <h3 className="mobile:text-[2rem] mobile:w-full mobile:text-center"><b>March </b>2024</h3>
      </div>
      <Calendar/>
      <section className="grid laptop:grid-cols-2 justify-around items-center w-full gap-[2rem] flex-wrap mobile:grid-cols-1">
        {/*todo: load data dynamically!!*/}
        <MenuCard foodItems="Idli, Sambar, Chutney" meal="Breakfast" timing="7:00 AM - 9:00 AM" />
        <MenuCard foodItems="Idli, Sambar, Chutney" meal="Breakfast" timing="7:00 AM - 9:00 AM" />
        <MenuCard foodItems="Idli, Sambar, Chutney" meal="Breakfast" timing="7:00 AM - 9:00 AM" />
        <MenuCard foodItems="Idli, Sambar, Chutney" meal="Breakfast" timing="7:00 AM - 9:00 AM" />

      </section>
    </main>
  );
}
