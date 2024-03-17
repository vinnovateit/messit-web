import {getDates} from "@/helpers/getDates";
import { getDays } from "@/helpers/getDates";
import { useState,useEffect } from "react";
export default function Calendar(){
const [dayArray,setDayArray]=useState<string[]>([])
const [dateArray,setDateArray]=useState<string[]>([])
useEffect(()=>{
setDayArray(getDays(getDates()))
setDateArray(getDates())
},[])

return (<section className="w-full flex  px-containerPaddingX">
   <div className="flex overflow-x-scroll no-scrollbar gap-[2rem] ">
   
    {dayArray.map((day,index)=>{
     return(
         <div key={dateArray[index]} className="text-center px-[1rem] py-[1rem] text-[1.3rem] w-[100px] aspect-square  rounded-[100%] border-[1px] border-[#53C0D3]">
             {day.substring(0,3)}
         </div>
     )
 })}
   </div>
</section>)

}

