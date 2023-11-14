'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const AppBrand = () => {
  const pathname = usePathname();
  return (
    <div className='text-slate-100 font-bold uppercase'>
      <Link href={pathname?.includes('/dashboard') ? '/dashboard' : '/'}>
        Invoicing &amp; Payment Reminder
      </Link>
    </div>
  );
};

export default AppBrand;
