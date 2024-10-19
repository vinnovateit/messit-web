import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="mb-8 flex items-center">
        <Image src="/icons/icon-192.png" alt="Messit Logo" width={128} height={128} />
      </div>
      <h1 className="text-3xl font-bold mb-4">404 - Menu Not Found</h1>
      <p className="text-xl mb-8">Oops! This page isn&#39;t on today&#39;s menu.</p>
      <div className="max-w-md mb-8">
        <p className="text-gray-600 dark:text-gray-400">
          If this error persists, please try clearing your browser cache or reinstalling the app.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button asChild>
          <Link href="/">
            <Calendar className="mr-2 h-4 w-4" /> View Today&#39;s Menu
          </Link>
        </Button>
      </div>
    </div>
  );
}
