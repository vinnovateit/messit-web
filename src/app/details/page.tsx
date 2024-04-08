'use client';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import HostelSelection from "@/components/hostel-selection";
import {Button} from "@/components/ui/button";
import {useState, useEffect} from "react";
import {ExclamationTriangleIcon} from '@radix-ui/react-icons';
import Cookies from "js-cookie";
import {useTheme} from "next-themes"
import {useRouter} from "next/navigation";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeSwitcher from "@/components/ThemeSwitch";

export default function MessSelector() {
  const router = useRouter()
  const [selectedHostel, setSelectedHostel] = useState<string | null>(null);
  const [selectedMessType, setSelectedMessType] = useState<string | null>(null);
  const [hostelError, setHostelError] = useState(false);
  const [messTypeError, setMessTypeError] = useState(false);
  const {setTheme} = useTheme()
  const handleHostelSelect = (value: any) => {
    setSelectedHostel(value);
    setHostelError(false);
  };
  const handleMessTypeSelect = (value: string) => {
    setSelectedMessType(value);
    setMessTypeError(false);
    console.log("Selected Mess Type:", value);
  };
  const handleSubmit = () => {
    if (!selectedHostel || !selectedMessType) {
      toast.error('Select hostel and mess type')
      if (!selectedHostel)
        setHostelError(true)
      if (!selectedMessType)
        setMessTypeError(true)
      return
    }
    Cookies.set('selectedMessType', selectedMessType, { expires: 365 })
    Cookies.set('selectedHostelType', selectedHostel, { expires: 365 })
    router.push(`/`)
  };

  return (
    <main className="flex min-h-dvh flex-col justify-between p-5 items-center mt-8">
      <ThemeSwitcher/>
      <div className="sm:text-4xl text-3xl text-center">First, we need to gather your <span
        className="text-[#53C0D3] font-bold dark:text-[#98E4FF]">information</span></div>

      <div className="text-xl tall:visible invisible">This is required to find you the right mess menu</div>

      <div className="">
        <div className="self-center">
          <div className="text-xl font-semibold">Hostel Type<span
            className="text-[#53C0D3] dark:text-[#98E4FF]">*</span></div>
          <HostelSelection onSelect={handleHostelSelect}/>
          {hostelError && <div className="text-red-500 flex items-center"><ExclamationTriangleIcon
            className="w-4 h-4 mr-1"/> Please select your hostel</div>}
        </div>
        <br/>
        <div className="">
          <div className="text-xl font-semibold mb-2">Mess Type<span
            className="text-[#53C0D3] dark:text-[#98E4FF]">*</span></div>
          <Select onValueChange={(e) => handleMessTypeSelect(e)}>
            <SelectTrigger
              className="w md:w-[300px] border-[#53C0D3] dark:border-[#98E4FF] h-12 text-base md:h-10">
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
      <Button variant={'default'}
              className="w-[200px] self-center h-13 text-lg font-bold bg-black dark:bg-[#98E4FF] mt-10 mb-10"
              onClick={handleSubmit}>
        Submit
      </Button>
      {/*dark mode debug*/}
      {/*<select onChange={e => setTheme(e.target.value)}>*/}
      {/*    <option value="system">System</option>*/}
      {/*    <option value="dark">Dark</option>*/}
      {/*    <option value="light">Light</option>*/}
      {/*</select>*/}
    </main>
  )
}
