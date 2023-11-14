import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { getUserFromCookie } from '@/lib/auth';
import { IClient, IInvoice, IUser } from '@/lib/interfaces/interfaces';
import BackButton from '@/components/shared/BackButton';
import Invoice from '@/components/invoice/Invoice';

const getData = async (id: string) => {
  const userData = await getUserFromCookie(cookies() as any);
  const invoiceData = await db.invoice.findFirst({
    where: { id, ownerId: userData?.id },
    include: {
      items: true,
    },
  });
  const clientData = await db.client.findFirst({
    where: { id: invoiceData?.clientId },
  });

  return { userData, invoiceData, clientData };
};

export default async function InvoicePage({
  params,
}: {
  params: { id: string };
}) {
  const { userData, invoiceData, clientData } = await getData(
    params.id as string
  );
  const user = userData as IUser;
  const invoice = invoiceData as IInvoice;
  const client = clientData as IClient;

  return (
    <div>
      <div className='flex gap-6 flex-col'>
        <BackButton
          label='Back to Client'
          url={`/dashboard/client/${client.id}`}
        />

        <Invoice user={user} invoice={invoice} client={client} />
      </div>
    </div>
  );
}
