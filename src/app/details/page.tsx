'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import HostelSelection from "@/components/hostel-selection";
import {Button} from "@/components/ui/button";
import {useState, useEffect} from "react";
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';
import Cookies from "js-cookie";
import { useTheme } from "next-themes"

export default function MessSelector() {
    const [selectedHostel, setSelectedHostel] = useState(null);
    const [selectedMessType, setSelectedMessType] = useState(null);
    const [hostelError, setHostelError] = useState(false);
    const [messTypeError, setMessTypeError] = useState(false);
    const { setTheme } = useTheme()
    const handleHostelSelect = (value) => {
        setSelectedHostel(value);
        setHostelError(false);
    };
    const handleMessTypeSelect = (value) => {
        setSelectedMessType(value);
        setMessTypeError(false);
        console.log("Selected Mess Type:", value);
    };
    const handleSubmit = () => {
        // if (!selectedHostel || !selectedMessType) {
        //     alert('Please select both hostel type and mess type');
        //     return;
        // }
        if (!selectedHostel) {
            setHostelError(true);
        }
        if (!selectedMessType) {
            setMessTypeError(true);
        }
        if (!selectedHostel || !selectedMessType) {
            return;
        }

        Cookies.set('selectedHostel', selectedHostel, {expires: 365});
        Cookies.set('selectedMessType', selectedMessType, {expires: 365});
        Cookies.set('setupComplete', '1', {expires: 365}); // indicate setup complete
        console.log(Cookies.get()); // fixme: remove logging

        // fixme: redirect to dashboard
    };
    useEffect(() => {
        console.log("Mess stat (useEffect):", selectedHostel); // async troubles?
    }, [selectedHostel]);
    return (
        <main className="flex min-h-dvh flex-col justify-between p-5 items-center">
            <div className="text-4xl">First, we need to gather your <span
                className="text-[#53C0D3] font-bold dark:text-[#98E4FF]">information</span></div>

            <div className="text-2xl">This is required to find you the right mess menu</div>

            <div className="">
                <div className="self-center">
                    <div className="text-lg font-semibold">Hostel Type <span className="text-[#53C0D3] dark:text-[#98E4FF]">*</span></div>
                    <HostelSelection onSelect={handleHostelSelect}/>
                    {hostelError && <div className="text-red-500 flex items-center"><ExclamationTriangleIcon
                        className="w-4 h-4 mr-1"/> Please select your hostel</div>}
                </div>
                <br/>
                <div className="">
                    <div className="text-lg font-semibold">Mess Type <span className="text-[#53C0D3] dark:text-[#98E4FF]">*</span></div>
                    <Select onValueChange={(e) => handleMessTypeSelect(e)}>
                        <SelectTrigger className="w md:w-[300px] border-[#53C0D3] dark:border-[#98E4FF] h-12 text-base md:h-10">
                            <SelectValue placeholder="Select mess type"/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="special">Special Mess</SelectItem>
                            <SelectItem value="veg">Veg Mess</SelectItem>
                            <SelectItem value="non-veg">Non-Veg mess</SelectItem>
                        </SelectContent>
                    </Select>
                    {messTypeError && <div className="text-red-500 flex items-center"><ExclamationTriangleIcon
                        className="w-4 h-4 mr-1"/> Please
                        select your mess</div>}
                </div>
            </div>
            <Button variant={'default'} className="w-[200px] self-center h-13 text-lg font-bold bg-black dark:bg-[#98E4FF] mt-10 mb-10" onClick={handleSubmit}>
                Submit
            </Button>
            {/*dark mode debug*/}
            {/*<Button variant={'default'} onClick={() => setTheme("dark")}>Dark mode</Button>*/}
            {/*<Button variant={'default'} onClick={() => setTheme("light")}>Light mode</Button>*/}
        </main>
    )
}