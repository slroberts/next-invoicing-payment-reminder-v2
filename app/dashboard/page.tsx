import ClientCard from '@/components/ClientCard';
import MoreDropDown from '@/components/MoreDropDown';
import NewClientForm from '@/components/NewClientForm';
import UserGreeting from '@/components/UserGreeting';
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
    <div>
      <UserGreeting />
      <div className='grid lg:grid-flow-col-dense gap-8 py-8'>
        <div className='col-auto'>
          <h3 className='text-xl font-medium mb-6'>
            Add a client to create an invoice
          </h3>
          <NewClientForm />
        </div>
        {clients.length > 0 ? (
          <div className='grid md:grid-cols-3 col-span-5 gap-6 overflow-y-auto h-[28rem] md:h-full'>
            {clients.map((client: any) => (
              <div key={client.id}>
                <div className='float-right mt-4 mr-3'>
                  <MoreDropDown client={client} />
                </div>
                <div className='p-4 bg-slate-50 border shadow-sm hover:border-blue-400 hover:transition-colors'>
                  <Link href={`/dashboard/client/${client.id}`}>
                    <ClientCard client={client} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col'>
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
    </div>
  );
}
