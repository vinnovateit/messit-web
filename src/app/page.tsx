import Image from 'next/image';
import { useTheme } from 'next-themes';
import img from '../res/Images/Character.png'
import img1 from '../res/Images/Character_light.png'
export default function Home() {
  return (
    <div className="flex h-[932px] lg:h-[504.32px] justify-center flex-wrap dark:bg-black transition-all duration-300">
      <div className="flex h-[322px] w-[322px] text-black absolute top-[17.7%] left-[11.5%] ds:left-[20.5%] lg:left-[17.5%] lg:top-[20.7%] flex-col justify-center -z-10 dark:z-10 transition-all duration-100">
          <Image 
            src={img}
            alt="GFG logo served with static path of public directory"
            height="322"
            width="322"
          />
      </div>
      <div className='flex h-[322px] w-[322px] text-black absolute top-[17.7%] left-[11.5%] ds:left-[20.5%] lg:left-[17.5%] lg:top-[20.7%] flex-col justify-center z-10 dark:-z-10 transition-all duration-100'>
      <Image 
            src={img1}
            alt="GFG logo served with static path of public directory"
            height="322"
            width="322"
          />
      </div>
      <div className="flex h-[16.20%] w-[73.48%] top-[57.725%] left-[13.02%] ds:left-[27.02%] lg:left-[32.02%] lg:top-[40.725%] absolute flex-col justify-evenly shrink-0 leading-none dark:text-white text-black transition-all duration-100">
        <div className="flex  justify-center font-Metropolis text-[281%] p-0 shrink">
          See your
        </div>
        <div className="flex justify-center dark:text-yellow-300 text-yellow-400 text-[334.6%] font-extrabold font-Metropolis_exBold p-0 transition-all duration-100">
          Mess Menu
        </div>
        <div className="flex justify-center font-Metropolis text-[281%] p-0 shrink">
          on the go 
        </div>
      </div>
      <button className=" dark:bg-yellow-300 bg-black text-white dark:text-black text-center top-[80.57%] left-[25.11%] ds:left-[54.5%] lg:left-[59.5%] lg:top-[69.725%]  lg:inline absolute w-[49.53%] lg:w-[18.5%]  font-Metropolis_exBold font-extrabold  py-[3.2%] lg:px-0 lg:py-[1%] lg:text-center leading-normal text-[121%] rounded transition-all duration-100">
        Get Started
      </button>
    </div>
  )
}
