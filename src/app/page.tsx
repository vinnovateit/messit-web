import Image from "next/image";
import { Button } from "@/components/ui/button";
import getDates from "@/helpers/getDates";
export default function Home() {
  //tests
  const today=new Date(2024,1,5)
  const nextMonthSameDay=new Date(2024,2,5)
  const arr:string[]=getDates(today,nextMonthSameDay)
  const arrOfDates=
  console.log(arr)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Button variant={'secondary'}>
          Hi there
        </Button>
    </main>
  );
}
