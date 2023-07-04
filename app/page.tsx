import Button from '@/components/Button';
import Image from 'next/image';
import Link from 'next/link';
import receipt from '../assets/images/undraw_Receipt_re_fre3.svg';
export default async function Page() {
  return (
    <div className='flex flex-col items-center lg:flex-row lg:mt-12'>
      <article className='flex-1'>
        <h1 className='text-4xl lg:text-6xl'>
          Invoicing & Payment Reminder App
        </h1>
        <p className='mt-6 text-2xl text-slate-500 font-light tracking-wide'>
          Generate and send invoices, as well as send automated follow-up
          reminders about overdue payments.
        </p>
        <Link href='/register'>
          <Button className='mt-8'>Get Started</Button>
        </Link>
      </article>
      <figure>
        <Image
          src={receipt}
          alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
          width={520}
          height={380}
          priority
        />
      </figure>
    </div>
  );
}
