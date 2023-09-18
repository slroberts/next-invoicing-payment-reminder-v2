'use client';
import { InvoiceProps } from '@/lib/interfaces/interfaces';
import Link from 'next/link';
import { FC } from 'react';
import DeleteButton from './DeleteButton';
import { ArrowDown, ArrowUp } from 'react-feather';
import useSortTableData from '@/hooks/useSortTableData';

const InvoiceTable: FC<InvoiceProps> = ({ invoices = [] }) => {
  const {
    sortedData: sortedInvoices,
    sortDataBy,
    sortDirection,
    sortedColumn,
  } = useSortTableData(invoices, 'asc', 'id');

  if (!invoices) {
    return null;
  }

  return (
    <div className='mt-4 w-full min-w-full divide-y divide-slate-200 bg-slate-100 border-collapse border'>
      <div className='hidden md:flex'>
        <div className='grid grid-flow-col gap-4 justify-between w-full'>
          <div className='flex gap-2 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Invoice Id{' '}
            <div
              className='flex cursor-pointer'
              onClick={() => sortDataBy('id')}
            >
              {sortedColumn === 'id' && sortDirection === 'asc' ? (
                <ArrowUp className='w-[1rem] h-[1rem]' />
              ) : (
                <ArrowDown className='w-[1rem] h-[1rem]' />
              )}
            </div>
          </div>
          <div className='flex gap-2 px-0 md:px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            <span className='-ml-14 lg:ml-[.18rem]'>Due</span>{' '}
            <span className='hidden lg:flex'>Date</span>{' '}
            <div
              className='flex cursor-pointer'
              onClick={() => sortDataBy('due')}
            >
              {sortedColumn === 'due' && sortDirection === 'asc' ? (
                <ArrowUp className='w-[1rem] h-[1rem]' />
              ) : (
                <ArrowDown className='w-[1rem] h-[1rem]' />
              )}
            </div>
          </div>
          <div className='flex gap-2 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            <span className='-ml-[1.35rem] lg:ml-0'>Email</span>{' '}
            <span className='hidden lg:flex'>Status</span>{' '}
            <div
              className='flex cursor-pointer'
              onClick={() => sortDataBy('status')}
            >
              {sortedColumn === 'status' && sortDirection === 'asc' ? (
                <ArrowUp className='w-[1rem] h-[1rem]' />
              ) : (
                <ArrowDown className='w-[1rem] h-[1rem]' />
              )}
            </div>
          </div>
          <div className='flex gap-2 px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            <span className='-ml-[.1rem] lg:ml-0'>Payment</span>{' '}
            <span className='hidden lg:flex'>Status</span>{' '}
            <div
              className='flex cursor-pointer'
              onClick={() => sortDataBy('paymentStatus')}
            >
              {sortedColumn === 'paymentStatus' && sortDirection === 'asc' ? (
                <ArrowUp className='w-[1rem] h-[1rem]' />
              ) : (
                <ArrowDown className='w-[1rem] h-[1rem]' />
              )}
            </div>
          </div>

          <div className='px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider'>
            Delete
          </div>
        </div>
      </div>
      <div className='bg-white divide-y divide-slate-200'>
        {sortedInvoices.map((invoice) => (
          <div
            key={invoice.id}
            className='flex py-4 md:py-2 text-sm font-semibold transition-colors hover:bg-blue-50'
          >
            <Link
              key={invoice.id}
              href={`/dashboard/client/invoice/${invoice.id}`}
              className='grid grid-cols-2 md:grid-cols-4 md:grid-flow-col md:gap-4 justify-stretch w-full'
            >
              <div className='px-6 py-2 font-semibold'>
                <span className='block md:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  Invoice Id{' '}
                </span>
                {invoice.id.slice(0, 8)}
              </div>
              <div className='px-6 md:px-0 py-2'>
                <span className='block md:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  Due Date{' '}
                </span>
                {invoice.due}
              </div>
              <div className='px-6 md:px-0 py-2 text-left md:-ml-7'>
                <span className='block md:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  Email Status{' '}
                </span>
                {invoice.status === 'SENT' ? 'Sent' : 'Not Sent'}
              </div>
              <div className='px-6 md:px-0 py-2 md:-ml-7'>
                <span className='block md:hidden text-left text-xs font-medium text-slate-500 uppercase tracking-wider mb-1'>
                  Payment Status{' '}
                </span>
                {invoice.paymentStatus === 'PAID' ? 'Paid' : 'Not Paid'}
              </div>
            </Link>
            <div className='px-6 py-2 md:mr-4'>
              <DeleteButton invoice={invoice} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvoiceTable;
