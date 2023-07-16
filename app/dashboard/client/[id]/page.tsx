import BackButton from '@/components/BackButton';
import ClientInfo from '@/components/ClientInfo';
import InvoicesCountAndSentStatus from '@/components/InvoicesCountAndSentStatus';
import InvoiceTable from '@/components/InvoiceTable';
import NewInvoiceForm from '@/components/NewInvoiceForm';
import UserGreeting from '@/components/UserGreeting';
import { db } from '@/lib/db';
import { Params } from '@/lib/interfaces/interfaces';

const getData = async (id?: string) => {
  const client = await db.client.findFirst({
    where: { id },
    include: {
      invoices: true,
    },
  });
  return { client };
};

export default async function ClientPage({ params }: { params: Params }) {
  const { client } = await getData(params.id);
  const invoices = client?.invoices;

  return (
    <div>
      <UserGreeting />

      <div className='flex gap-6 flex-col'>
        <BackButton label='Back' />

        <hr />

        {client && <ClientInfo client={client} />}
        <div className='-mt-4'>
          {client && <InvoicesCountAndSentStatus client={client} />}
        </div>

        <hr />
        <div className='w-40'>
          {client && (
            <NewInvoiceForm client={client} label={'Create New Invoice'} />
          )}
        </div>
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
}
