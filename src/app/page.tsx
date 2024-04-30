'use client'
import Calendar from "@/components/Calendar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { type CarouselApi } from "@/components/ui/carousel"
import axios from 'axios';
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
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();

  const fetchData = async () => {
    try {
      const selectedHostel = Cookies.get('selectedHostelType');
      const selectedMessType = Cookies.get('selectedMessType');
      let hostelParam = 1;
      let messParam = 1;

      if (selectedHostel) {
        switch (selectedHostel) {
          case 'men':
            hostelParam = 1;
            break;
          case 'ladies':
            hostelParam = 2;
            break;
          default:
            hostelParam = 1;
        }
      }

      if (selectedMessType) {
        switch (selectedMessType) {
          case 'special':
            messParam = 1;
            break;
          case 'veg':
            messParam = 2;
            break;
          case 'non-veg':
            messParam = 3;
            break;
          default:
            messParam = 1;
        }
      }

      let newData = null;
      // Check if data is available in localStorage
      const cachedData = localStorage.getItem(`hostel-${hostelParam}-mess-${messParam}`);
      if (cachedData) {
        // console.log('Returning cached data');
        setData(JSON.parse(cachedData));
      }

      // Refresh data asynchronously
      // console.log('Fetching new data');
      try {
        newData = await fetchNewData(hostelParam, messParam);
        if (newData) {
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching new data:', error);
      }
      if (!cachedData && !newData) {
        setError('Error fetching data');
      }

      // Return the cached data immediately
      return data;
    } catch (error) {
      setError('Error fetching data');
    }
  };

  const fetchNewData = async (hostelParam:number, messParam:number) => {
    try {
      const response = await axios.get(`https://messit-server-vinnovateit.vercel.app/?hostel=${hostelParam}&mess=${messParam}`);
      // const response = await axios.get(`http://localhost:8000/?hostel=${hostelParam}&mess=${messParam}`);
      const data = response.data;
      // Store the new data in localStorage
      // console.log('Storing new data in localStorage');
      localStorage.setItem(`hostel-${hostelParam}-mess-${messParam}`, JSON.stringify(data));
      setData(data);
      return data;
    } catch (error) {
      console.log('Error fetching new data:', error);
    }
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

  useEffect(() => {
    const selectedHostel = Cookies.get('selectedHostelType');
    const selectedMessType = Cookies.get('selectedMessType');
    if (selectedMessType) {
      switch (selectedMessType) {
        case 'special':
          setMess(1);
          break;
        case 'veg':
          setMess(2);
          break;
        case 'non-veg':
          setMess(3);
          break;
        default:
          setMess(1);
      }
    }

    if (selectedHostel) {
      switch (selectedHostel) {
        case 'men':
          setHostel(1);
          break;
        case 'ladies':
          setHostel(2);
          break;
        default:
          setHostel(1);
      }
    }
    fetchData().then(r => console.log('Data fetched')).catch(e => console.error('Error fetching data'));
    if (!selectedHostel && !selectedMessType) {
      setShowMainContent(true);
    }
    const dates = getDates();
    setDateArray(dates);
    // set to current date
    const today = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(new Date());
    const currentDateIndex = dates.findIndex(date => date === today);
    setCurrentDateIndex(currentDateIndex);
    if(api) {
      api.scrollTo(currentDateIndex,true);
    }
  }, [api, hostel, mess]);

  if (showMainContent) {
    return <LandingPage/>;
  }

  // Hostel/mess title
  let hostelPrefix = '';
  let messTypeText = '';

  if (hostel === 1) {
    hostelPrefix = 'MH-';
  } else if (hostel === 2) {
    hostelPrefix = 'LH-';
  }

  if (mess === 1) {
    messTypeText = 'Special Mess';
  } else if (mess === 2) {
    messTypeText = 'Veg Mess';
  } else if (mess === 3) {
    messTypeText = 'Non-Veg Mess';
  }

  const handleDateSelect = (date: string) => {
    console.log('Selected date:', date);
  };
  const onSelectDayChange = (index: number) => {
    if (api) {
      api.scrollTo(index);
    }
    // console.log('Select date index:', index)
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-around laptop:p-16 gap-[2rem] mobile:p-8">
      <div className="fixed top-2 left-2 z-50">
        <Sidebar setShowMainContent={setShowMainContent}/>
      </div>
      <div className="w-full flex flex-col justify-between items-start text-[3rem] gap-[2rem]">
        <h1 className="w-full text-center mobile:text-[2rem] mobile:mt-[2rem]">{hostelPrefix}<span className="font-bold text-[#53C0D3] dark:text-[#98E4FF]">{messTypeText}</span></h1>
        <h3 className="mobile:text-[2rem] mobile:w-full mobile:text-center"><b>{currentMonth} </b>{currentYear}</h3>
      </div>
      <Calendar onDateSelect={handleDateSelect} currentDateIndex={currentDateIndex} onSelectDayChange={onSelectDayChange}/>
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
                      {data?.menu[index].menu.map((menuItem: { type: number, menu: string }, i:number) => (
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
                              ? '7:00 AM - 9:00 AM'
                              : menuItem.type === 2
                                ? '12:30 PM - 2:30 PM'
                                : menuItem.type === 3
                                  ? '4:00 PM - 6:00 PM'
                                  : '7:00 PM - 9:00 PM'
                          }
                        />
                      ))}
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
