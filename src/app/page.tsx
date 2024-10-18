'use client'

import Calendar from "@/components/Calendar";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel"
import {Skeleton} from "@/components/ui/skeleton"
import MenuCard from "@/components/MenuCard";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import LandingPage from "@/components/Landing";
import {getDates} from "@/helpers/getDates";

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [hostel, setHostel] = useState<number>(1);
  const [mess, setMess] = useState<number>(1);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // for date heading
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', {month: 'long'});
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    try {
      const selectedHostel = Cookies.get('selectedHostelType');
      const selectedMessType = Cookies.get('selectedMessType');
      let hostelParam = selectedHostel === 'men' ? 1 : 2;
      let messParam = selectedMessType === 'special' ? 1 : selectedMessType === 'veg' ? 2 : 3;

      const jsonPath = `/menu-data/hostel-${hostelParam}-mess-${messParam}.json`;
      const response = await fetch(jsonPath);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      if (!jsonData || !jsonData.menu || jsonData.menu.length === 0) {
        throw new Error('Invalid or empty data');
      }
      setData(jsonData);
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching menu data. Please try again later.');
      setData(null);
    }
  };

  useEffect(() => {
    const selectedHostel = Cookies.get('selectedHostelType');
    const selectedMessType = Cookies.get('selectedMessType');

    setMess(selectedMessType === 'special' ? 1 : selectedMessType === 'veg' ? 2 : 3);
    setHostel(selectedHostel === 'men' ? 1 : 2);

    if (!selectedHostel && !selectedMessType) {
      setShowMainContent(true);
    } else {
      fetchData();
    }

    const dates = getDates();
    setDateArray(dates);

    const today = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
    const todayIndex = dates.findIndex(date => date === today);
    setCurrentDateIndex(todayIndex !== -1 ? todayIndex : 0);
  }, [hostel, mess]);

  useEffect(() => {
    // Check if menu belongs to the current month
    if (data) {
      const currentMonthMenus = data.menu.filter((menu: { date: string | number | Date; }) => {
        const menuDate = new Date(menu.date);
        return menuDate.getMonth() === currentDate.getMonth();
      });

      // If no menu for the month, throw error
      if (!currentMonthMenus || currentMonthMenus.length === 0) {
        setError('No menu available');
      }
    }
  }, [data, currentDate]);

  useEffect(() => {
    if (api) {
      api.scrollTo(currentDateIndex, true);
    }
  }, [api, currentDateIndex, data]);

  useEffect(() => {
    if (!api) {
      return
    }
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
      setCurrentDateIndex(api.selectedScrollSnap())
    })
  }, [api])

  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date);
  };

  const onSelectDayChange = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
  };

  // Hostel/mess title
  const hostelPrefix = hostel === 1 ? 'MH-' : 'LH-';
  const messTypeText = mess === 1 ? 'Special Mess' : mess === 2 ? 'Veg Mess' : 'Non-Veg Mess';

  if (showMainContent) {
    return <LandingPage/>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-around laptop:p-16 gap-[2rem] mobile:p-8">
      <div className="fixed top-2 left-2 z-50">
        <Sidebar setShowMainContent={setShowMainContent}/>
      </div>
      <div className="w-full flex flex-col justify-between items-start text-[3rem] gap-[2rem]">
        <h1 className="w-full text-center mobile:text-[2rem] mobile:mt-[2rem]">
          {hostelPrefix}<span className="font-bold text-[#53C0D3] dark:text-[#98E4FF]">{messTypeText}</span>
        </h1>
        <h3 className="mobile:text-[2rem] mobile:w-full mobile:text-center">
          <b>{currentMonth} </b>{currentYear}
        </h3>
      </div>
      <Calendar
        onDateSelect={handleDateSelect}
        currentDateIndex={currentDateIndex}
        onSelectDayChange={onSelectDayChange}
      />
      {error ? (
          <div className="w-full text-center text-red-500">Mess menu not available. Please try again later.</div>
        ) :
        <Carousel className="w-full" setApi={setApi}
                  opts={{
                    startIndex: currentDateIndex,
                  }}>
          <CarouselContent>
            {Array.from(dateArray).some((_, index) => {
              const menuDate = new Date(data?.menu[index]?.date);
              // const currentDate = new Date();
              return isNaN(menuDate.getTime()) || menuDate.getMonth() !== currentDate.getMonth();
            }) ? (
              <></>
            ) : (
              Array.from(dateArray).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <section
                      className="grid laptop:grid-cols-2 justify-around items-center w-full gap-[2rem] flex-wrap mobile:grid-cols-1">
                      {data?.menu[index].menu.map((menuItem: { type: number, menu: string }, i: number) => {
                        const menuDate = new Date(data.menu[index].date);
                        const isWeekend = menuDate.getDay() === 0 || menuDate.getDay() === 6;
                        const breakfastTiming = isWeekend ? '7:30 AM - 9:30 AM' : '7:00 AM - 9:00 AM';

                        return (
                          <MenuCard
                            key={i}
                            foodItems={menuItem.menu}
                            meal={
                              menuItem.type === 1
                                ? 'Breakfast'
                                : menuItem.type === 2
                                  ? 'Lunch'
                                  : menuItem.type === 3
                                    ? 'Snacks'
                                    : 'Dinner'
                            }
                            timing={
                              menuItem.type === 1
                                ? breakfastTiming
                                : menuItem.type === 2
                                  ? '12:30 PM - 2:30 PM'
                                  : menuItem.type === 3
                                    ? '4:30 PM - 6:00 PM'
                                    : '7:00 PM - 9:00 PM'
                            }
                          />
                        );
                      })}
                    </section>
                  </div>
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      }
      {(!data || error) && (
        <div className="w-full flex justify-center">
          <section
            className="grid laptop:grid-cols-2 justify-around items-center w-full gap-[2rem] flex-wrap mobile:grid-cols-1">
            <Skeleton className="w-full min-h-[200px] tablet:min-h-[250px] rounded-lg"/>
            <Skeleton className="w-full min-h-[200px] tablet:min-h-[250px] rounded-lg"/>
            <Skeleton className="w-full min-h-[200px] tablet:min-h-[250px] rounded-lg"/>
            <Skeleton className="w-full min-h-[200px] tablet:min-h-[250px] rounded-lg"/>
          </section>
        </div>
      )}
    </main>
  );
}
