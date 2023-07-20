import { FC } from 'react';
import { Prisma } from '@prisma/client';
import { AlertCircle, Calendar, FileText } from 'react-feather';

const invoiceWithItems = Prisma.validator<Prisma.InvoiceArgs>()({
  include: { items: true },
});

type InvoiceWithItems = Prisma.InvoiceGetPayload<typeof invoiceWithItems>;

const InvoiceDetails: FC<{ invoice: InvoiceWithItems }> = ({ invoice }) => {
  if (!invoice) {
    return null;
  }

  return (
    <div className='flex flex-wrap flex-col md:flex-row gap-1 md:gap-8 md:text-lg md:divide md:divide-x'>
      <div className='flex gap-2 items-center'>
        <FileText className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Invoice ID:</span>
        <span className='font-bold'>{invoice.id.slice(0, 8)}</span>
      </div>
      <div className='md:pl-6 flex gap-2 items-center'>
        <Calendar className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Due Date:</span>
        <span className='font-bold'>{invoice.due}</span>
      </div>
      <div className='md:pl-6 flex gap-2 items-center'>
        <AlertCircle className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Status:</span>
        <span className='font-bold'>
          {invoice.status === 'SENT' ? 'Sent' : 'Not Sent'}
        </span>
      </div>
    </div>
  );
};

export default InvoiceDetails;
