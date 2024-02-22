import Image from 'next/image';
import img from '../res/Images/Character.png'
export default function Home() {
  return (
    <div className="flex h-[932px] lg:h-[504.32px] justify-center flex-wrap">
      <div className="flex h-[322px] w-[322px] lg:h-[322px] lg:w-[322px] text-white absolute top-[17.7%] left-[11.5%] lg:left-[17.5%] lg:top-[20.7%] flex-col justify-center">
          <Image 
            src={img}
            alt="GFG logo served with static path of public directory"
            height="322"
            width="322"
          />

      </div>
      <div className="flex h-[16.20%] w-[73.48%] top-[57.725%] left-[13.02%] lg:left-[22.02%] lg:top-[35.725%] absolute flex-col justify-evenly shrink-0 leading-none">
        <div className="flex text-white justify-center font-Metropolis text-[281%] p-0 shrink">
          See your
        </div>
        <div className="flex justify-center text-yellow-300 text-[334.6%] font-extrabold font-Metropolis_exBold p-0">
          Mess Menu
        </div>
        <div className="flex text-white justify-center font-Metropolis text-[281%] p-0 shrink">
          on the go 
        </div>
      </div>
      <button className=" bg-yellow-300 text-center top-[80.57%] left-[25.11%] lg:left-[49.5%] lg:top-[60.725%]  lg:inline absolute w-[49.53%] lg:w-[18.5%]  font-Metropolis_exBold font-extrabold  py-[3.2%] lg:px-0 lg:py-[1%] lg:text-center leading-normal text-[121%] rounded">
        Get Started
      </button>
    </div>
  )
}
