import { Button } from "@/components/ui/button";
import getDates from "@/helpers/getDates";
import Link from 'next/link';

export default function Home() {
  //tests
  const today=new Date(2024,1,5)
  const nextMonthSameDay=new Date(2024,2,5)
  const arr:string[]=getDates(today,nextMonthSameDay)
  const arrOfDates=
  console.log(arr)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Link href={'/details'} >
        <Button variant={'default'}>
          Hi there
        </Button>
        </Link>
    </main>
  );
}
