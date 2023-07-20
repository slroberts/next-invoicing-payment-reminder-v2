import { InvoiceProps } from '@/lib/interfaces/interfaces';
import Link from 'next/link';
import { FC } from 'react';
import DeleteButton from './DeleteButton';

const InvoiceTable: FC<InvoiceProps> = ({ invoices = [] }) => {
  if (!invoices) {
    return null;
  }

  return (
    <div className='mt-4 w-full min-w-full divide-y divide-slate-200 bg-slate-100 border-collapse border'>
      <div className='hidden sm:flex'>
        <div className='grid grid-flow-col gap-4 justify-stretch w-full'>
          <div className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            INVOICE ID
          </div>
          <div className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            DUE DATE
          </div>
          <div className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            STATUS
          </div>
        </div>
        <div className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
          Delete
        </div>
      </div>
      <div className='bg-white divide-y divide-slate-200'>
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className='flex py-4 sm:py-2 text-sm font-semibold transition-colors hover:bg-blue-50'
          >
            <Link
              key={invoice.id}
              href={`/dashboard/client/invoice/${invoice.id}`}
              className='grid grid-cols-2 sm:grid-cols-3  sm:grid-flow-col sm:gap-4 justify-stretch w-full'
            >
              <div className='px-6 py-2 font-semibold w-32'>
                <span className='block sm:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  INVOICE ID{' '}
                </span>
                {invoice.id.slice(0, 8)}
              </div>
              <div className='px-6 py-2 w-40 sm:ml-1'>
                <span className='block sm:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  DUE DATE{' '}
                </span>
                {invoice.due}
              </div>
              <div className='px-6 py-2 w-32 sm:ml-1'>
                <span className='block sm:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  STATUS{' '}
                </span>
                {invoice.status === 'SENT' ? 'Sent' : 'Not Sent'}
              </div>
            </Link>
            <div className='px-6 py-2 sm:mr-4'>
              <DeleteButton invoice={invoice} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTable;
