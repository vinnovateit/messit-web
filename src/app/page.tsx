'use client'
import Calendar from "@/components/Calendar";
import Link from 'next/link';
import Card from "@/components/ui/Card";
//todo:read data from cookies here
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-16">
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
