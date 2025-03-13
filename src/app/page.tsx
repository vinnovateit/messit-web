'use client'
import Calendar from "@/components/Calendar";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel";
import {Skeleton} from "@/components/ui/skeleton";
import MenuCard from "@/components/MenuCard";
import {useCallback, useEffect, useState} from "react";
import Cookies from "js-cookie";
import Sidebar from "@/components/sidebar";
import LandingPage from "@/components/Landing";
import {getDates} from "@/helpers/getDates";
import InstallPrompt from "@/components/InstallPrompt";

export default function Home() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [currentDateIndex, setCurrentDateIndex] = useState<number>(0);
  const [dateArray, setDateArray] = useState<string[]>([]);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
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

      // Ensure all dates in the month have a menu entry
      const dates = getDates();
      const menuData = dates.map(date => {
        const menuForDate = jsonData.menu.find((menu: { date: string }) => menu?.date === date);
        return menuForDate || { date, menu: [] };
      });

      // console.log('Processed menu data:', menuData);
      setData({ ...jsonData, menu: menuData });
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
    const bannerDismissed = Cookies.get('bannerDismissed');
    if (bannerDismissed) {
      setShowBanner(false);
    }
  }, []);

  const dismissBanner = () => {
    setShowBanner(false);
    // Set cookie to expire in 24 hours ...
    Cookies.set('bannerDismissed', 'true', { expires: 1 });
  };

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

  // QoL: Keyboard navigation
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (api) {
      if (event.key === 'ArrowLeft') {
        api.scrollPrev();
      } else if (event.key === 'ArrowRight') {
        api.scrollNext();
      }
    }
  }, [api]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (api) {
      api.scrollTo(currentDateIndex, true);
    }
  }, [api, currentDateIndex, data]);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCurrentDateIndex(api.selectedScrollSnap());
    });
  }, [api]);

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
      {showBanner && (
        <div className="w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#53C0D3] to-[#98E4FF] opacity-20 rounded-xl"></div>
          <div className="relative p-6 border-2 border-[#53C0D3] dark:border-[#98E4FF] rounded-xl backdrop-blur-sm">
            <button 
              onClick={dismissBanner}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
              aria-label="Close banner"
            >
              ✕
            </button>
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold leading-relaxed tracking-wide text-gray-800 dark:text-white">
                Want to cook your own apps and build the next MessIT? ✨
              </p>
              <p className="text-base font-medium text-gray-700 dark:text-gray-100">
                Register on VTOP:{" "}
                <span className="bg-[#53C0D3]/10 dark:bg-[#98E4FF]/10 px-3 py-1.5 rounded-lg border border-[#53C0D3]/20 dark:border-[#98E4FF]/20 inline-block mt-1">
                  Club Registration &gt; 112 &gt; VinnovateIT Club
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <InstallPrompt />
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
                                    ? '4:30 PM - 6:15 PM'
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
