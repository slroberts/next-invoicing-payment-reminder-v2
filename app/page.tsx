import Button from '@/components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';
import dashboard from '@/assets/images/ipr-dashboard.png';
export default async function Page() {
  return (
    <>
      <section className='grid lg:grid-cols-2 gap-8 pt-8'>
        <article>
          <h2 className='text-slate-200 text-4xl md:text-5xl lg:text-6xl font-semibold'>
            Invoicing & Payment Reminder App
          </h2>
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
            src={dashboard}
            alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
            width={960}
            height={428}
            priority
          />
        </figure>
      </section>
      <section className='grid lg:grid-cols-3 gap-8 mt-8'>
        <article className='bg-gradient-to-b from-slate-950 to-slate-900 p-8 rounded-md border border-blue-900 shadow-lg shadow-slate-900'>
          <h2 className='text-slate-300 text-lg font-semibold mb-2'>
            Generate and Send Invoices
          </h2>
          <p className='text-slate-500'>
            Create detailed invoices for services or products and dispatch them
            to clients or customers through email.
          </p>
        </article>
        <article className='bg-gradient-to-b from-slate-950 to-slate-900 p-8 rounded-md border border-blue-900 shadow-lg shadow-slate-900'>
          <h2 className='text-slate-300 text-lg font-semibold mb-2'>
            Automated Follow-Up Reminders
          </h2>
          <p className='text-slate-500'>
            Automatically send reminders to clients for overdue payments,
            ensuring timely follow-ups without manual intervention.
          </p>
        </article>
        <article className='bg-gradient-to-b from-slate-950 to-slate-900 p-8 rounded-md border border-blue-900 shadow-lg shadow-slate-900'>
          <h2 className='text-slate-300 text-lg font-semibold mb-2'>
            Track Overdue Payments
          </h2>
          <p className='text-slate-500'>
            Keep a record of payments, to maintain financial accountability and
            ensure effective communication with clients about their payment
            status.
          </p>
        </article>
      </section>
    </>
  );
}
