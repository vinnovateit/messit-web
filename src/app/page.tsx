import Image from 'next/image';
import img from '../res/Images/Character.svg'
import img1 from '../res/Images/Character_light.svg'
//Change
export default function Home() {
  return (
    <div className="flex xl:h-[100%] lg:h-[100%] justify-center flex-wrap dark:bg-black transition-all duration-300">
      <div className="flex xl:h-[322px] xl:w-[100%] lg:w-[322px] sm:h-[270px] sm:w-[100%] md:h-[370px] md:w-[100%] sm:top-[12.5%]  text-black absolute xl:top-[17.7%] ds:left-[20.5%] lg:left-[17.5%] lg:top-[20.7%] justify-center -z-10 dark:z-10 transition-all duration-100">
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="322"
            width="322"
            className='xl:flex sm:hidden md:hidden' 
          />
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="270"
            width="270"
            className='xl:hidden sm:flex md:hidden' 
          />
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="370"
            width="370"
            className='xl:hidden sm:hidden md:flex' 
          />
      </div>
      <div className='flex xl:h-[322px] xl:w-[100%] lg:w-[322px] sm:h-[270px] sm:w-[100%] sm:top-[12.5%] md:h-[370px] md:w-[100%]  text-black absolute xl:top-[17.7%] ds:left-[20.5%] lg:left-[17.5%] lg:top-[20.7%] justify-center z-10 dark:-z-10 transition-all duration-100'>
      <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="322"
            width="322"
            className='xl:flex sm:hidden md:hidden' 
          />
          <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="270"
            width="270"
            className='xl:hidden sm:flex md:hidden' 
          />
          <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="370"
            width="370"
            className='xl:hidden sm:hidden md:flex' 
          />
      </div>
      <div className="flex xl:h-[16.20%] xl:w-[73.48%] xl:top-[57.725%] xl:left-[13.02%] ds:left-[27.02%] lg:left-[32.02%] lg:top-[34.725%] sm:top-[52.5%] absolute flex-col justify-evenly shrink-0 leading-none dark:text-white text-black transition-all duration-100">
        <div className="flex  justify-center font-Metropolis text-[281%] sm:text-[250%] md:text-[300%]  p-0 shrink">
          See your
        </div>
        <div className="flex justify-center dark:text-cyan-200 text-[#53C0D3] text-[334.6%] sm:text-[275%] md:text-[350%]  font-extrabold font-Metropolis_exBold p-0 transition-all duration-100">
          Mess Menu
        </div>
        <div className="flex justify-center font-Metropolis text-[281%] sm:text-[250%] md:text-[300%]  p-0 shrink">
          on the go 
        </div>
      </div>
      <button className=" dark:bg-cyan-200 bg-black text-white dark:text-black text-center xl:top-[80.57%] xl:left-[25.11%] ds:left-[54.5%] lg:left-[59.5%] lg:top-[63.725%] sm:top-[75%]  lg:inline absolute w-[49.53%] lg:w-[18.5%]  font-Metropolis_exBold font-extrabold  py-[3.2%] lg:px-0 lg:py-[1%] lg:text-center leading-normal text-[121%] sm:text-[100%] md:text-[150%]  rounded transition-all duration-100">
        Get Started
      </button>
    </div>
  )
}
