import ClientCard from '@/components/ClientCard';
import MoreDropDown from '@/components/MoreDropDown';
import NewClientForm from '@/components/NewClientForm';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import receipt from '@/assets/images/undraw_fill_in_mie5.svg';

const getData = async () => {
  const user = await getUserFromCookie(cookies() as any);
  const clients = await db.client.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      invoices: true,
    },
  });

  return { clients };
};

export default async function Page() {
  const { clients } = await getData();

  return (
    <div className='mt-8 flex lg:flex-row flex-col gap-8 justify-between'>
      <div className='w-full md:w-[30rem]'>
        <h3 className='text-xl font-medium mb-6'>
          Add a client to create an invoice
        </h3>
        <NewClientForm />
      </div>
      {clients.length > 0 ? (
        <div className='w-full'>
          <div className='grid md:grid-cols-3 md:gap-4'>
            {clients.map((client: any) => (
              <div key={client.id}>
                <div className='float-right mt-4 mr-3'>
                  <MoreDropDown client={client} />
                </div>
                <div className='h-full p-4 bg-slate-50 border shadow-sm hover:border-blue-400 hover:transition-colors'>
                  <Link href={`/dashboard/client/${client.id}`}>
                    <ClientCard client={client} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex flex-col px-12'>
          <figure className='opacity-20 self-center'>
            <Image
              src={receipt}
              alt='Invoicing illustration - man in a black shirt with gray pants and black shoes looking at a large invoice.'
              width={560}
              height={420}
              priority
            />
          </figure>
          <div className='text-center mt-8'>Add clients to get started.</div>
        </div>
      )}
    </div>
  );
}
