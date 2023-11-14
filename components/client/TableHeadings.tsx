import { FC } from 'react';
import { IInvoice } from '@/lib/interfaces/interfaces';
import SortDropDown from '@/components/client/SortDropDown';

type InvoiceDataItem = {
  label: string;
  value: keyof IInvoice;
};

const invoiceData: InvoiceDataItem[] = [
  {
    label: 'Invoice Id',
    value: 'id',
  },
  {
    label: 'Due Date',
    value: 'due',
  },
  {
    label: 'Email Status',
    value: 'status',
  },
  {
    label: 'Payment Status',
    value: 'paymentStatus',
  },
];

interface TableHeadingsProps {
  sortDataBy: (value: keyof IInvoice, direction: 'asc' | 'desc') => void;
}

const TableHeadings: FC<TableHeadingsProps> = ({ sortDataBy }) => {
  return (
    <div className='w-full grid grid-flow-col grid-cols-4 auto-cols-fr px-8 text-slate-200'>
      {invoiceData.map((data) => (
        <div
          key={data.label}
          className='flex items-center gap-2 py-4 text-left text-xs font-medium tracking-wider'
        >
          <span className='uppercase'>{data.label}</span>

          <SortDropDown data={data} sortDataBy={sortDataBy} />
        </div>
      ))}
    </div>
  );
};

export default TableHeadings;
