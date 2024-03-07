import Image from 'next/image';
import img from '../../res/Images/Character.svg'
import img1 from '../../res/Images/Character_light.svg'
//Change
export default function LandingPage() {
  return (
    <div className='h-screen flex flex-col gap-4 justify-center items-center'>
      <div>
      <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height=""
            width=""
            className='w-[50vh] md:w-[70vh]' 
          />
      </div>
      <div className='text-5xl'>See your <span className='text-[#53C0D3] font-bold'>Mess Menu</span> on the go</div>
      <button className=" dark:bg-white bg-black text-white dark:text-black text-center font-extrabold py-3 px-12 rounded-md">
        Get Started
      </button>
    </div>
  )
}
















{/* <div className="flex tablet:h-[100%] justify-center flex-wrap dark:bg-black transition-all duration-300">
      <div className="flex tablet:h-[322px] tablet:w-[322px] laptop:w-[322px] mobile:h-[270px] mobile:w-[100%] mobile:top-[12.5%]  text-black absolute tablet:top-[17.7%] justify-center -z-10 dark:z-10 transition-all duration-100">
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="322"
            width="322"
            className='tablet:flex mobile:hidden md:hidden' 
          />
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="270"
            width="270"
            className='tablet:hidden mobile:flex md:hidden' 
          />
          <Image 
            src={img}
            alt="Girl thinking about mess menu"
            height="370"
            width="370"
            className='tablet:hidden mobile:hidden md:flex' 
          />
      </div>
      <div className='flex tablet:h-[322px] tablet:w-[322px]  mobile:h-[270px] mobile:w-[100%] mobile:top-[12.5%]  text-black absolute tablet:top-[17.7%] justify-center z-10 dark:-z-10 transition-all duration-100'>
      <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="322"
            width="322"
            className='tablet:flex mobile:hidden md:hidden' 
          />
          <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="270"
            width="270"
            className='tablet:hidden mobile:flex md:hidden' 
          />
          <Image 
            src={img1}
            alt="Girl thinking about mess menu"
            height="370"
            width="370"
            className='tablet:hidden mobile:hidden md:flex' 
          />
      </div>
      <div className="flex tablet:h-[16.20%] tablet:w-[73.48%]  tablet:top-[60.725%] tablet:left-[13.02%] mobile:top-[52.5%] absolute flex-col justify-evenly shrink-0 leading-none dark:text-white text-black transition-all duration-100">
        <div className="flex  justify-center font-Metropolis text-[281%] mobile:text-[250%] md:text-[300%]  p-0 shrink">
          See your
        </div>
        <div className="flex  justify-center dark:text-cyan-200 text-[#53C0D3] text-[334.6%] mobile:text-[275%] md:text-[350%]  font-extrabold font-Metropolis_exBold p-0 transition-all duration-100">
          Mess Menu
        </div>
        <div className="flex ds:w-[50%]  justify-center font-Metropolis text-[281%] mobile:text-[250%] md:text-[300%]  p-0 shrink">
          on the go 
        </div>
      </div>
      <button className=" dark:bg-cyan-200 bg-black text-white dark:text-black text-center tablet:top-[80.57%] tablet:left-[25.11%] ds:left-[54.5%] mobile:top-[75%] absolute w-[49.53%] laptop:w-[25.53%] laptop:left-[37%] laptop:top-[80%] lg:w-[18.5%] font-Metropolis_exBold font-extrabold  py-[3.2%] laptop:px-0 laptop:py-[2%] lg:text-center leading-normal text-[121%] mobile:text-[100%] md:text-[150%]  rounded transition-all duration-100">
        Get Started
      </button>
    </div> */}