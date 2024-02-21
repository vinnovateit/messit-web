'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import HostelSelection from "@/components/hostel-selection";
import {Button} from "@/components/ui/button";
import {useState,useEffect} from "react";

export default function MessSelector(){
    const [selectedHostel, setSelectedHostel] = useState(null);
    const handleHostelSelect = (value) => {
        setSelectedHostel(value);
    };
    useEffect(() => {
        console.log("Mess stat (useEffect):", selectedHostel); // async troubles?
    }, [selectedHostel]);
    return (
        <main className="flex min-h-dvh flex-col justify-between p-5">
            <div className="text-4xl">First, we need to gather your <span className="text-[#53C0D3] font-bold">information</span></div>

            <div className="text-2xl">This is required to find you the right mess menu</div>

            <div className="text-lg font-semibold">Hostel Type <span className="text-[#53C0D3]">*</span></div>
            <HostelSelection onSelect={handleHostelSelect}/>
            <div className="text-lg font-semibold">Mess Type <span className="text-[#53C0D3]">*</span></div>
            <Select>
                <SelectTrigger className="w md:w-[300px] border-[#53C0D3] h-12 text-base md:h-10">
                    <SelectValue placeholder="Select mess type"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="special">Special Mess</SelectItem>
                    <SelectItem value="veg">Veg Mess</SelectItem>
                    <SelectItem value="non-veg">Non-Veg mess</SelectItem>
                </SelectContent>
            </Select>
            <Button variant={'default'} className="w-[213px] self-center">
                Submit
            </Button>
        </main>
    )
}