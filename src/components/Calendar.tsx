import {getDates} from "@/helpers/getDates";
import {getDays} from "@/helpers/getDates";
import {CaretLeftIcon, CaretRightIcon} from '@radix-ui/react-icons';
import {useState, useEffect, useRef} from "react";
import Image from "next/image";

export default function Calendar() {
  const [dayArray, setDayArray] = useState<string[]>([])
  const [dateArray, setDateArray] = useState<string[]>([])
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {

    setDayArray(getDays(getDates()))
    setDateArray(getDates())
  }, [])

  function handleArrowClicks(e: any) {

    if (scrollRef.current) {
      if (e.target.dataset.arrow == "left") {
        scrollRef.current.scrollBy({
          left: -200,
          behavior: "smooth",
        });
        return
      } else {
        scrollRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
        return
      }

    }

  }

  return (<section className="w-full flex  laptop:px-containerPaddingX gap-[2rem]">
    <div
      className="text-center laptop:px-[1rem] laptop:py-[1rem] text-[1.3rem] mobile:min-w-[32px] laptop:min-w-[74px] aspect-square rounded-[100%] mobile:h-[32px] laptop:h-auto  bg-[#53C0D3] dark:bg-[#98E4FF]  flex justify-center items-center"
      data-arrow="left" onClick={handleArrowClicks} ref={leftRef}>
      <CaretLeftIcon className="w-7 h-7 text-black" onClick={handleArrowClicks} data-arrow="left"/>
      {/*<Image width={48} height={48} src={"/icons/right.png"} alt="" className="  scale-x-[-1]" data-arrow="left"*/}
      {/*       onClick={handleArrowClicks}/>*/}
    </div>
    <div className="flex overflow-x-scroll no-scrollbar gap-[2rem] " ref={scrollRef}>

      {dayArray.map((day, index) => {
        return (
          <div key={dateArray[index]}
               className="text-center laptop:px-[1rem] laptop:py-[1rem] laptop:text-[1.3rem] laptop:min-w-[74px] aspect-square rounded-[100%] dark:text-white">
            {day.substring(0, 3)}
          </div>
        )
      })}

    </div>
    <div
      className="text-center laptop:px-[1rem] laptop:py-[1rem] text-[1.3rem] mobile:min-w-[32px] laptop:min-w-[74px] aspect-square rounded-[100%] mobile:h-[32px] laptop:h-auto  bg-[#53C0D3] dark:bg-[#98E4FF]  flex justify-center items-center"
      data-arrow="right" onClick={handleArrowClicks} ref={rightRef}>
      {/*<Image width={48} height={48} src={"/icons/right.png"} alt="" onClick={handleArrowClicks} data-arrow="right"/>*/}
      <CaretRightIcon className="w-7 h-7 text-black" onClick={handleArrowClicks} data-arrow="left"/>
    </div>
  </section>)

}

