import {getDates} from "@/helpers/getDates";
import { getDays } from "@/helpers/getDates";
import { useState,useEffect, useRef } from "react";
import Image from "next/image";
export default function Calendar(){
const [dayArray,setDayArray]=useState<string[]>([])
const [dateArray,setDateArray]=useState<string[]>([])
const leftRef=useRef<HTMLDivElement>(null)
const rightRef=useRef<HTMLDivElement>(null)
const scrollRef=useRef<HTMLDivElement>(null)

useEffect(()=>{
    
setDayArray(getDays(getDates()))
setDateArray(getDates())
},[])
function handleArrowClicks(e:any){
   
    if(scrollRef.current){
        if(e.target.dataset.arrow=="left")
       {
        scrollRef.current.scrollBy({
            left: -200,
            behavior: "smooth",
          });return
       }
          else{
            scrollRef.current.scrollBy({
                left: 200,
                behavior: "smooth",
              }); return
          }
        
    }
   
}

return (<section className="w-full flex  px-containerPaddingX gap-[2rem]">
    <div  className="flex justify-center items-center text-center px-[1rem] py-[1rem] text-[1.3rem] min-w-[74px] aspect-square rounded-[100%]  border-[#98E4FF] " data-arrow="left" onClick={handleArrowClicks} ref={leftRef}>
           <Image width={48} height={48} src={"/icons/right.png"} alt="" className="  scale-x-[-1]" data-arrow="left" onClick={handleArrowClicks}/>
         </div>
   <div className="flex overflow-x-scroll no-scrollbar gap-[2rem] " ref={scrollRef}>
   
    {dayArray.map((day,index)=>{
     return(
         <div key={dateArray[index]} className="text-center px-[1rem] py-[1rem] text-[1.3rem] min-w-[74px] aspect-square rounded-[100%]    text-white">
             {day.substring(0,3)}
         </div>
     )
 })}
 
   </div>
   <div className="text-center px-[1rem] py-[1rem] text-[1.3rem] min-w-[74px] aspect-square rounded-[100%]  border-[#98E4FF]  flex justify-center items-center" data-arrow="right" onClick={handleArrowClicks} ref={rightRef}>
   <Image width={48} height={48} src={"/icons/right.png"} alt="" onClick={handleArrowClicks}  data-arrow="right" />
         </div>
</section>)

}

