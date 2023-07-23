'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppBrand = () => {
  const pathname = usePathname();
  return (
    <div className='text-blue-500 font-bold uppercase'>
      <Link href={pathname?.includes('/dashboard') ? '/dashboard' : '/'}>
        Invoicing &amp; Payment Reminder
      </Link>
    </div>
  );
};

export default AppBrand;
