'use client'
import Calendar from "@/components/Calendar";
import Card from "@/components/ui/Card";
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
    <main className="flex min-h-screen flex-col items-center justify-around p-16">
      <div className="fixed top-2 left-2 z-50">
        <Sidebar setShowMainContent={setShowMainContent}/>
      </div>
      <div className="w-full flex flex-col justify-between items-start text-[3rem] gap-[1rem]">
        <h1 className="w-full text-center "> LH- <span className="font-bold text-[#53C0D3]">Special Mess</span></h1>
        <h3><b>March </b>2024</h3>
      </div>
      <Calendar/>
      <section className="flex flex-row justify-between items-center w-full gap-[3rem] flex-wrap">
        <Card foodItems={[]} meal="" timing=""/>
        <Card foodItems={[]} meal="" timing=""/>
        <Card foodItems={[]} meal="" timing=""/>
        <Card foodItems={[]} meal="" timing=""/>
      </section>
    </main>
  );
}
