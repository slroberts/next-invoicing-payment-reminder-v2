import { db } from '@/lib/db';
import { IClient } from '@/lib/interfaces/interfaces';
import BackButton from '@/components/shared/BackButton';
import ClientInfo from '@/components/shared/ClientInfo';
import InvoicesCountAndSentStatus from '@/components/shared/InvoicesCountAndSentStatus';
import NewInvoiceForm from '@/components/forms/NewInvoiceForm';
import InvoiceTable from '@/components/client/InvoiceTable';

const getData = async (id: string) => {
  const clientData = await db.client.findFirst({
    where: { id },
    include: {
      invoices: true,
    },
  });
  return { clientData };
};

export default async function ClientPage({
  params,
}: {
  params: { id: string };
}) {
  const { clientData } = await getData(params.id as string);
  const client = clientData as IClient;
  const invoices = client.invoices || [];

  return (
    <div>
      <div className='flex flex-col gap-4'>
        <BackButton label='Back to Dashboard' url='/dashboard' />
        <ClientInfo client={client} />
        <InvoicesCountAndSentStatus client={client} />

        <div className='w-40 mt-4'>
          <NewInvoiceForm
            client={client}
            label={'Create New Invoice'}
            className='text-slate-200'
          />
        </div>
      </div>

      <InvoiceTable invoices={invoices} />
    </div>
  );
}
