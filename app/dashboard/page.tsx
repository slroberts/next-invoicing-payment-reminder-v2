import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { IClient } from '@/lib/interfaces/interfaces';
import Image from 'next/image';
import ClientsList from '@/components/dashboard/ClientsList';
import FinancialsChart from '@/components/dashboard/FinancialsChart';
import TotalRevenue from '@/components/dashboard/TotalRevenue';
import RecentlyPaidList from '@/components/dashboard/RecentlyPaidList';
import receipt from '@/assets/images/undraw_fill_in_mie5.svg';

const getClients = async () => {
  const user = await getUserFromCookie(cookies() as any);
  const clientsData = await db.client.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      invoices: true,
    },
  });

  return { clientsData };
};

export default async function Page() {
  const { clientsData } = await getClients();
  const clients = (clientsData as IClient[]) || [];
  const allInvoices = clients.flatMap((client) => client.invoices || []);

  return (
    <section>
      <h1 className='text-slate-500 text-lg font-medium py-2'>Dashboard</h1>
      <div className='w-full flex flex-wrap lg:flex-nowrap justify-between gap-4'>
        <ClientsList clients={clients} />

        {clients.length > 0 ? (
          <>
            <FinancialsChart clients={clients} invoices={allInvoices} />

            <div className='w-full lg:w-80 flex flex-col gap-4'>
              <TotalRevenue invoices={allInvoices} />
              <RecentlyPaidList clients={clients} />
            </div>
          </>
        ) : (
          <div className='max-w-7xl mx-auto'>
            <figure>
              <Image
                src={receipt}
                alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
                width={560}
                height={420}
                priority
                className='opacity-50'
              />
            </figure>
          </div>
        )}
      </div>
    </section>
  );
}
