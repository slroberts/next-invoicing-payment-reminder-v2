import { FC } from 'react';
import { capitalizeWords } from '@/lib/utils';
import { IInvoice, IItem } from '@/lib/interfaces/interfaces';
import DeleteButton from '@/components/shared/DeleteButton';

interface InvoiceItemsProps {
  invoice: IInvoice;
}

const InvoiceItems: FC<InvoiceItemsProps> = ({ invoice }) => {
  const items = invoice.items as IItem[];
  return (
    <div className='text-slate-300 font-semibold text-sm md:text-base divide-y divide-slate-700'>
      {items.map((item) => (
        <div key={item.id} className='grid grid-cols-5 md:grid-cols-12 '>
          <div className='md:col-span-3 px-6 py-4'>
            {capitalizeWords(item.name)}
          </div>
          <div className='md:col-span-3 px-6 py-4'>
            ${item.price.toFixed(2)}
          </div>
          <div className='md:col-span-3 px-6 py-4'>{item.hours.toFixed(2)}</div>
          <div className='md:col-span-2 px-6 py-4'>
            ${(item.price * item.hours).toFixed(2)}
          </div>
          <div className='px-6 py-4 ml-[5vw] sm:ml-[7vw] md:ml-[-1vw] lg:ml-[1vw]'>
            {invoice.status !== 'SENT' ? (
              <DeleteButton item={item as { id: string }} />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InvoiceItems;
