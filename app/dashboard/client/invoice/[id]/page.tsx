import BackButton from '@/components/BackButton';
import ClientInfo from '@/components/ClientInfo';
import DeleteButton from '@/components/DeleteButton';
import InvoiceDetails from '@/components/InvoiceDetails';
import NewItemForm from '@/components/NewItemForm';
import { getUserFromCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import capitalizeWords from '@/lib/utils';
import { cookies } from 'next/headers';
import SendInvoiceButton from '@/components/SendInvoiceButton';
import { ItemProps, Params } from '@/lib/interfaces/interfaces';

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

function calculateSubTotal(items: ItemProps[]) {
  let sum = 0;

  for (let item of items) {
    sum += item.price! * item.hours!;
  }

  return parseFloat(sum.toFixed(2));
}

export default async function InvoicePage({ params }: { params: Params }) {
  const { user, invoice, client } = await getData(params.id);

  const items = invoice?.items;

  const subTotal = calculateSubTotal(items!);
  const salesTax = Math.round(subTotal * 0.04);
  const total = (subTotal + salesTax).toFixed(2);

  const renderInvoiceItems = (items: ItemProps[]) => {
    return (
      <div className='bg-white divide-y divide-slate-200 font-semibold'>
        {items.map((item) => (
          <div
            key={item.id}
            className='grid grid-cols-5 md:grid-cols-12 text-sm'
          >
            <div className='md:col-span-3 px-6 py-4'>
              {capitalizeWords(item.name!)}
            </div>
            <div className='md:col-span-3 px-6 py-4'>
              ${item.price!.toFixed(2)}
            </div>
            <div className='md:col-span-3 px-6 py-4'>
              {item.hours!.toFixed(2)}
            </div>
            <div className='md:col-span-2 px-6 py-4'>
              ${(item.price! * item.hours!).toFixed(2)}
            </div>
            <div className='px-6 py-4 ml-[5vw] sm:ml-[7vw] md:ml-[-1vw] lg:ml-[1vw]'>
              {invoice?.status !== 'SENT' ? <DeleteButton item={item} /> : null}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className='flex gap-6 flex-col'>
        <BackButton
          label='Back to Client'
          url={`/dashboard/client/${client?.id}`}
        />
        <hr />
        <div className='font-semibold -mb-2 text-blue-600'>Billed To</div>
        {client && <ClientInfo client={client} />}
        <hr />
        <div className='font-semibold -mb-2 text-blue-600'>Invoice Details</div>
        {invoice && <InvoiceDetails invoice={invoice} />}
        <hr />
        {invoice?.status !== 'SENT' && (
          <NewItemForm invoice={invoice} label='Add Line Item' id={''} />
        )}
      </div>
      <div className='w-full min-w-full divide-y divide-slate-200 bg-slate-100 border-collapse border'>
        <div className='grid grid-cols-5 md:grid-cols-12'>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Item Name
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Price
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Hours
          </div>
          <div className='md:col-span-3 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Total
          </div>
        </div>

        {invoice && renderInvoiceItems(invoice.items)}

        <div className='grid grid-cols-5 md:grid-cols-12 py-4 text-sm font-semibold bg-slate-200'>
          <div className='px-6 col-span-2'>Sub Total</div>
          <div className='px-6 col-start-4 md:col-start-10'>${subTotal}</div>
        </div>
        <div className='grid grid-cols-5 md:grid-cols-12 py-4 text-sm border-b font-semibold bg-slate-300'>
          <div className='px-6 col-span-2'>Tax (4%)</div>
          <div className='px-6 col-start-4 md:col-start-10'>${salesTax}</div>
        </div>
        <div className='grid grid-cols-5 md:grid-cols-12 py-4 border-b font-semibold text-lg text-white bg-slate-500'>
          <div className='px-6'>Total</div>
          <div className='px-6 col-start-4 md:col-start-10'>${total}</div>
        </div>
      </div>
      {invoice?.status !== 'SENT' && items?.length !== 0 && (
        <div className='mt-10 flex justify-end'>
          {user && client && invoice && items && (
            <SendInvoiceButton
              user={user}
              client={client}
              invoice={invoice}
              items={items}
              subTotal={subTotal}
              salesTax={salesTax}
              total={total}
            />
          )}
        </div>
      )}
    </div>
  );
}
