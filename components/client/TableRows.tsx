import { FC } from 'react';
import { IInvoice } from '@/lib/interfaces/interfaces';
import Link from 'next/link';
import InvoiceDataRow from '@/components/client/InvoiceDataRow';
import InvoiceDataHeading from '@/components/client/InvoiceDataHeading';
import DeleteButton from '@/components/shared/DeleteButton';
import MoreDropDown from '@/components/shared/MoreDropDown';
import { Eye } from 'react-feather';

interface TableRowsProps {
  invoices: IInvoice[];
}
const TableRows: FC<TableRowsProps> = ({ invoices }) => {
  return (
    <div className='divide-y divide-slate-700'>
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className='w-full flex justify-between gap-4 md:gap-0 flex-wrap md:grid md:grid-flow-col md:grid-cols-4 md:auto-cols-fr px-8 py-3 items-center'
        >
          <InvoiceDataRow>
            <InvoiceDataHeading>Invoice Id</InvoiceDataHeading>
            {invoice.id.slice(0, 8)}
          </InvoiceDataRow>

          <InvoiceDataRow>
            <InvoiceDataHeading>Due Date </InvoiceDataHeading>
            {invoice.due}
          </InvoiceDataRow>

          <InvoiceDataRow>
            <InvoiceDataHeading>Email Status </InvoiceDataHeading>
            {invoice.status === 'SENT' ? 'Sent' : 'Not Sent'}
          </InvoiceDataRow>

          <div className='w-full md:w-[100%] grid grid-cols-2 md:flex md:justify-between'>
            <InvoiceDataRow>
              <InvoiceDataHeading>Payment Status </InvoiceDataHeading>
              {invoice.paymentStatus === 'PAID' ? 'Paid' : 'Not Paid'}
            </InvoiceDataRow>

            <MoreDropDown className='-ml-[8rem]'>
              <Link
                href={`/dashboard/client/invoice/${invoice.id}`}
                className='p-2 scale-90 flex w-max items-center hover:cursor-pointer  transition-opacity hover:opacity-70'
              >
                <Eye className='w-[1.35rem] h-[1.35rem] text-blue-600' />
                <span className='ml-1 text-base text-slate-700'>
                  View Invoice
                </span>
              </Link>

              <div className='p-2 scale-90 flex w-max items-center hover:cursor-pointer  transition-opacity'>
                <DeleteButton invoice={invoice} label='Delete Invoice' />
              </div>
            </MoreDropDown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableRows;
