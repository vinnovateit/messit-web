import React from "react";
import {ClockIcon} from '@radix-ui/react-icons';

interface Props {
  foodItems?: string,
  meal?: string,
  timing?: string
}

const MenuCard: React.FunctionComponent<Props> = ({foodItems, meal, timing}) => {
  return (
    <div
      className="flex flex-col items-start gap-4 p-4 laptop:p-6 tablet:min-h-[250px] relative overflow-hidden rounded-lg bg-opacity-30 dark:bg-[#5C58484D] border border-[#53C0D3] dark:border-[#98E4FF]"
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-[#53C0D3] dark:bg-[#98E4FF]"></div>
      <h2 className="font-bold text-2xl laptop:text-4xl text-[#53C0D3] dark:text-[#98E4FF]">{meal}</h2>
      <p className="text-lg laptop:text-xl">{foodItems}</p>
      <div className="flex items-center gap-2 text-lg laptop:text-xl dark:text-[#98E4FF]">
        <ClockIcon className="h-6 w-6"/>
        <p>{timing}</p>
      </div>
    </div>
  )
}

export default MenuCard;
