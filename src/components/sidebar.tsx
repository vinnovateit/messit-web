'use client';
import { Dispatch, SetStateAction } from 'react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {TextAlignLeftIcon} from '@radix-ui/react-icons';
import {usePathname, useRouter} from 'next/navigation';
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import Cookies from "js-cookie";

interface SidebarProps {
  setShowMainContent: Dispatch<SetStateAction<boolean>>;
}
const Sidebar = ({ setShowMainContent }: SidebarProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const {setTheme, theme} = useTheme();
  const buttons = [
    {label: "Messit", page: "/"},
    {label: "Reset", page: "/reset"},
    // {label: "About us", page: "/about"}
  ];

  const handleButtonClick = (page: string) => {
    if (page === "/reset") {
      Cookies.remove('selectedHostelType');
      Cookies.remove('selectedMessType');
      setShowMainContent(true);
    } else {
      router.push(page);
    }
  };

  return (
    <Sheet>
      <SheetTrigger><TextAlignLeftIcon className="w-6 h-6"/></SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>General</SheetTitle>
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start ${pathname === button.page ? "bg-slate-100 text-[#53C0D3] dark:text-[#98E4FF] dark:bg-slate-800" : "text-slate-500"}`}
              onClick={() => handleButtonClick(button.page)}
            >
              {button.label}
            </Button>
          ))}
          <SheetTitle>Preferences</SheetTitle>
          <Select onValueChange={(e) => setTheme(e)}>
            <SelectTrigger className="w">
              <SelectValue
                placeholder={theme ? theme[0].toUpperCase() + theme.slice(1) : "Select Theme"}/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </SheetHeader>
        <div
          className="absolute bottom-2 left-0 right-0 px-4 py-2 text-gray-900 dark:text-gray-100 text-sm text-center">Made
          with ❤️ by VinnovateIT
        </div>
      </SheetContent>
    </Sheet>
  )
};

export default Sidebar;
