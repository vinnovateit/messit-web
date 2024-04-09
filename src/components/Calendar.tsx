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
import { type CarouselApi } from "@/components/ui/carousel"

interface CalendarProps {
  onDateSelect: (date: string) => void;
  currentDateIndex: number;
  onSelectDayChange: (index: number) => void;
}

export default function Calendar({ onDateSelect, currentDateIndex, onSelectDayChange }: CalendarProps) {
  const [dayArray, setDayArray] = useState<string[]>([]);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>()
  // const [currentDateIndexState, setCurrentDateIndexState] = useState<number>(currentDateIndex);


  useEffect(() => {
    const dates = getDates();
    setDayArray(getDays(dates));
    setDateArray(dates);

    // Update the currentDateIndex state if the prop changes
    // setCurrentDateIndexState(currentDateIndex);
    setSelectedDate(dates[currentDateIndex]);
    if (api) {
      const slidesInView = api.slidesInView();
      if(!slidesInView.includes(currentDateIndex)) {
        api.scrollTo(currentDateIndex);
      }
    }
  }, [api, currentDateIndex]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date); //todo: unneeded?
    onSelectDayChange(dateArray.indexOf(date));
  };

  return (
    <Carousel className="w-3/4" setApi={setApi}
              opts={{
                // startIndex: currentDateIndex,
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
                  selectedDate === dateArray[index] ? 'bg-[#53C0D3] dark:bg-[#98E4FF] text-black transform transition' : ''
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
