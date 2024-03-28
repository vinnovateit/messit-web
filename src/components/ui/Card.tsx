import Image from "next/image"
import React from "react";
interface props{
    foodItems:string[],
    meal:string,
    timing:string
}
const Card:React.FunctionComponent<props>=({foodItems,meal,timing})=>{
    return (
        <div className="flex flex-col justify-start gap-[2.5rem] py-[1rem] items-start laptop:px-[3rem]  relative overflow-hidden rounded-[1rem]  mobile:px-[2rem] bg-opacity-[30%] bg-[#5C58484D]">
            <div className="absolute top-0 left-0 w-[20px] h-full bg-[#53C0D3]"></div>
            <p className="font-bold laptop:text-[2.5rem] text-[#98E4FF]">Breakfast</p>
            <p className="laptop:text-[1.5rem] ">Masala dosa, sambar, chutney ducimus. </p>
            <div className="laptop:text-[1.5rem] flex gap-[1rem] text-[#98E4FF]">
                <Image width={32} height={32} src="/clock.svg" alt="Clock"/>
                <p className="text-[#98E4FF]">Lorem ipsum dolor sit amet consectetur</p>
             </div>
        </div>
    )
}
export default Card;