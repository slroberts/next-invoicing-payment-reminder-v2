import { InvoiceProps } from '@/lib/interfaces/interfaces';
import { AlertCircle, Calendar, FileText } from 'react-feather';

const InvoiceDetails = ({ invoice }: { invoice: InvoiceProps }) => {
  if (!invoice) {
    return null;
  }

  return (
    <div className='flex flex-wrap flex-col md:flex-row gap-1 md:gap-8 md:text-lg md:divide md:divide-x'>
      <div className='flex gap-2 items-center'>
        <FileText className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Invoice Id:</span>
        <span className='font-bold'>{invoice.id!.slice(0, 8)}</span>
      </div>
      <div className='md:pl-6 flex gap-2 items-center'>
        <Calendar className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Date Due:</span>
        <span className='font-bold'>{invoice.due}</span>
      </div>
      <div className='md:pl-6 flex gap-2 items-center'>
        <AlertCircle className='hidden md:block text-blue-400 w-[1.25rem] h-[1.25rem]' />
        <span className='text-base'>Payment Status:</span>
        <span className='font-bold'>
          {invoice.paymentStatus === 'PAID' ? 'Paid' : 'Not Paid'}
        </span>
      </div>
    </div>
  );
};

export default InvoiceDetails;
