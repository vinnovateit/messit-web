'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import HostelSelection from "@/components/hostel-selection";
import {Button} from "@/components/ui/button";
import {useState, useEffect} from "react";
import Cookies from "js-cookie";

export default function MessSelector() {
    const [selectedHostel, setSelectedHostel] = useState(null);
    const [selectedMessType, setSelectedMessType] = useState(null);
    const handleHostelSelect = (value) => {
        setSelectedHostel(value);
    };
    const handleMessTypeSelect = (value) => {
        setSelectedMessType(value);
        console.log("Selected Mess Type:", value);
    };
    const handleSubmit = () => {
        if (!selectedHostel || !selectedMessType) {
            alert('Please select both hostel type and mess type');
            return;
        }

        Cookies.set('selectedHostel', selectedHostel, { expires: 365 });
        Cookies.set('selectedMessType', selectedMessType, { expires: 365 });
        Cookies.set('setupComplete', '1', { expires: 365 }); // indicate setup complete
        console.log(Cookies.get()); // fixme: remove logging

        // fixme: redirect to dashboard
    };
    useEffect(() => {
        console.log("Mess stat (useEffect):", selectedHostel); // async troubles?
    }, [selectedHostel]);
    return (
        <main className="flex min-h-dvh flex-col justify-between p-5 items-center">
            <div className="text-4xl">First, we need to gather your <span
                className="text-[#53C0D3] font-bold">information</span></div>

            <div className="text-2xl">This is required to find you the right mess menu</div>

            <div className="">
                <div className="self-center">
                    <div className="text-lg font-semibold">Hostel Type <span className="text-[#53C0D3]">*</span></div>
                    <HostelSelection onSelect={handleHostelSelect}/>
                </div>
                <br/>
                <div className="">
                    <div className="text-lg font-semibold">Mess Type <span className="text-[#53C0D3]">*</span></div>
                    <Select onValueChange={(e) => handleMessTypeSelect(e)}>
                        <SelectTrigger className="w md:w-[300px] border-[#53C0D3] h-12 text-base md:h-10">
                            <SelectValue placeholder="Select mess type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="special">Special Mess</SelectItem>
                            <SelectItem value="veg">Veg Mess</SelectItem>
                            <SelectItem value="non-veg">Non-Veg mess</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <Button variant={'default'} className="w-[213px] self-center" onClick={handleSubmit}>
                Submit
            </Button>
        </main>
    )
}