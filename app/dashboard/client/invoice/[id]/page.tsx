import BackButton from '@/components/BackButton';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { Params } from '@/lib/interfaces/interfaces';
import Invoice from '@/components/Invoice';

const getData = async (id?: string) => {
  const user = await getUserFromCookie(cookies() as any);
  const invoice = await db.invoice.findFirst({
    where: { id, ownerId: user?.id },
    include: {
      items: true,
    },
  });
  const client = await db.client.findFirst({
    where: { id: invoice?.clientId },
  });

  return { user, invoice, client };
};

export default async function InvoicePage({ params }: { params: Params }) {
  const { user, invoice, client } = await getData(params.id);

  return (
    <div>
      <div className='flex gap-6 flex-col'>
        <BackButton
          label='Back to Client'
          url={`/dashboard/client/${client?.id}`}
        />
        <hr />
        {user && invoice && client && (
          <Invoice user={user} invoice={invoice} client={client} />
        )}
      </div>
    </div>
  );
}
