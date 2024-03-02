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
   <div>
    
   </div>
</section>)

}
// {dayArray.map((day,index)=>{
//     return(
//         <div key={dateArray[index]}>
//             {day}
//         </div>
//     )
// })}