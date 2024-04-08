import { getDates } from "@/helpers/getDates";
import { getDays } from "@/helpers/getDates";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CalendarProps {
  onDateSelect: (date: string) => void;
}
interface CalendarProps {
  onDateSelect: (date: string) => void;
  currentDateIndex: number;
}

export default function Calendar({ onDateSelect, currentDateIndex }: CalendarProps) {
  const [dayArray, setDayArray] = useState<string[]>([]);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentDateIndexState, setCurrentDateIndexState] = useState<number>(currentDateIndex);

  // useEffect(() => {
  //   const dates = getDates();
  //   setDayArray(getDays(dates));
  //   setDateArray(dates);
  //   const today = new Date().toISOString().slice(0, 10);
  //   const currentDateIndex = dates.findIndex(date => date === today);
  //   setSelectedDate(dates[currentDateIndex]);
  // }, []);

  useEffect(() => {
    const dates = getDates();
    setDayArray(getDays(dates));
    setDateArray(dates);

    // Update the currentDateIndex state if the prop changes
    setCurrentDateIndexState(currentDateIndex);
    setSelectedDate(dates[currentDateIndex]);
  }, [currentDateIndex]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  return (
    <Carousel className="w-full max-w-sm"
              opts={{
                startIndex: currentDateIndex,
                dragFree: true,
                align: "start",
              }}>
      <CarouselContent className="-ml-1">
        {Array.from(dateArray).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/3 max-w-20">
            <div className="p-1">
              <button
                onClick={() => {
                  handleDateSelect(dateArray[index]);
                }}
                className={`flex flex-col items-center justify-center border border-[#53C0D3] dark:border-[#98E4FF] rounded-full aspect-square w-14 h-14 ${
                  selectedDate === dateArray[index] ? 'bg-[#53C0D3] dark:bg-[#98E4FF] text-black' : ''
                }`}
              >
                <div className="text-[11px]">{dayArray[index]}</div>
                <div className="text-2xl font-semibold">{index + 1}</div>
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
