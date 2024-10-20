import {getDates, getDays} from "@/helpers/getDates";
import {useEffect, useState} from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface CalendarProps {
  currentDateIndex: number;
  onSelectDayChange: (index: number) => void;
}

export default function Calendar({currentDateIndex, onSelectDayChange}: CalendarProps) {
  const [dayArray, setDayArray] = useState<string[]>([]);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    const dates = getDates();
    setDayArray(getDays(dates));
    setDateArray(dates);

    // Update the currentDateIndex state if the prop changes
    // setCurrentDateIndexState(currentDateIndex);
    setSelectedDate(dates[currentDateIndex]);
    if (api) {
      const slidesInView = api.slidesInView();
      if (!slidesInView.includes(currentDateIndex)) {
        api.scrollTo(currentDateIndex);
      }
    }
  }, [api, currentDateIndex]);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onSelectDayChange(dateArray.indexOf(date));
  };

  return (
    <Carousel className="w-3/4" setApi={setApi}
              opts={{
                dragFree: true,
                align: "start",
              }}>
      <CarouselContent className="-ml-1">
        {Array.from(dateArray).map((_, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/3 lg:basis-1/3 max-w-14 tablet:max-w-20">
            <div className="p-1">
              <button
                onClick={() => {
                  handleDateSelect(dateArray[index]);
                }}
                className={`flex flex-col items-center justify-center border border-[#53C0D3] dark:border-[#98E4FF] rounded-full aspect-square tablet:w-14 tablet:h-14 w-[43px] h-[43px] ${
                  selectedDate === dateArray[index] ? 'bg-[#53C0D3] dark:bg-[#98E4FF] text-black transform transition' : ''
                }`}
              >
                <div className="tablet:text-xs text-[11px] mt-1">{dayArray[index]}</div>
                <div className="-mt-1 tablet:mt-0 text-lg font-semibold">{index + 1}</div>
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious/>
      <CarouselNext/>
    </Carousel>
  );
}
